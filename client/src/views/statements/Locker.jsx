import { useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, Form, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AddToLocker = () => {
   const [text] = useTranslation();

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [price, setPrice] = useState({ isAppend: false, name: "", value: 0 });

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!price.name && !price.value) return alert("يجب ادخال جميع البيانات المطلوبة");

      await refetch("post", "/locker/append-to-locker", {
         name: price.name,
         price: price.isAppend ? price.value : -price.value,
      });
   };

   return (
      <Form
         onSubmit={handleSubmit}
         loading={loading || (isSubmitted && !error)}
         buttonText={price.isAppend ? text("deposit") : text("withdraw")}
         headerText={text("locker")}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field
            label={text("reason")}
            onChange={(event) => setPrice((p) => ({ ...p, name: event.target.value }))}
         />

         <Field
            type="number"
            label={text("cost")}
            onChange={(event) => setPrice((p) => ({ ...p, value: +event.target.value }))}
         />

         <Selectbox
            label={text("locker-switch-label")}
            options={[text("locker-switch-deposit"), text("locker-switch-withdraw")]}
            value={price.isAppend ? text("locker-switch-deposit") : text("locker-switch-withdraw")}
            loading={!isSubmitted && loading}
            onChange={(value) =>
               setPrice((data) => ({ ...data, isAppend: value === text("locker-switch-deposit") }))
            }
         />
      </Form>
   );
};
