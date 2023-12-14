import { useState } from "react";
import { useDispatch } from "react-redux";

import { setClients } from "@/redux/slices/bills";
import { Field, Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AddClient = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [formData, setFormData] = useState({ client: "", address: "", phone: "" });
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
         headerText="اضافه عميل جديد"
         buttonText="انشاء"
         loading={(isSubmitted && !error) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field label="اسم العميل" name="client" value={formData.client} onChange={handleFieldChange} />

         <Field label="العنوان" name="address" value={formData.address} onChange={handleFieldChange} />

         <Field label="رقم الهاتف" name="phone" value={formData.phone} onChange={handleFieldChange} />
      </Form>
   );
};
