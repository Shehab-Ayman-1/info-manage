import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field, Form } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { login } from "@/redux/users";

export const Login = () => {
   const [text] = useTranslation();

   const [formData, setFormData] = useState({ email: "", password: "" });
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) return;
      dispatch(login(user));
      navigate("/");
   }, []);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!Object.values(formData).every((p) => p)) return alert("ادخل جميع البيانات المطلوبة");

      const { data, isSubmitted, error } = await refetch("post", "/users/login", formData);
      if (isSubmitted && error) return;

      dispatch(login(data.user));
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
   };

   return (
      <Form
         onSubmit={handleSubmit}
         buttonText={text("login-btn")}
         headerText={text("login-title")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field
            label={text("login-email")}
            inputStyle="normal-case"
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
         />

         <Field
            type="password"
            label={text("login-password")}
            inputStyle="normal-case"
            name="password"
            value={formData.password}
            onChange={handleFieldChange}
         />
      </Form>
   );
};
