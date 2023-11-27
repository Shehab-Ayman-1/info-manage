import { useNavigate } from "react-router-dom";
import { Field, Selectbox } from "@/components";
import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";
import { useState } from "react";

export const Products = () => {
   const [formData, setFormData] = useState({ category: "", company: "", products: [""] });
   const navigate = useNavigate();

   const addField = () => {
      setFormData((f) => ({ ...f, products: [...f.products, ""] }));
   };

   const handleChange = (index, value) => {
      setFormData((data) => {
         data.products[index] = value;
         return data;
      });
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/");
   };

   return (
      <form onSubmit={handleSubmit} className="p-5 md:p-0">
         <Card className="m-auto mt-14 min-h-full w-96 max-w-full shadow-sp md:mt-32">
            <CardHeader variant="gradient" color="deep-purple" className="mb-4 grid h-28 place-items-center">
               <Typography variant="h3" color="white">
                  اضافه منتج جديد
               </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">
               <Selectbox
                  label="اختر اسم القسم..."
                  onChange={(value) => setFormData((f) => ({ ...f, category: value }))}
                  options={["القسم الاول", "القسم الثاني", "القسم الثالث", "القسم الرابع", "القسم الخامس"]}
               />

               <Selectbox
                  label="اختر اسم الشركة..."
                  onChange={(value) => setFormData((f) => ({ ...f, company: value }))}
                  options={["الشركة الاول", "الشركة الثاني", "الشركة الثالث", "الشركة الرابع", "الشركة الخامس"]}
               />

               {formData.products.map((_, i) => (
                  <Field label={`اسم المنتج ${i + 1}`} onChange={(e) => handleChange(i, e.target.value)} key={i} />
               ))}

               <Typography
                  variant="small"
                  className="m-auto w-fit cursor-pointer text-xl font-bold text-primary/70 hover:text-primary"
                  onClick={addField}
               >
                  اضافه منتج اخر
               </Typography>
            </CardBody>

            <CardFooter className="pt-0">
               <Button type="submit" variant="gradient" color="deep-purple" className="text-2xl" fullWidth>
                  انشاء
               </Button>
            </CardFooter>
         </Card>
      </form>
   );
};
