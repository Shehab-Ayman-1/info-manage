import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Chart, PageHead } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AnalysisSales = () => {
   const [text] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", "/bills/get-months-sales");

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text={text("sales-title")} />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Chart
               head={text("sales-of-year")}
               icon="fa-cart-arrow-down"
               description={text("sales-subTitle")}
               data={{
                  categories: data?.year.map((item) => item.month),
                  series: {
                     name: text("count"),
                     data: data?.year.map((item) => Math.abs(item.sales)),
                  },
               }}
            />

            <Chart
               head={text("sales-of-month")}
               icon="fa-cart-arrow-down"
               description={text("sales-subTitle")}
               data={{
                  categories: data?.months.map((item) => item.date),
                  series: {
                     name: text("count"),
                     data: data?.months.map((item) => Math.abs(item.price)),
                  },
                  type: "line",
               }}
            />
         </div>
      </Fragment>
   );
};
