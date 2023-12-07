import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "@/redux/slices/products";

import { Field, Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";
import { carLogo } from "@/assets";

export const Category = () => {
   const [formData, setFormData] = useState({ img: "", category: "", company: "" });
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const dispatch = useDispatch();

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const { isSubmitted, error } = await refetch("post", "/products/create-category", formData);
      if (isSubmitted && error) return;

      // Success
      dispatch(setCategories(formData));
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText="اضافه قسم جديد"
         buttonText="انشاء"
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/creates/company" />

         <div className="w-full">
            <img
               src={formData.img || carLogo}
               alt="product"
               className="m-auto mb-4 block h-28 w-28 rounded-full shadow-sp"
            />
            <Field label="رابط الصورة" name="img" value={formData.img} onChange={handleFieldChange} />
         </div>

         <Field label="اسم القسم" name="category" value={formData.category} onChange={handleFieldChange} />
         <Field label="اسم الشركة" name="company" value={formData.company} onChange={handleFieldChange} />
      </Form>
   );
};
