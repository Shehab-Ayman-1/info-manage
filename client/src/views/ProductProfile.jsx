import { Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Fragment, useEffect } from "react";

import { Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

export const ProductProfile = () => {
   const { companyId, productId } = useParams();
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (!companyId || !productId || data) return;

      (async () => {
         await refetch("get", `/products/get-profile/${companyId}/${productId}`);
      })();
   }, []);

   if (isSubmitted && error) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} />;

   const valueTypograph = `bg-dimPurple rounded-lg text-xl pr-4 p-2 dark:text-blue-gray-500`;

   return (
      <Form headerText="عرض منتج">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} />

         {data?.name && (
            <Fragment>
               <div className="">
                  <img
                     src={data.img}
                     alt="profile"
                     className="object-cotain mx-auto block h-32 w-32 rounded-full shadow-sp"
                  />
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الاسم
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.name}
                  </Typography>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الباركود
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.barcode}
                  </Typography>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        سعر الشراء
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.buy} جنية
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        سعر البيع
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.sale} جنية
                     </Typography>
                  </div>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        عدد المخزن
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.store} قطعة
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        عدد المحل
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.shop} قطعة
                     </Typography>
                  </div>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الموردين
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.suppliers.join(" | ")}
                  </Typography>
               </div>
            </Fragment>
         )}
      </Form>
   );
};
