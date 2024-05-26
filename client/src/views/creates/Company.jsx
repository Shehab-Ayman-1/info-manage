import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getLists, setCompanies } from "@/redux/products";
import { Field, Form, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { carLogo } from "@/assets";

export const AddCompany = () => {
   const [text] = useTranslation();
   const [formData, setFormData] = useState({ img: "", category: "", company: "" });

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { loading: lLoading, isSubmitted: lIsSubmitted, refetch: listsRefetch } = useAxios();

   const { lists, categories } = useSelector(({ products }) => products);
   const dispatch = useDispatch();
   const { state } = useLocation();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await listsRefetch(
            "get",
            "/products/get-products-list?isEmpty=true",
         );
         if (isSubmitted && error) return;
         console.log(data);
         dispatch(getLists(data));
      })();
   }, []);

   const handleSelectChange = (name, value) => {
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const { isSubmitted, error } = await refetch("post", "/products/create-company", formData);
      if (isSubmitted && error) return;

      dispatch(setCompanies({ category: formData.category, company: formData.company }));
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("creates-company-title")}
         buttonText={text("creates-btn")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading
            isSubmitted={isSubmitted}
            loading={loading}
            error={error}
            message={data}
            to={state?.redirectTo || "/creates/products"}
         />

         <div className="w-full">
            <img
               src={formData.img || carLogo}
               alt="product"
               className="m-auto mb-4 block h-28 w-28 rounded-full shadow-sp"
            />
            <Field label={text("image")} name="img" value={formData.img} onChange={handleFieldChange} />
         </div>

         <Selectbox
            label={text("chooseCategory")}
            value={formData.category}
            options={categories}
            loading={!lIsSubmitted && lLoading}
            onChange={(value) => handleSelectChange("category", value)}
         />

         <Field
            label={text("insertCompany")}
            name="company"
            value={formData.company}
            onChange={handleFieldChange}
         />
      </Form>
   );
};
