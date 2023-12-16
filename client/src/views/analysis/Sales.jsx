import { Chart, PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Fragment } from "react";

export const AnalysisSales = () => {
   const { data, loading, error, isSubmitted } = useAxios("get", "/bills/get-months-sales");

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text="احصائيات المبيعات" />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Chart
               head="المبيعات خلال العام"
               icon="fa-cart-arrow-down"
               description="يمكنك لمس الخط لرؤية سعر الشراء في ذلك الوقت"
               data={{
                  categories: data?.map((item) => item.month),
                  series: {
                     name: "العدد",
                     data: data?.map((item) => Math.abs(item.sales)),
                  },
                  type: "line",
               }}
            />

            <Chart
               head="المبيعات خلال العام"
               icon="fa-cart-arrow-down"
               description="يمكنك لمس الخط لرؤية سعر الشراء في ذلك الوقت"
               data={{
                  categories: data?.map((item) => item.month),
                  series: {
                     name: "العدد",
                     data: data?.map((item) => Math.abs(item.sales)),
                  },
               }}
            />
         </div>
      </Fragment>
   );
};
