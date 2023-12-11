import { useState } from "react";
import { useDispatch } from "react-redux";

import { Field, Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { login } from "@/redux/slices/users";

export const Login = () => {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const dispatch = useDispatch();

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!Object.values(formData).every((p) => p)) return alert("ادخل جميع البيانات المطلوبة");

      const { data, isSubmitted, error } = await refetch("post", "/users/login", formData);
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

         <Field
            label="البريد الالكتروني او الهاتف"
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
      </Form>
   );
};
