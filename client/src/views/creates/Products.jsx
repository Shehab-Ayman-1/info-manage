import { Button, IconButton, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { filterSelection, getLists, setProducts } from "@/redux/slices/products";
import { Field, Form, MTDialog, Selectbox } from "@/components/ui";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";

const formState = { category: "", company: "", products: [] };
const productState = { name: "", minmax: { min: 5, max: 10 }, barcode: "" };
export const AddProducts = () => {
   const [text] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: ccLoading, isSubmitted: ccIsSubmitted, refetch: ccRefetch } = useAxios();

   const [product, setProduct] = useState(productState);
   const [formData, setFormData] = useState(formState);
   const [openDialog, setOpenDialog] = useState(false);

   const { lists, categories, companies } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-products-list");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
   }, []);

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
      if (event.target.name === "min" || event.target.name === "max") {
         return setProduct((data) => {
            const minmax = { ...data?.minmax, [event.target.name]: event.target.value };
            return { ...data, minmax };
         });
      }
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmitProduct = () => {
      const { name, minmax } = product;
      if (!name || !minmax) return alert("يجب ادخال جميع البيانات المطلوبه");

      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setOpenDialog(() => false);
      setProduct(() => productState);
   };

   const handleCancel = (index) => {
      setFormData((data) => {
         const products = data.products.filter((_, idx) => index !== idx);
         return { ...data, products };
      });
   };

   const handleSubmitForm = async (event) => {
      event.preventDefault();

      const { isSubmitted, error } = await refetch("post", "/products/create-products", formData);
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
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

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
            <Field
               label={text("creates-product-menu-name")}
               name="name"
               value={product.name}
               onChange={handleFieldChange}
            />
            <Field
               label={text("creates-product-menu-barcode")}
               name="barcode"
               value={product.barcode}
               onChange={handleFieldChange}
            />

            <div className="flex-between flex-wrap overflow-hidden sm:flex-nowrap">
               <Field
                  type="number"
                  label={text("creates-product-menu-min")}
                  name="min"
                  min="0"
                  value={product.minmax?.min}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
               <Field
                  type="number"
                  min="0"
                  label={text("creates-product-menu-max")}
                  name="max"
                  value={product.minmax?.max}
                  containerStyle="sm:!w-[50%]"
                  onChange={handleFieldChange}
               />
            </div>
         </MTDialog>
      </Form>
   );
};
