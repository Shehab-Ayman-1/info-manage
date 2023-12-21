import { Fragment, useEffect } from "react";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";

const TABLE_HEAD = ["#", "المنتج", "اخر بيع"];
export const AnalysisLessBuys = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (data) return;

      (async () => {
         await refetch("get", "/products/get-less-buys");
      })();
   }, []);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text="المنتجات الاقل مبيعاً" />

         <Table headers={TABLE_HEAD}>
            {data?.map(({ name, date }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{new Date(date).toLocaleDateString()}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
