import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Field, Selectbox } from "../ui";

export const Info = ({ isAdminPay, formData, setFormData }) => {
   const [text] = useTranslation();

   return (
      <Fragment>
         <div className="flex-between flex-wrap md:flex-nowrap">
            <Selectbox
               label={text("paymentMethod")}
               value={formData.paymentMethod ? text("visa") : text("cash")}
               options={[text("visa"), text("cash")]}
               onChange={(value) => setFormData((data) => ({ ...data, paymentMethod: value }))}
            />

            <Selectbox
               label={text("place")}
               value={formData.toStore ? text("store") : text("shop")}
               options={[text("store"), text("shop")]}
               onChange={(value) => setFormData((data) => ({ ...data, toStore: value === text("store") }))}
            />
         </div>

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Field
               type="number"
               min="0"
               value={formData.discount}
               label={text("discount")}
               onChange={(event) => setFormData((data) => ({ ...data, discount: event.target.value }))}
            />

            <Field
               type="number"
               min="0"
               value={isAdminPay ? formData.adminPay : formData.clientPay}
               label={isAdminPay ? text("paidcost") : text("recievedcost")}
               onChange={(event) =>
                  setFormData((data) => ({
                     ...data,
                     [isAdminPay ? "adminPay" : "clientPay"]: event.target.value,
                  }))
               }
            />
         </div>
      </Fragment>
   );
};
