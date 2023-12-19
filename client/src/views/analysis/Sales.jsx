import { Fragment } from "react";

import { Chart, PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

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
               description="يمكنك لمس الخط لرؤية العدد في ذلك الوقت"
               data={{
                  categories: data?.year.map((item) => item.month),
                  series: {
                     name: "العدد",
                     data: data?.year.map((item) => Math.abs(item.sales)),
                  },
               }}
            />

            <Chart
               head="المبيعات خلال الشهر"
               icon="fa-cart-arrow-down"
               description="يمكنك لمس الخط لرؤية العدد في ذلك الوقت"
               data={{
                  categories: data?.months.map((item) => item.date),
                  series: {
                     name: "العدد",
                     data: data?.months.map((item) => Math.abs(item.price)),
                  },
                  type: "line",
               }}
            />
         </div>
      </Fragment>
   );
};
