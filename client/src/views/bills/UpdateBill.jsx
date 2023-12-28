import { Button, IconButton } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, Form, MTDialog, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Col, Row, Table } from "@/components/table";
import { useDispatch, useSelector } from "react-redux";
import { filterSelection, getLists } from "@/redux/slices/products";

const TABLE_HEAD_AR = ["التحكم", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["Controll", "Product", "Count", "Price", "Total"];
const formState = {
   client: "",
   toStore: false,
   discount: "",
   completed: false,
   phone: "",
   date: "",
   products: [],
   newProducts: [],
   updatedProducts: [],
   deletedProducts: [],
};
export const UpdateBill = () => {
   const [text, i18next] = useTranslation();
   const { billId } = useParams();
   const dispatch = useDispatch();

   const [product, setProduct] = useState({ _id: "", name: "", count: "", price: "" });
   const [formData, setFormData] = useState(formState);

   const [openAddDialog, setOpenAddDialog] = useState(false);
   const [openDialog, setOpenDialog] = useState(false);
   const [total, setTotal] = useState(0);

   const { lists, categories, companies, products } = useSelector(({ products }) => products);
   const { data, loading, error, isSubmitted } = useAxios("get", `/bills/get-bill/${billId}`);

   const {
      data: productsLists,
      loading: pLoading,
      error: pError,
      isSubmitted: pIsSubmitted,
      refetch: pRefetch,
   } = useAxios();

   const {
      data: sendData,
      loading: sendLoading,
      error: sendError,
      isSubmitted: sendIsSubmitted,
      refetch: sendRefetch,
   } = useAxios();

   useEffect(() => {
      if (!data || formData?.client) return;
      setFormData(() => ({
         client: data.client,
         toStore: data.place === "store",
         type: data.type,
         discount: data.pay.discount,
         completed: data.pay.completed,
         phone: data.phone,
         date: data.date,
         products: data.products,
         newProducts: [],
         updatedProducts: [],
         deletedProducts: [],
      }));
   }, [data]);

   useEffect(() => {
      const total = formData.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
      setTotal(() => total || "00,00");
   }, [formData.products, product]);

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await pRefetch("get", "/products/get-products-list");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
   }, []);

   useEffect(() => {
      dispatch(filterSelection({ category: product?.category || "", company: "" }));
   }, [product.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: product?.category || "", company: product?.company || "" }));
   }, [product.company]);

   useEffect(() => {
      const category = lists.find((item) => item.category === product?.category);
      if (!category) return;

      const company = category.companies.find((item) => item.company === product?.company);
      if (!company) return;

      const produc = company.products.find((item) => item.name === product?.name);
      if (!produc) return;

      dispatch(filterSelection({ category: product?.category || "", company: product?.company || "" }));
      setProduct((data) => ({
         ...data,
         price: formData?.type === "bill" ? produc.salePrice : formData?.type === "debt" ? produc.buyPrice : 0,
      }));
   }, [product?.category, product?.company, product?.name]);

   const handleDialog = (product) => {
      if (product) setProduct(() => product);
      setOpenDialog((open) => !open);
   };

   const handleAddDialog = () => {
      setOpenAddDialog((open) => !open);
   };

   const handleFieldChange = (event) => {
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSelectChange = (name, value) => {
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleAddField = () => {
      delete product._id;
      setFormData((data) => {
         data.products.push({
            _id: new Date().getTime(),
            name: product.name,
            count: product.count,
            price: product.price,
         });
         data.newProducts.push(product);
         return data;
      });

      setOpenAddDialog(false);
      setProduct(() => ({ _id: "", name: "", count: "", price: "", category: "", company: "" }));
   };

   const handleEditProduct = () => {
      setFormData((formData) => {
         const productIndex = formData.products.findIndex((item) => item._id === product._id);
         const updatedIndex = formData.updatedProducts.findIndex((item) => item._id === product._id);

         // UpdatedProducts
         const oldCount = +data.products[productIndex].count;
         const newCount = +product.count;
         const count = oldCount > newCount ? oldCount - newCount : -(newCount - oldCount); // Old > New ? Buy : Sale

         if (updatedIndex === -1) formData.updatedProducts.push({ ...product, count });
         else formData.updatedProducts[updatedIndex] = { ...product, count };

         // Products
         formData.products[productIndex] = product;
         return formData;
      });
      setOpenDialog(false);
      setProduct({ name: "", count: "", price: "", _id: "" });
   };

   const handleDeleteField = (id) => {
      setFormData((formData) => {
         formData.deletedProducts.push(formData.products.find((item) => item._id === id));
         const products = formData.products.filter((item) => item._id !== id);
         return { ...formData, products };
      });
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const { completed, date, phone, discount, ...form } = formData;
      const { data: update, isSubmitted, error } = await sendRefetch("put", `/bills/update-bill/${billId}`, form);
      if (isSubmitted && (error || update?.warn)) setTimeout(() => window.location.reload(), 4000);
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("updateBill-title")}
         buttonText={text("updateBill-submit")}
         loading={(sendIsSubmitted && !sendError && !sendData?.warn) || sendLoading}
      >
         <Loading
            isSubmitted={sendIsSubmitted}
            loading={sendLoading}
            error={sendError}
            message={sendData}
            to="/show/bills"
         />
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field label={text("updateBill-client")} value={formData?.client} disabled />
            <Field label={text("updateBill-phone")} value={formData?.phone} disabled />
         </div>

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field
               label={text("updateBill-place")}
               value={formData?.toStore === "store" ? text("store") : text("shop")}
               disabled
            />
            <Field
               label={text("updateBill-date")}
               value={new Date(formData?.date || "").toLocaleDateString()}
               disabled
            />
         </div>

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field
               label={text("updateBill-type")}
               value={
                  formData?.completed ? text("updateBill-type-completed") : text("updateBill-type-notCompleted")
               }
               disabled
            />
            <Field label={text("updateBill-discount")} value={formData?.discount} disabled />
         </div>

         <Button
            variant="gradient"
            color="deep-purple"
            className="mx-auto w-fit pb-5 text-xl hover:brightness-125 ltr:text-base"
            onClick={handleAddDialog}
         >
            <i className="fa fa-plus mx-2 text-white hover:text-white" />
            {text("updateBill-add-btn")}
         </Button>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[3, 3]}
            total={total}
         >
            {formData.products.map(({ _id, name, count, price }, i) => (
               <Row key={i} index={i}>
                  <Col>
                     <IconButton variant="text" color="red" onClick={() => handleDeleteField(_id)}>
                        <i className="fa fa-times text-xl text-red-500 hover:text-red-900" />
                     </IconButton>
                     <IconButton
                        variant="text"
                        color="red"
                        onClick={() => handleDialog({ name, count, price, _id })}
                        className={!_id ? "hidden" : ""}
                     >
                        <i className="fa fa-edit text-xl text-orange-500 hover:text-orange-900" />
                     </IconButton>
                  </Col>
                  <Col>{name}</Col>
                  <Col>{count}</Col>
                  <Col>{price}</Col>
                  <Col>{+price * +count}</Col>
               </Row>
            ))}
         </Table>

         {/* Update Product */}
         <MTDialog
            headerText={text("updateBill-updateWidget-title")}
            buttonText={text("updateBill-submit")}
            open={openDialog}
            handler={handleDialog}
            onSubmit={handleEditProduct}
         >
            <Field label={text("insertProduct")} name="name" value={product.name} onChange={handleFieldChange} />

            <Field
               type="number"
               label={text("count")}
               name="count"
               min="0"
               value={product.count}
               onChange={handleFieldChange}
            />

            <Field
               type="number"
               label={text("price")}
               name="price"
               min="0"
               value={product.price}
               onChange={handleFieldChange}
            />
         </MTDialog>

         {/* Add Product */}
         <MTDialog
            headerText={text("updateBill-newWidget-title")}
            buttonText={text("insert")}
            open={openAddDialog}
            handler={handleAddDialog}
            onSubmit={handleAddField}
         >
            <Selectbox
               label={text("chooseCategory")}
               options={categories}
               loading={!pIsSubmitted && pLoading}
               value={product?.category}
               onChange={(value) => handleSelectChange("category", value)}
            />

            <Selectbox
               label={text("chooseCompany")}
               options={companies}
               loading={!pIsSubmitted && pLoading}
               value={product?.company}
               onChange={(value) => handleSelectChange("company", value)}
            />

            <Selectbox
               label={text("chooseProduct")}
               options={products?.map((item) => item.name) || []}
               loading={!pIsSubmitted && pLoading}
               value={product?.name}
               onChange={(value) => handleSelectChange("name", value)}
            />

            <Field
               type="number"
               label={text("count")}
               name="count"
               min="0"
               value={product.count}
               onChange={(event) => setProduct((data) => ({ ...data, count: event.target.value }))}
            />

            <Field
               type="number"
               label={
                  formData?.type === "bill"
                     ? text("updateBill-newWidget-salePrice")
                     : formData?.type === "debt"
                       ? text("updateBill-newWidget-buyPrice")
                       : ""
               }
               name="price"
               min="0"
               value={product.price}
               onChange={handleFieldChange}
            />
         </MTDialog>
      </Form>
   );
};
