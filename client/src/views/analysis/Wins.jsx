import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Chart, PageHead } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AnalysisWins = () => {
   const [text] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", "/bills/get-months-wins");

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text={text("profits-title")} />

         <div className="flex-between flex-nowrap: md:flex-wrap">
            <Chart
               head={text("profits-of-year")}
               icon="fa-cart-arrow-down"
               description={text("profits-subTitle")}
               data={{
                  categories: data?.map((item) => item.month),
                  series: {
                     name: text("profits-word"),
                     data: data?.map((item) => ({ x: item.month, y: item.profits })),
                  },
               }}
            />
         </div>
      </Fragment>
   );
};
