import { Fragment, useEffect, useState } from "react";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks";
import { Loading } from "@/layout/Loading";
import { PageHead } from "@/components/public";

const TABLE_HEAD = ["#", "السبب", "العملية", "المبلغ", "التاريخ"];
export const ShowLockerProcesses = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [activePage, setActivePage] = useState(0);

   useEffect(() => {
      (async () => {
         await refetch("get", `/locker/get-locker-details?activePage=${activePage}`);
      })();
   }, [activePage]);

   return (
      <Fragment>
         <PageHead text="عرض معاملات الخزنة" />

         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <Table
            headers={TABLE_HEAD}
            rowsLength={data?.rowsLength}
            footerSpan={[3, 3]}
            total={data?.total}
            activePage={activePage}
            setActivePage={setActivePage}
            footerTitle="كاش الخزنة"
         >
            {data?.data
               .sort((a, b) => b.date.localeCompare(a.date))
               .map(({ name, price, date }, i) => (
                  <Row key={i} index={i}>
                     <Col>{i + 1}</Col>
                     <Col>{name}</Col>
                     <Col>{price < 0 ? "سحب" : price > 0 ? "ايداع" : "غير معروف"}</Col>
                     <Col>{Math.abs(price)}</Col>
                     <Col>{new Date(date).toLocaleDateString()}</Col>
                  </Row>
               ))}
         </Table>
      </Fragment>
   );
};
