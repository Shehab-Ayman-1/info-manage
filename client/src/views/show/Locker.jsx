import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks";
import { Loading } from "@/layout/Loading";
import { PageHead } from "@/components/ui";

const TABLE_HEAD_AR = ["#", "السبب", "العملية", "المبلغ", "الدفع", "التاريخ"];
const TABLE_HEAD_EN = ["#", "Reason", "Process", "Cost", "Payment", "Date"];
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
            activePage={activePage}
            setActivePage={setActivePage}
         >
            {data?.data.map(({ name, price, method, date }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{price < 0 ? text("withdraw") : price > 0 ? text("deposit") : text("unknown")}</Col>
                  <Col>{Math.abs(price)}</Col>
                  <Col>{method}</Col>
                  <Col>{new Date(date).toLocaleDateString()}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
