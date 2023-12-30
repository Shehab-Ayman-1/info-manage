import { Fragment } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { PageHead } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["الخزنة", "المحل", "المخزن"];
const TABLE_HEAD_EN = ["Locker", "Shop", "Store"];
export const BalancesInfo = ({ price, title }) => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", `/products/get-balances?price=${price}`);

   if (!data) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />;
   return (
      <Fragment>
         <PageHead text={text(title)} className="mt-10" />

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerTitle={text("balances-table-footer")}
            total={data?.total}
         >
            <Row index={0}>
               <Col>{data?.locker.toLocaleString()}</Col>
               <Col>{data?.shop.toLocaleString()}</Col>
               <Col>{data?.store.toLocaleString()}</Col>
            </Row>
         </Table>
      </Fragment>
   );
};
