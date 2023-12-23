import { Fragment, useEffect, useState } from "react";

import { BillPage } from "@/components/bills";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { useTranslation } from "react-i18next";

export const ShowDebts = () => {
   const [text] = useTranslation();

   const [activePage, setActivePage] = useState(0);

   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const {
      data: paymentData,
      loading: pLoading,
      error: pError,
      isSubmitted: pIsSubmitted,
      refetch: pRefetch,
   } = useAxios();

   useEffect(() => {
      (async () => {
         await refetch("get", `/bills/get-bills?type=debt&activePage=${activePage}`);
      })();
   }, [activePage]);

   const handleSubmit = async (payment) => {
      return await pRefetch("put", "/bills/payment?type=debt", {
         _id: payment._id,
         client: payment.client,
         value: payment.newValue,
         completed: +payment?.billCost - +payment?.pay.value - +payment?.pay.discount - +payment.newValue <= 0,
      });
   };

   return (
      <Fragment>
         <Loading loading={loading} isSubmitted={isSubmitted} error={error} data={data} />

         <BillPage
            head={text("debts-title")}
            type="debt"
            data={data?.data}
            pagination={data?.pagination}
            activePage={activePage}
            setActivePage={setActivePage}
            handleSubmit={handleSubmit}
            paymentData={paymentData}
            loading={pLoading}
            isSubmitted={pIsSubmitted}
            error={pError}
         />
      </Fragment>
   );
};
