import { Card, Typography } from "@material-tailwind/react";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

const TABLE_HEAD = ["المكان", "المبلغ"];
export const Balances = () => {
   const {
      data: buyData,
      loading: bLoading,
      error: bError,
      isSubmitted: bIsSubmitted,
   } = useAxios("get", `/products/get-balances?price=buy`);

   const {
      data: saleData,
      loading: sLoading,
      error: sError,
      isSubmitted: sIsSubmitted,
   } = useAxios("get", `/products/get-balances?price=sale`);

   if (bLoading || (bIsSubmitted && bError))
      return <Loading isSubmitted={bIsSubmitted} loading={bLoading} error={bError} message={buyData} />;

   if (sLoading || (sIsSubmitted && sError))
      return <Loading isSubmitted={sIsSubmitted} loading={sLoading} error={sError} message={saleData} />;

   return (
      <Card className="dark:bg-darkGray min-h-screen rounded-none">
         <Typography
            variant="h4"
            color="deep-purple"
            className="my-4 px-2 text-center text-3xl sm:px-4 sm:text-4xl md:text-6xl"
         >
            حسب سعر الشراء
         </Typography>

         <BalancesTable data={buyData} />

         <Typography
            variant="h4"
            color="deep-purple"
            className="my-4 px-2 text-center text-3xl sm:px-4 sm:text-4xl md:text-6xl"
         >
            حسب سعر البيع
         </Typography>

         <BalancesTable data={saleData} />
      </Card>
   );
};

function BalancesTable({ data }) {
   const classes = "border-b border-deep-purple-500 p-2 md:p-4";
   const typography = "text-center text-base font-semibold md:text-base lg:text-xl dark:text-blue-gray-500";

   return (
      <Card className="h-full w-full overflow-x-auto bg-transparent p-4 shadow-none">
         <table className="mb-4 w-full max-w-full table-auto rounded-3xl shadow-sp">
            <thead>
               <tr className="border-0 border-b border-solid border-deep-purple-500">
                  {TABLE_HEAD.map((head) => (
                     <th key={head} className="bg-dimPurple p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="text-center text-base font-semibold md:text-base lg:text-xl"
                        >
                           {head}
                        </Typography>
                     </th>
                  ))}
               </tr>
            </thead>

            <tbody>
               <tr className={classes}>
                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        الخزنة
                     </Typography>
                  </td>

                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        {data?.lock || 0}
                     </Typography>
                  </td>
               </tr>

               <tr className={`${classes} bg-dimPurple`}>
                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        المحل
                     </Typography>
                  </td>

                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        {data?.shop || 0}
                     </Typography>
                  </td>
               </tr>

               <tr className={classes}>
                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        المخزن
                     </Typography>
                  </td>
                  <td className={classes}>
                     <Typography variant="h5" className={typography}>
                        {data?.store || 0}
                     </Typography>
                  </td>
               </tr>
            </tbody>

            <tfoot>
               <tr className="bg-dimPurple border-0 border-t border-solid border-deep-purple-500">
                  <th className="p-2 md:p-4">
                     <Typography
                        variant="h5"
                        color="deep-purple"
                        className="text-center text-base font-semibold md:text-base lg:text-xl"
                     >
                        اجمالي راس المال
                     </Typography>
                  </th>
                  <th className="p-2 md:p-4">
                     <Typography
                        variant="h5"
                        color="deep-purple"
                        className="text-center text-base font-semibold md:text-base lg:text-xl"
                     >
                        {data?.total || 0} جنيه
                     </Typography>
                  </th>
               </tr>
            </tfoot>
         </table>
      </Card>
   );
}
