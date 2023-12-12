import { useState } from "react";

import { Field, Form, Switch } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AddToLocker = () => {
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
         buttonText={price.isAppend ? "اضافه" : "سحب"}
         headerText="الخزنة"
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <Field label="السبب" onChange={(event) => setPrice((p) => ({ ...p, name: event.target.value }))} />

         <Field
            type="number"
            label="المبلغ"
            onChange={(event) => setPrice((p) => ({ ...p, value: +event.target.value }))}
         />
         <div className="mt-5">
            <Switch
               label={price.isAppend ? "اضافه الي الخزنة" : "سحب من الخزنة"}
               checked={price.isAppend}
               required={false}
               onChange={(event) => setPrice((data) => ({ ...data, isAppend: event.target.checked }))}
            />
         </div>
      </Form>
   );
};
