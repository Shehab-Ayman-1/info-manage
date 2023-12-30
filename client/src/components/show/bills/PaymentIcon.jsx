import { IconButton, Typography } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, MTDialog } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const pay = { completed: false, value: 0, discount: 0 };
const paymentState = { _id: "", client: "", billCost: "", newValue: "", pay };
export const PaymentIcon = ({ data, setData, type, billInfo }) => {
   const [text, i18next] = useTranslation();

   const [openDialog, setOpenDialog] = useState(false);
   const [payment, setPayment] = useState(paymentState);

   const { data: message, loading, error, isSubmitted, refetch } = useAxios();

   const handleOpenDialog = (bill) => {
      setOpenDialog((open) => !open);
      if (bill) setPayment(() => ({ newValue: "", ...bill }));
   };

   const handleSubmit = async () => {
      if (!payment.newValue) return alert("يجب ادخال المبلغ المراد سداده");

      const completed = +payment?.billCost - +payment?.pay.value - +payment?.pay.discount - +payment.newValue <= 0;
      const body = { _id: payment._id, client: payment.client, value: payment.newValue, completed };

      const { isSubmitted, error } = await refetch("put", `/bills/payment?type=${type}`, body);
      if (isSubmitted && error) return;

      const bill = data.find((bill) => bill._id === payment._id);
      setData((form) => {
         const data = Array.from(form.data);
         const billIndex = data.findIndex((item) => item._id === payment._id);
         const value = +payment.pay.value + +payment.newValue;

         data[billIndex] = { ...bill, pay: { ...bill.pay, value, completed } };
         return { ...form, data };
      });

      setPayment(paymentState);
      setOpenDialog(false);
   };

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={message} />

         <IconButton
            variant="text"
            color="green"
            className="group h-7 w-7 md:h-10 md:w-10"
            onClick={() => handleOpenDialog(billInfo)}
         >
            <i className="fa fa-money-bill-wave text-base text-green-500 group-hover:text-green-900 md:text-xl" />
         </IconButton>

         <MTDialog
            buttonText={text("bills-widget-btn")}
            headerText={text("bills-widget-title")}
            open={openDialog}
            loading={loading || (isSubmitted && !error && !data?.warn)}
            handler={handleOpenDialog}
            onSubmit={handleSubmit}
         >
            <div className="">
               <Typography variant="h3" className="flex-between text-xl text-dimWhite md:text-3xl">
                  <span>{text("bills-widget-total-cost")}</span>
                  <span>{payment?.billCost}</span>
               </Typography>
               <Typography variant="h3" className="flex-between text-xl text-dimWhite md:text-3xl">
                  <span>{text("bills-widget-discount")}</span>
                  <span>{payment?.pay.discount}</span>
               </Typography>
               <Typography variant="h3" className="flex-between text-xl text-dimWhite md:text-3xl">
                  <span>{text("bills-widget-pending-cost")}</span>
                  <span>{+payment?.billCost - +payment?.pay.value - +payment?.pay.discount}</span>
               </Typography>
            </div>

            <Field
               type="number"
               label={text("bills-widget-input")}
               value={payment?.newValue}
               onChange={(event) => setPayment((payment) => ({ ...payment, newValue: event.target.value }))}
            />
         </MTDialog>
      </Fragment>
   );
};
