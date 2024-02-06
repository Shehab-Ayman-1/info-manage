import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { setClients } from "@/redux/bills";
import { Field, Form } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AddClient = () => {
   const [text] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [formData, setFormData] = useState({ client: "", phone: "" });
   const { state } = useLocation();
   const dispatch = useDispatch();

   const handleFieldChange = (event) => {
      setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      await refetch("post", "/bills/create-client", formData);
      dispatch(setClients(formData.client));
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("creates-client-title")}
         buttonText={text("creates-btn")}
         loading={(isSubmitted && !error) || loading}
      >
         <Loading
            isSubmitted={isSubmitted}
            loading={loading}
            error={error}
            message={data}
            to={state?.redirectTo || "/"}
         />
         <Field label={text("insertClient")} name="client" value={formData.client} onChange={handleFieldChange} />
         <Field
            label={text("creates-client-phone")}
            name="phone"
            value={formData.phone}
            onChange={handleFieldChange}
         />
      </Form>
   );
};
