import { useState } from "react";
import { useDispatch } from "react-redux";

import { Field, Form, Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";
import { login } from "@/redux/slices/users";

const ROLES = ["admin", "user"];

export const Register = () => {
   const [formData, setFormData] = useState({ name: "", email: "", password: "", phone: "", role: 0 });
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const dispatch = useDispatch();

   const handleSelectChange = (name, value) => {
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!Object.values(formData).every((p) => p)) return alert("ادخل جميع البيانات المطلوبة");

      const { data, isSubmitted, error } = await refetch("post", "/users/register", formData);
      if (isSubmitted && error) return;

      dispatch(login(data.user));
      sessionStorage.setItem("user", JSON.stringify(data.user));
   };

   return (
      <Form
         onSubmit={handleSubmit}
         buttonText="تسجيل"
         headerText="تسجيل الدخول"
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field label="الاسم" name="name" value={formData.name} onChange={handleFieldChange} />

         <Field
            type="email"
            label="البريد الالكتروني"
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
         />

         <Field
            type="password"
            label="ادخل كلمة السر"
            name="password"
            value={formData.password}
            onChange={handleFieldChange}
         />

         <Selectbox
            label="نوع الايميل"
            name="role"
            options={ROLES}
            loading={!isSubmitted && loading}
            value={formData.role}
            onChange={(value) => handleSelectChange("role", value)}
         />

         <Field
            type="number"
            label="رقم الهاتف"
            name="phone"
            value={formData.phone}
            onChange={handleFieldChange}
         />
      </Form>
   );
};
