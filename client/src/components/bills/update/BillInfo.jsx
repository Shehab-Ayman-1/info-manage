import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Field } from "@/components/ui";

export const BillInfo = ({ formData }) => {
   const [text, i18next] = useTranslation();
   const completed = formData?.pay.completed
      ? text("updateBill-type-completed")
      : text("updateBill-type-notCompleted");

   const place = formData?.place === "store" ? text("store") : text("shop");
   const date = new Date(formData?.date || "").toLocaleDateString();

   return (
      <Fragment>
         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field label={text("updateBill-client")} value={formData?.client} disabled />
            <Field label={text("updateBill-phone")} value={formData?.phone} disabled />
         </div>

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field label={text("updateBill-place")} value={place} disabled />
            <Field label={text("updateBill-date")} value={date} disabled />
         </div>

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field label={text("updateBill-type")} value={completed} disabled />
            <Field
               label={text("updateBill-price")}
               value={`${formData?.pay.value || 0} - ${formData?.pay.discount || 0}`}
               disabled
            />
         </div>
      </Fragment>
   );
};
