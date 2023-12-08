import { Button, Typography, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSelection, getLists, getSuppliers, setSuppliers } from "@/redux/slices/products";
import { Field, Form, Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

export const Supplier = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { refetch: ccRefetch } = useAxios();

   const [formData, setFormData] = useState({ supplier: "", products: [] });
   const [product, setProduct] = useState({ category: "", company: "", name: "" });
   const [openDialog, setOpenDialog] = useState(false);

   const { categories, companies, products, suppliers } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

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

         <Tabs value="new">
            <TabsHeader
               className="bg-primary/25 dark:bg-primary/10 border border-solid border-primary"
               indicatorProps={{ className: "bg-deep-purple-900" }}
            >
               <Tab value="new" className="text-lg font-semibold dark:text-white">
                  مندوب جديد
               </Tab>
               <Tab value="old" className="text-lg font-semibold dark:text-white">
                  مندوب قديم
               </Tab>
            </TabsHeader>

            <TabsBody>
               <TabPanel value="new" className="min-h-[200px] overflow-y-auto">
                  <Field
                     label="اسم المندوب"
                     name="supplier"
                     value={formData.supplier}
                     onChange={handleFieldChange}
                  />
               </TabPanel>
               <TabPanel value="old" className="min-h-[200px] overflow-y-auto">
                  <Selectbox
                     label="اختر اسم المندوب"
                     value={formData.supplier}
                     onChange={(value) => handleSelectChange("supplier", value)}
                     options={suppliers}
                  />
               </TabPanel>
            </TabsBody>
         </Tabs>

         <div className="products">
            {formData.products.map(({ name }, i) => (
               <Typography variant="lead" className="text-dimWhite" key={i}>
                  {i + 1} - {name}
               </Typography>
            ))}
         </div>

         <Dialog
            open={openDialog}
            size="md"
            handler={handleOpenDialog}
            className="max-h-[80vh] overflow-y-auto shadow-sp dark:bg-darkGray"
         >
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
                     value={product.category}
                     onChange={(value) => handleSelectChange("category", value)}
                     options={categories}
                  />
               </div>

               <div className="mt-4">
                  <Selectbox
                     label="اختر اسم الشركة..."
                     value={product.company}
                     onChange={(value) => handleSelectChange("company", value)}
                     options={companies}
                  />
               </div>

               <div className="mt-4">
                  <Selectbox
                     label="اختر اسم المنتج..."
                     value={product.name}
                     onChange={(value) => handleSelectChange("name", value)}
                     options={products?.map(({ name }) => name).filter((n) => n) || []}
                  />
               </div>
            </DialogBody>

            <DialogFooter>
               <Button
                  color="deep-purple"
                  className="text-xl dark:text-black"
                  fullWidth
                  onClick={handleSubmitProduct}
               >
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
