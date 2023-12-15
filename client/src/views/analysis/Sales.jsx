import { Chart } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const AnalysisSales = () => {
   const { data, loading, error, isSubmitted } = useAxios("get", "/products/get-months-sales");

   return (
      <div className="flex-between flex-nowrap: md:flex-wrap">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

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
   );
};
