import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { Field, Form, Selectbox } from "@/components/public";
import { filterSelection, getLists, setProducts } from "@/redux/slices/creates";
import { Loading } from "@/layout/loading";
import { useAxios } from "@/hooks/useAxios";

const formState = { category: "", company: "", products: [] };
export const Products = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { refetch: ccRefetch } = useAxios();
   const [product, setProduct] = useState({ name: "", minmax: null, barcode: 0 });
   const [formData, setFormData] = useState(formState);
   const [openDialog, setOpenDialog] = useState(false);
   const { lists, categories, companies } = useSelector(({ creates }) => creates);
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
            const minmax = { ...data, minmax: { ...data?.minmax, [event.target.name]: event.target.value } };
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
         headerText="اضافه منتج جديد"
         buttonText="انشاء"
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <div className="category">
            <Selectbox
               label="اختر اسم القسم..."
               onChange={(value) => handleSelectChange("category", value)}
               options={categories}
            />
         </div>

         <div className="company">
            <Selectbox
               label="اختر اسم الشركة..."
               onChange={(value) => handleSelectChange("company", value)}
               options={companies}
            />
         </div>

         <div className="products">
            {formData.products.map(({ name }, i) => (
               <Typography variant="lead" color="blue-gray" key={i}>
                  <i className="fa fa-times text-red-500 hover:text-red-900" onClick={() => handleCancel(i)} />
                  <span className="mr-3">
                     {i + 1} - {name}
                  </span>
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
               <Field label="اسم المنتج" name="name" onChange={handleFieldChange} />
               <Field type="number" label="الباركود" name="barcode" onChange={handleFieldChange} />

               <div className="flex-between">
                  <Field
                     type="number"
                     min="0"
                     label="الحد الادني"
                     containerStyle="!w-[50%] min-w-[50%]"
                     name="min"
                     onChange={handleFieldChange}
                  />
                  <Field
                     type="number"
                     min="0"
                     label="الحد المتوسط"
                     name="max"
                     containerStyle="!w-[50%] min-w-[50%]"
                     onChange={handleFieldChange}
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
