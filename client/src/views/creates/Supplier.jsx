import { TabPanel, TabsBody } from "@material-tailwind/react";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { filterSelection, getLists, getSuppliers, setSuppliers } from "@/redux/products";
import { Field, Form, MTDialog, Selectbox, Tabs } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AddSupplier = () => {
   const [text, i18next] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: ccLoading, isSubmitted: ccIsSubmitted, refetch: ccRefetch } = useAxios();

   const [formData, setFormData] = useState({ supplier: "", phone: "", products: [] });
   const [product, setProduct] = useState({ category: "", company: "", name: "" });
   const [openDialog, setOpenDialog] = useState(false);

   const { categories, companies, products, suppliers } = useSelector(({ products }) => products);
   const dispatch = useDispatch();
   const { state } = useLocation();

   useEffect(() => {
      if (!suppliers.length) {
         (async () => {
            const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-suppliers-list");
            if (isSubmitted && error) return;
            dispatch(getSuppliers(data));
         })();
      }

      if (!categories.length) {
         (async () => {
            const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-products-list");
            if (isSubmitted && error) return;
            dispatch(getLists(data));
         })();
      }
   }, []);

   useEffect(() => {
      dispatch(filterSelection({ category: product.category, company: "" }));
   }, [product.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: product.category, company: product.company }));
   }, [product.company]);

   const handleOpenDialog = () => {
      setOpenDialog((open) => !open);
   };

   const handleSelectChange = (name, value) => {
      if (name === "supplier") return setFormData((data) => ({ ...data, [name]: value }));
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      return setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleDelete = (index) => {
      setFormData((data) => {
         const products = data.products.filter((_, idx) => idx !== index);
         return { ...data, products };
      });
   };

   const handleSubmitProduct = () => {
      const { category, company, name } = product;
      if (!category || !company || !name) return alert("يجب ادخال جميع البيانات المطلوبه");

      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setOpenDialog(() => false);
   };

   const handleSubmitForm = async (event) => {
      event.preventDefault();

      const { isSubmitted, error } = await refetch("post", "/products/create-supplier", formData);
      if (isSubmitted && error) return;
      dispatch(setSuppliers(formData));
   };

   const tabsHeaderAr = [
      { name: "مندوب جديد", value: "new" },
      { name: "مندوب قديم", value: "old" },
   ];

   const tabsHeaderEn = [
      { name: "New Supplier", value: "new" },
      { name: "Old Supplier", value: "old" },
   ];

   return (
      <Form
         onSubmit={handleSubmitForm}
         headerText={text("creates-supplier-title")}
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

         <Tabs defaultValue="new" headers={i18next.language === "en" ? tabsHeaderEn : tabsHeaderAr}>
            <TabsBody>
               <TabPanel value="new" className="min-h-[200px] overflow-y-auto">
                  <Field
                     label={text("insertSupplier")}
                     name="supplier"
                     value={formData.supplier}
                     onChange={handleFieldChange}
                  />
                  <Field
                     label={text("creates-supplier-phone")}
                     name="phone"
                     required={false}
                     value={formData.phone}
                     onChange={handleFieldChange}
                  />
               </TabPanel>

               <TabPanel value="old" className="min-h-[200px] overflow-y-auto">
                  <Selectbox
                     label={text("chooseSupplier")}
                     options={suppliers}
                     value={formData.supplier}
                     loading={!ccIsSubmitted && ccLoading}
                     onChange={(value) => handleSelectChange("supplier", value)}
                  />
               </TabPanel>
            </TabsBody>
         </Tabs>

         <div className="products">
            {formData.products.map(({ name }, i) => (
               <Typography variant="lead" className="text-dimWhite" key={i}>
                  <IconButton variant="text" color="red" className="group">
                     <i
                        className="fa fa-times text-lg text-red-500 group-hover:text-red-900"
                        onClick={() => handleDelete(i)}
                     />
                  </IconButton>
                  {name}
               </Typography>
            ))}
         </div>

         <Button
            variant="text"
            className="group m-auto w-fit text-xl hover:brightness-125"
            color="deep-purple"
            onClick={handleOpenDialog}
         >
            <i className="fa fa-plus ml-2 text-primary group-hover:font-bold" />
            <span>{text("creates-product-menu-btn")}</span>
         </Button>

         <MTDialog
            headerText={text("creates-product-menu-btn")}
            buttonText={text("insert")}
            open={openDialog}
            handler={handleOpenDialog}
            onSubmit={handleSubmitProduct}
         >
            <Selectbox
               label={text("chooseCategory")}
               options={categories}
               value={product.category}
               loading={!ccIsSubmitted && ccLoading}
               onChange={(value) => handleSelectChange("category", value)}
            />

            <br />

            <Selectbox
               label={text("chooseCompany")}
               options={companies}
               value={product.company}
               loading={!ccIsSubmitted && ccLoading}
               onChange={(value) => handleSelectChange("company", value)}
            />

            <br />

            <Selectbox
               label={text("chooseProduct")}
               value={product.name}
               loading={!ccIsSubmitted && ccLoading}
               onChange={(value) => handleSelectChange("name", value)}
               options={products?.map(({ name }) => name).filter((n) => n) || []}
            />
         </MTDialog>
      </Form>
   );
};
