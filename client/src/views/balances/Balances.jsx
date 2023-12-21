import { Card } from "@material-tailwind/react";

import { Table, Row, Col } from "@/components/table";
import { PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

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
         <PageHead text="حسب سعر الشراء" />

         <Table headers={TABLE_HEAD} footerTitle="اجمالي الارصدة" total={buyData?.total}>
            <Row index={0}>
               <Col>{buyData?.locker.toLocaleString()}</Col>
               <Col>{buyData?.shop.toLocaleString()}</Col>
               <Col>{buyData?.store.toLocaleString()}</Col>
            </Row>
         </Table>

         <PageHead text="حسب سعر البيع" className="mt-10" />

         <Table headers={TABLE_HEAD} footerTitle="اجمالي الارصدة" total={saleData?.total}>
            <Row index={0}>
               <Col>{saleData?.locker.toLocaleString()}</Col>
               <Col>{saleData?.shop.toLocaleString()}</Col>
               <Col>{saleData?.store.toLocaleString()}</Col>
            </Row>
         </Table>
      </Card>
   );
};
