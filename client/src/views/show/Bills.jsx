import { Fragment, useEffect } from "react";

import { BillPage } from "@/components/bills";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const ShowBills = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { data: pay, loading: pLoading, error: pError, isSubmitted: IsSubmitted, refetch: pRefetch } = useAxios();

   useEffect(() => {
      (async () => {
         await refetch("get", "/bills/get-bills?type=bill");
      })();
   }, []);

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
            head="عرض الفواتير"
            data={data}
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
