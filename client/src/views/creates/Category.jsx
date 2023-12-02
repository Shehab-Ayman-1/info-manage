import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategories } from "@/redux/slices/creates";

import { Field, Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

export const Category = () => {
   const [formData, setFormData] = useState({ category: "", company: "" });
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

         <Field label="اسم القسم" name="category" onChange={handleFieldChange} />
         <Field label="اسم الشركة" name="company" onChange={handleFieldChange} />
      </Form>
   );
};
