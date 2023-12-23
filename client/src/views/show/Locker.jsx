import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks";
import { Loading } from "@/layout/Loading";
import { PageHead } from "@/components/public";

const TABLE_HEAD_AR = ["#", "السبب", "العملية", "المبلغ", "التاريخ"];
const TABLE_HEAD_EN = ["#", "Reason", "Process", "Cost", "Date"];
export const ShowLockerProcesses = () => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [activePage, setActivePage] = useState(0);

   useEffect(() => {
      (async () => {
         await refetch("get", `/locker/get-locker-details?activePage=${activePage}`);
      })();
   }, [activePage]);

   return (
      <Fragment>
         <PageHead text={text("locker-transactions-title")} />

         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            pagination={data?.pagination}
            footerSpan={[3, 3]}
            total={data?.total}
            activePage={activePage}
            setActivePage={setActivePage}
            footerTitle={text("locker-transactions-table-footer")}
         >
            {data?.data
               .sort((a, b) => b.date.localeCompare(a.date))
               .map(({ name, price, date }, i) => (
                  <Row key={i} index={i}>
                     <Col>{i + 1}</Col>
                     <Col>{name}</Col>
                     <Col>{price < 0 ? text("withdraw") : price > 0 ? text("deposit") : text("unknown")}</Col>
                     <Col>{Math.abs(price)}</Col>
                     <Col>{new Date(date).toLocaleDateString()}</Col>
                  </Row>
               ))}
         </Table>
      </Fragment>
   );
};
