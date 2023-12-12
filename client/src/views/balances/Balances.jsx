import { Card, Typography } from "@material-tailwind/react";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Table, Row, Col } from "@/components/table";

const TABLE_HEAD = ["الخزنة", "المحل", "المخزن"];
export const ShowBalances = () => {
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
      <Card className="rounded-none bg-transparent">
         <Typography
            variant="h4"
            color="deep-purple"
            className="my-4 px-2 text-center text-2xl sm:px-4 sm:text-3xl md:text-5xl"
         >
            حسب سعر الشراء
         </Typography>

         <Table
            headers={TABLE_HEAD}
            rows={Object.keys(buyData || {})}
            footerTitle="اجمالي الارصدة"
            total={buyData?.total}
         >
            <Row index={0}>
               <Col>{0 || buyData?.locker}</Col>
               <Col>{buyData?.shop}</Col>
               <Col>{buyData?.store}</Col>
            </Row>
         </Table>

         <Typography
            variant="h4"
            color="deep-purple"
            className="mb-4 mt-20 px-2 text-center text-2xl sm:px-4 sm:text-3xl md:text-5xl"
         >
            حسب سعر البيع
         </Typography>

         <Table
            headers={TABLE_HEAD}
            rows={Object.keys(saleData || {})}
            footerTitle="اجمالي الارصدة"
            total={saleData?.total}
         >
            <Row index={0}>
               <Col>{0 || saleData?.locker}</Col>
               <Col>{saleData?.shop}</Col>
               <Col>{saleData?.store}</Col>
            </Row>
         </Table>
      </Card>
   );
};
