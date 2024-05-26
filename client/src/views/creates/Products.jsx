import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { filterSelection, getLists, getSuppliers, setProducts } from "@/redux/products";
import { Field, Form, MTDialog, Selectbox } from "@/components/ui";
import { FieldWithRedirectLink } from "@/components/statements";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";

const formState = { supplier: "", category: "", company: "", products: [] };
const productState = {
   name: "",
   barcode: "",
   minmax: { min: 5, max: 10 },
   count: { store: 0, shop: 0 },
   price: { buy: 0, sale: 0 },
};
export const AddProducts = () => {
   const [text] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: ccLoading, isSubmitted: ccIsSubmitted, refetch: ccRefetch } = useAxios();

   const [product, setProduct] = useState(productState);
   const [formData, setFormData] = useState(formState);
   const [openDialog, setOpenDialog] = useState(false);

   const { lists, categories, companies, suppliers } = useSelector(({ products }) => products);
   const { state } = useLocation();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!suppliers.length) {
         (async () => {
            const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-suppliers-list");
            if (isSubmitted && error) return;
            dispatch(getSuppliers(data));
         })();
      }

      if (!lists.length) {
         (async () => {
            const { data, isSubmitted, error } = await ccRefetch(
               "get",
               "/products/get-products-list?isEmpty=true",
            );
            if (isSubmitted && error) return;
            dispatch(getLists(data));
         })();
      }
   }, [data]);

   useEffect(() => {
      dispatch(filterSelection({ category: formData.category, company: "" }));
   }, [formData.category]);

   const handleOpenDialog = () => {
      setOpenDialog((o) => !o);
   };

   const handleSelectChange = (name, value) => {
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      if (event.target.id === "minmax" || event.target.id === "count" || event.target.id === "price") {
         return setProduct((data) => {
            const change = { ...data?.[event.target.id], [event.target.name]: +event.target.value };
            return { ...data, [event.target.id]: change };
         });
      }
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmitProduct = () => {
      const { name, minmax, count, price } = product;
      if (!name || !minmax || !count || !price) return alert("يجب ادخال جميع البيانات المطلوبه");

      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setOpenDialog(false);
      setProduct(productState);
   };

   const handleCancel = (index) => {
      setFormData((data) => {
         const products = data.products.filter((_, idx) => index !== idx);
         return { ...data, products };
      });
   };

   const handleSubmitForm = async (event) => {
      event.preventDefault();
      const products = formData.products.map((product) => ({
         ...product,
         suppliers: formData.supplier ? [formData.supplier] : [],
      }));

      const { isSubmitted, error } = await refetch("post", "/products/create-products", { ...formData, products });
      if (isSubmitted && error) return;

      dispatch(setProducts(formData));
   };

   return (
      <Form
         onSubmit={handleSubmitForm}
         headerText={text("creates-product-title")}
         buttonText={text("creates-btn")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading
            isSubmitted={isSubmitted}
            loading={loading}
            error={error}
            message={data}
            to={state?.redirectTo || "/"}
         />

         <Selectbox
            label={text("chooseCategory")}
            options={categories}
            loading={!ccIsSubmitted && ccLoading}
            value={formData.category}
            onChange={(value) => handleSelectChange("category", value)}
         />

         <Selectbox
            label={text("chooseCompany")}
            options={companies}
            loading={!ccIsSubmitted && ccLoading}
            value={formData.company}
            onChange={(value) => handleSelectChange("company", value)}
         />

         <FieldWithRedirectLink path="/creates/supplier" redirectTo="/creates/products">
            <Selectbox
               label={text("chooseSupplier") + text("optional")}
               options={suppliers}
               value={formData.supplier}
               loading={!ccIsSubmitted && ccLoading}
               onChange={(value) => setFormData((form) => ({ ...form, supplier: value }))}
            />
         </FieldWithRedirectLink>

         <div className="products">
            {formData.products.map(({ name }, i) => (
               <Typography variant="lead" className="text-dimWhite" key={i}>
                  <IconButton variant="text" color="red">
                     <i
                        className="fa fa-times text-xl text-red-500 hover:text-red-900"
                        onClick={() => handleCancel(i)}
                     />
                  </IconButton>
                  <span className="mx-3">{name}</span>
               </Typography>
            ))}
         </div>

         <Button
            variant="text"
            className="group m-auto w-fit text-xl hover:brightness-125"
            color="deep-purple"
            onClick={handleOpenDialog}
         >
            <i className="fa fa-plus mx-2 text-primary group-hover:font-bold" />
            <span>{text("creates-product-menu-btn")}</span>
         </Button>

         <MTDialog
            headerText={text("creates-product-menu-btn")}
            buttonText={text("insert")}
            open={openDialog}
            handler={handleOpenDialog}
            onSubmit={handleSubmitProduct}
         >
            <div className="flex flex-col">
               <Field
                  label={text("creates-product-menu-name")}
                  name="name"
                  value={product.name}
                  onChange={handleFieldChange}
               />
               <Field
                  label={text("creates-product-menu-barcode")}
                  type="number"
                  name="barcode"
                  value={product.barcode}
                  onChange={handleFieldChange}
               />
            </div>

            <div className="flex-between flex-col overflow-hidden sm:flex-row">
               <Field
                  type="number"
                  label={text("creates-product-menu-min")}
                  id="minmax"
                  name="min"
                  min="0"
                  value={product.minmax?.min}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
               <Field
                  type="number"
                  label={text("creates-product-menu-max")}
                  id="minmax"
                  name="max"
                  min="0"
                  value={product.minmax?.max}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
            </div>

            <div className="flex-between flex-col overflow-hidden sm:flex-row">
               <Field
                  type="number"
                  label={text("creates-product-menu-count-store")}
                  id="count"
                  name="store"
                  min="0"
                  // disabled
                  value={product.count?.store}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
               <Field
                  type="number"
                  label={text("creates-product-menu-count-shop")}
                  id="count"
                  name="shop"
                  min="0"
                  // disabled
                  value={product.count?.shop}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
            </div>

            <div className="flex-between flex-col overflow-hidden sm:flex-row">
               <Field
                  type="number"
                  label={text("creates-product-menu-price-buy")}
                  id="price"
                  name="buy"
                  min="0"
                  value={product.price?.buy}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
               <Field
                  type="number"
                  label={text("creates-product-menu-price-sale")}
                  id="price"
                  name="sale"
                  min="0"
                  value={product.price?.sale}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
            </div>
         </MTDialog>
      </Form>
   );
};
