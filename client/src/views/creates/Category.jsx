import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form } from "@/components/public";
import { useDispatch } from "react-redux";
import { setCategories, setCompanies } from "@/redux";

export const Category = () => {
   const [formData, setFormData] = useState({ category: "", company: "" });
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);

      // Success
      dispatch(setCategories(formData.category));
      dispatch(setCompanies(formData.company));
      setTimeout(() => navigate("/creates/company"), 2000);
   };

   return (
      <Form onSubmit={handleSubmit} headerText="اضافه قسم جديد" buttonText="انشاء">
         <Field label="اسم القسم" onChange={(e) => setFormData((d) => ({ ...d, category: e.target.value }))} />
         <Field label="اسم الشركة" onChange={(e) => setFormData((d) => ({ ...d, company: e.target.value }))} />
      </Form>
   );
};
