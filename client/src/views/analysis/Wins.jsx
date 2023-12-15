import { Chart, PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Typography } from "@material-tailwind/react";
import { Fragment } from "react";

export const AnalysisWins = () => {
   const { data, loading, error, isSubmitted } = useAxios("get", "/products/get-months-wins");

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text="احصائيات الارباح" />

         <div className="flex-between flex-nowrap: md:flex-wrap">
            <Chart
               head="الارباح خلال العام"
               icon="fa-cart-arrow-down"
               description="يمكنك لمس الخط لرؤية الارباح ذلك الشهر"
               data={{
                  categories: data?.map((item) => item.month),
                  series: {
                     name: "الارباح",
                     data: data?.map((item) => ({ x: item.month, y: item.profits })),
                  },
               }}
            />
         </div>
      </Fragment>
   );
};
