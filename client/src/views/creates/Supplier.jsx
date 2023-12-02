import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSelection, getLists, setSuppliers } from "@/redux/slices/creates";
import { Field, Form, Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";

export const Supplier = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { refetch: ccRefetch } = useAxios();
   const [formData, setFormData] = useState({ supplier: "", products: [] });
   const [product, setProduct] = useState({ category: "", company: "", name: "" });
   const [openDialog, setOpenDialog] = useState(false);
   const { lists, categories, companies, products } = useSelector(({ creates }) => creates);
   const dispatch = useDispatch();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-lists");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
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
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      return setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
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

      // Success
      dispatch(setSuppliers(formData));
   };

   return (
      <Form
         onSubmit={handleSubmitForm}
         headerText="اضافه مندوب جديد"
         buttonText="انشاء"
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field label="اسم المندوب" name="supplier" onChange={handleFieldChange} />

         <div className="products">
            {formData.products.map(({ name }, i) => (
               <Typography variant="lead" color="blue-gray" key={i}>
                  {i + 1} - {name}
               </Typography>
            ))}
         </div>

         <Dialog open={openDialog} size="md" handler={handleOpenDialog} className="max-h-[80vh] overflow-y-auto">
            <DialogHeader className="flex-between">
               <Typography variant="h2" color="deep-purple">
                  اضافه منتج
               </Typography>
               <i className="fa fa-times text-2xl" onClick={handleOpenDialog} />
            </DialogHeader>

            <DialogBody>
               <div className="mt-4">
                  <Selectbox
                     label="اختر اسم القسم..."
                     onChange={(value) => handleSelectChange("category", value)}
                     options={categories}
                  />
               </div>

               <div className="mt-4">
                  <Selectbox
                     label="اختر اسم الشركة..."
                     onChange={(value) => handleSelectChange("company", value)}
                     options={companies}
                  />
               </div>

               <div className="mt-4">
                  <Selectbox
                     label="اختر اسم المنتج..."
                     onChange={(value) => handleSelectChange("name", value)}
                     options={products}
                  />
               </div>
            </DialogBody>

            <DialogFooter>
               <Button color="deep-purple" className="text-xl" fullWidth onClick={handleSubmitProduct}>
                  اضافه
               </Button>
            </DialogFooter>
         </Dialog>

         <Button
            variant="text"
            className="group m-auto w-fit text-xl"
            color="deep-purple"
            onClick={handleOpenDialog}
         >
            <i className="fa fa-plus ml-2 text-primary group-hover:font-bold" />
            <span>اضافه منتج</span>
         </Button>
      </Form>
   );
};
