import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, Form, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const ROLES = ["Admin", "User"];
export const Register = () => {
   const [text] = useTranslation();
   const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", role: 0 });
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   const handleSelectChange = (name, value) => {
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!Object.values(formData).every((p) => p)) return alert("ادخل جميع البيانات المطلوبة");

      await refetch("post", "/users/register", formData);
   };

   return (
      <Form
         onSubmit={handleSubmit}
         buttonText={text("register-btn")}
         headerText={text("register-title")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />
         <Field
            label={text("register-name")}
            inputStyle="normal-case"
            name="name"
            value={formData.name}
            onChange={handleFieldChange}
         />

         <Field
            type="email"
            label={text("register-email")}
            inputStyle="normal-case"
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
         />

         <Field
            type="password"
            label={text("register-password")}
            inputStyle="normal-case"
            name="password"
            value={formData.password}
            onChange={handleFieldChange}
         />

         <Selectbox
            label={text("register-type")}
            name="role"
            options={ROLES}
            loading={!isSubmitted && loading}
            value={formData.role}
            onChange={(value) => handleSelectChange("role", value)}
         />

         <Field
            type="number"
            label={text("register-phone")}
            name="phone"
            value={formData.phone}
            onChange={handleFieldChange}
         />
      </Form>
   );
};
