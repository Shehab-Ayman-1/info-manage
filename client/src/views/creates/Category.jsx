import { useNavigate } from "react-router-dom";
import { Field } from "@/components";
import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";
import { useState } from "react";

export const Category = () => {
   const [formData, setFormData] = useState("");
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/suppliers/add-company");
   };

   return (
      <form onSubmit={handleSubmit} className="p-5 md:p-0">
         <Card className="m-auto mt-14 min-h-full w-96 max-w-full shadow-sp md:mt-32">
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
