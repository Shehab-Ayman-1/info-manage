import { Fragment, useEffect, useState } from "react";

import { BillPage } from "@/components/bills";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { useTranslation } from "react-i18next";

export const ShowBills = () => {
   const [text] = useTranslation();

   const { data: pay, loading: pLoading, error: pError, isSubmitted: IsSubmitted, refetch: pRefetch } = useAxios();
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   const [activePage, setActivePage] = useState(0);

   useEffect(() => {
      (async () => {
         await refetch("get", `/bills/get-bills?type=bill&activePage=${activePage}`);
      })();
   }, [activePage]);

   const handleSubmit = async (payment) => {
      return await pRefetch("put", "/bills/payment?type=bill", {
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
            head={text("bills-title")}
            data={data?.data}
            pagination={data?.pagination}
            activePage={activePage}
            setActivePage={setActivePage}
            type="bill"
            handleSubmit={handleSubmit}
            paymentData={pay}
            loading={pLoading}
            isSubmitted={IsSubmitted}
            error={pError}
         />
      </Fragment>
   );
};
