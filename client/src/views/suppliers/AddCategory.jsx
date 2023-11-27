import { useNavigate } from "react-router-dom";
import { Field } from "@/components";
import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";
import { useState } from "react";

export const AddCategory = () => {
   const [formData, setFormData] = useState("");
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/suppliers/add-company");
   };

   return (
      <form onSubmit={handleSubmit}>
         <Card className="m-auto mt-32 min-h-full w-96 shadow-sp">
            <CardHeader variant="gradient" color="deep-purple" className="mb-4 grid h-28 place-items-center">
               <Typography variant="h3" color="white">
                  اضافه قسم جديد
               </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
               <Field label="اسم القسم" onChange={(e) => setFormData(() => e.target.value)} />
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
