import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Selectbox } from "@/components/public";
import { productLogo } from "@/assets";
import { useDispatch } from "react-redux";
import { setCategories, setCompanies } from "@/redux";

export const Company = () => {
   const [formData, setFormData] = useState({ img: "", category: "", company: "" });
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);

      // Success
      dispatch(setCategories(formData.category));
      dispatch(setCompanies(formData.company));
      setTimeout(() => navigate("/creates/products"), 2000);
   };

   return (
      <Form onSubmit={handleSubmit} headerText="اضافه شركة جديد" buttonText="انشاء">
         <div className="w-full">
            <img
               src={formData.img || productLogo}
               alt="product"
               className="m-auto mb-4 block h-28 w-28 rounded-full shadow-sp"
            />
            <Field
               type="file"
               onChange={(e) => setFormData((f) => ({ ...f, img: URL.createObjectURL(e.target.files[0]) }))}
            />
         </div>

         <Selectbox
            label="اختر اسم القسم..."
            onChange={(value) => setFormData((f) => ({ ...f, category: value }))}
            options={["القسم الاول", "القسم الثاني", "القسم الثالث", "القسم الرابع", "القسم الخامس"]}
         />

         <Field label="اسم الشركة" onChange={(e) => setFormData((f) => ({ ...f, company: e.target.value }))} />
      </Form>
   );
};
