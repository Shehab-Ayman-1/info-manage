import { Card, IconButton, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, MTDialog, PageHead, Pagination } from "@/components/ui";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";

const paymentState = {
   _id: "",
   client: "",
   billCost: "",
   newValue: "",
   pay: { completed: false, value: 0, discount: 0 },
};
export const BillPage = ({
   head,
   type,
   data,
   pagination,
   activePage,
   setActivePage,
   handleSubmit,
   paymentData,
   isSubmitted,
   loading,
   error,
}) => {
   const [text] = useTranslation();
   const [filterResult, setFilterResult] = useState(null);
   const [openDialog, setOpenDialog] = useState(false);
   const [payment, setPayment] = useState(paymentState);
   const navigate = useNavigate();

   const {
      data: deleteData,
      loading: dLoading,
      error: dError,
      isSubmitted: dIsSubmitted,
      refetch: dRefetch,
   } = useAxios();

   useEffect(() => {
      setFilterResult(data);
   }, [data]);

   const handleOpenDialog = (bill) => {
      setOpenDialog((open) => !open);
      if (bill) setPayment(() => ({ newValue: "", ...bill }));
   };

   const handleDelete = async (id) => {
      const confirm = window.confirm("هل انت متاكد من حذف الفاتورة");
      if (!confirm) return;

      const { isSubmitted, error } = await dRefetch("delete", `/bills/delete-bill/${id}?type=${type}`);
      if (isSubmitted && error) return;

      setFilterResult((data) => {
         const newData = data.filter((item) => item._id !== id);
         return newData;
      });
   };

   const handlePayment = async () => {
      if (!payment.newValue) return alert("يجب ادخال المبلغ المراد سداده");

      const { isSubmitted, error } = await handleSubmit(payment);
      if (isSubmitted && error) return;

      const bill = data.find((bill) => bill._id === payment._id);
      setFilterResult((data) => {
         const billIndex = data.findIndex((item) => item._id === payment._id);
         data[billIndex] = {
            ...bill,
            pay: {
               ...bill.pay,
               value: +payment.pay.value + +payment.newValue,
               completed:
                  +payment?.billCost - +payment?.pay.value - +payment?.pay.discount - +payment.newValue <= 0,
            },
         };
         return data;
      });

      setPayment(paymentState);
      setOpenDialog(false);
   };

   return (
      <Card className="bg-transparent shadow-none">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={paymentData} />
         <Loading isSubmitted={dIsSubmitted} loading={dLoading} error={dError} message={deleteData} />

         <PageHead text={head} />

         {pagination > 1 && (
            <Pagination activePage={activePage} setActivePage={setActivePage} pagination={pagination} />
         )}

         <div
            className={`rounded-lg py-2 shadow-sp dark:shadow-none ${
               !filterResult?.length && !pagination ? "hidden" : ""
            }`}
         >
            {(filterResult || data)?.map(({ _id, client, date, billCost, pay }, i) => (
               <div className={`flex-between relative py-2 ${i % 2 ? "" : "bg-dimPurple"}`} key={i}>
                  <div
                     className={`border-sp absolute -z-10 w-full !border-primary-200 dark:!border-primary-900 ${
                        pay?.completed ? "" : "hidden"
                     }`}
                  />

                  <div className="flex-start">
                     <div className="flex">
                        <IconButton
                           variant="text"
                           color="red"
                           className={`group h-7 w-7 md:h-10 md:w-10 ${dLoading ? "pointer-events-none" : ""}`}
                           onClick={() => handleDelete(_id)}
                        >
                           <i className="fa fa-times text-base text-red-500 group-hover:text-red-900 md:text-xl" />
                        </IconButton>
                        <IconButton
                           variant="text"
                           color="orange"
                           className="group h-7 w-7 md:h-10 md:w-10"
                           onClick={() => navigate(`/bills/update-bill/${_id}`)}
                        >
                           <i className="fa fa-edit text-base text-orange-500 group-hover:text-orange-900 md:text-xl" />
                        </IconButton>
                        <IconButton
                           variant="text"
                           color="green"
                           className="group h-7 w-7 md:h-10 md:w-10"
                           onClick={() => handleOpenDialog({ _id, client, billCost, pay })}
                        >
                           <i className="fa fa-money-bill-wave text-base text-green-500 group-hover:text-green-900 md:text-xl" />
                        </IconButton>
                     </div>

                     <Typography variant="h5" className="pb-3 text-base text-dimWhite dark:text-white md:text-xl">
                        {client}
                     </Typography>
                  </div>
                  <div className="flex-start">
                     <Typography variant="h5" className="pb-2 text-base text-dimWhite dark:text-white md:text-xl">
                        {date}
                     </Typography>
                     <IconButton variant="text" color="white">
                        <i
                           className="fa fa-eye text-base text-dimWhite dark:text-white md:text-xl"
                           onClick={() => navigate(`/bills/show-bill/${_id}?type=${type}`)}
                        />
                     </IconButton>
                  </div>
               </div>
            ))}
         </div>

         <Typography variant="h3" color="gray" className={!filterResult?.length || !data?.length ? "" : "hidden"}>
            {text("bills-noresult")}
         </Typography>

         <MTDialog
            buttonText={text("bills-widget-btn")}
            headerText={text("bills-widget-title")}
            open={openDialog}
            loading={loading || (isSubmitted && (error || data?.warn))}
            handler={handleOpenDialog}
            onSubmit={handlePayment}
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
               onChange={(event) => setPayment((payment) => ({ ...payment, newValue: event.target?.value }))}
            />
         </MTDialog>
      </Card>
   );
};
