import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { setCategories } from "@/redux/products";
import { Field, Form } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { carLogo } from "@/assets";

export const AddCategory = () => {
   const [text] = useTranslation();

   const [formData, setFormData] = useState({ category: "" });
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const dispatch = useDispatch();
   const { state } = useLocation();

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const { isSubmitted, error } = await refetch("post", "/products/create-category", formData);
      if (isSubmitted && error) return;

      dispatch(setCategories(formData));
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("creates-category-title")}
         buttonText={text("creates-btn")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading
            isSubmitted={isSubmitted}
            loading={loading}
            error={error}
            message={data}
            to={state?.redirectTo || "/creates/company"}
         />

         {/* <div className="w-full">
            <img
               src={formData.img || carLogo}
               alt="product"
               className="m-auto mb-4 block h-28 w-28 rounded-full shadow-sp"
            />
            <Field label={text("image")} name="img" value={formData.img} onChange={handleFieldChange} />
         </div> */}

         <Field
            label={text("insertCategory")}
            name="category"
            value={formData.category}
            onChange={handleFieldChange}
         />
         {/* <Field
            label={text("insertCompany")}
            name="company"
            value={formData.company}
            onChange={handleFieldChange}
         /> */}
      </Form>
   );
};
