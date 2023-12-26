import { Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

import { Table, Row, Col } from "@/components/table";
import { PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["الخزنة", "المحل", "المخزن"];
const TABLE_HEAD_EN = ["Locker", "Shop", "Store"];
export const ShowBalances = () => {
   const [text, i18next] = useTranslation();

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
         <PageHead text={text("balances-buy-title")} />

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerTitle={text("balances-table-footer")}
            total={buyData?.total}
         >
            <Row index={0}>
               <Col>{buyData?.locker.toLocaleString()}</Col>
               <Col>{buyData?.shop.toLocaleString()}</Col>
               <Col>{buyData?.store.toLocaleString()}</Col>
            </Row>
         </Table>

         <PageHead text={text("balances-sale-title")} className="mt-10" />

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerTitle={text("balances-table-footer")}
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
