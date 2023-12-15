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
            rowsLength={Object.keys(buyData || {})?.length}
            footerTitle="اجمالي الارصدة"
            total={buyData?.total}
         >
            <Row index={0}>
               <Col>{buyData?.locker.toLocaleString()}</Col>
               <Col>{buyData?.shop.toLocaleString()}</Col>
               <Col>{buyData?.store.toLocaleString()}</Col>
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
            rowsLength={Object.keys(saleData || {})?.length}
            footerTitle="اجمالي الارصدة"
            total={saleData?.total}
         >
            <Row index={0}>
               <Col>{saleData?.locker.toLocaleString()}</Col>
               <Col>{saleData?.shop.toLocaleString()}</Col>
               <Col>{saleData?.store.toLocaleString()}</Col>
            </Row>
         </Table>
      </Card>
   );
};
