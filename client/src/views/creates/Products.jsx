import { useNavigate } from "react-router-dom";
import { Field, Form, Selectbox } from "@/components/public";
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "@/redux";

const formState = {
   category: "",
   company: "",
   products: [],
};
export const Products = () => {
   const [formData, setFormData] = useState(formState);
   const [openDialog, setOpenDialog] = useState(false);
   const [product, setProduct] = useState({ name: "", suppliers: [""], minmax: null });
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const addField = () => {
      setProduct((product) => ({ ...product, suppliers: product.suppliers.concat("") }));
   };

   const changeSuppliers = ({ target: { value } }, index) => {
      setProduct((data) => {
         data.suppliers[index] = value;
         return data;
      });
   };

   const handleOpenDialog = () => {
      setOpenDialog((o) => !o);
   };

   const handleSubmitProduct = () => {
      const { name, minmax } = product;
      const suppliers = product.suppliers.filter((item) => item);

      if (!name || !suppliers.length || !minmax) return alert("يجب ادخال جميع البيانات المطلوبه");
      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setOpenDialog(() => false);
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);

      // Success
      dispatch(setProducts(formData));
      setTimeout(() => navigate("/"), 2000);
   };

   return (
      <Form onSubmit={handleSubmit} headerText="اضافه منتج جديد" buttonText="انشاء">
         <div className="category">
            <Selectbox
               label="اختر اسم القسم..."
               onChange={(value) => setFormData((f) => ({ ...f, category: value }))}
               options={["القسم الاول", "القسم الثاني", "القسم الثالث", "القسم الرابع", "القسم الخامس"]}
            />
         </div>

         <div className="company">
            <Selectbox
               label="اختر اسم الشركة..."
               onChange={(value) => setFormData((f) => ({ ...f, company: value }))}
               options={["الشركة الاول", "الشركة الثاني", "الشركة الثالث", "الشركة الرابع", "الشركة الخامس"]}
            />
         </div>

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
               <Field
                  label="اسم المنتج"
                  name="products"
                  onChange={(e) => setProduct((d) => ({ ...d, name: e.target.value }))}
               />

               <div className="flex-between">
                  <Field
                     type="number"
                     min="0"
                     label="حد ادني"
                     containerStyle="!w-[50%] min-w-[50%]"
                     onChange={(e) => {
                        setProduct((d) => ({ ...d, minmax: { ...d.minmax, min: e.target.value } }));
                     }}
                  />
                  <Field
                     type="number"
                     min="0"
                     label="حد متوسط"
                     containerStyle="!w-[50%] min-w-[50%]"
                     onChange={(e) => {
                        setProduct((d) => ({ ...d, minmax: { ...d.minmax, max: e.target.value } }));
                     }}
                  />
               </div>

               <div className="suppliers w-full text-center">
                  <div className="">
                     {product.suppliers.map((_, index) => (
                        <Field
                           label={`اسم المندوب ${index + 1}`}
                           name="suppliers"
                           key={index}
                           onChange={(e) => changeSuppliers(e, index)}
                        />
                     ))}
                  </div>
                  <Button
                     variant="text"
                     color="deep-purple"
                     className="group cursor-pointer text-xl"
                     onClick={addField}
                  >
                     <i className="fa fa-plus ml-2 text-primary group-hover:font-bold" />
                     <span>اضافه مندوب اخر</span>
                  </Button>
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

/* 
<div className="products">
   <div className="suppliers">
      <Field label={`اسم المندوب `} name="suppliers" onChange={(e) => handleChange(e)} />

      <Typography
         variant="small"
         className="group m-auto w-fit cursor-pointer text-xl font-bold text-primary/70 hover:text-primary"
         onClick={() => addField("suppliers")}
      >
         <i className="fa fa-plus ml-2 text-primary group-hover:font-bold" />
         <span>اضافه مندوب اخر</span>
      </Typography>
   </div>

   <div className="flex-between">
      <Field type="number" min="0" label="min" containerStyle="!w-[50%] min-w-[50%]" />
      <Field type="number" min="0" label="max" containerStyle="!w-[50%] min-w-[50%]" />
   </div>
</div>
*/
