import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD = ["#", "السبب", "العملية", "المبلغ", "التاريخ"];
export const ShowLockerProcesses = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [total, setTotal] = useState(0);

   useEffect(() => {
      (async () => {
         await refetch("get", "/locker/get-locker-details");
      })();
   }, []);

   useEffect(() => {
      if (!data) return;
      const result = data.reduce((prev, cur) => prev + cur.price, 0);
      setTotal(() => result);
   }, [data]);

   return (
      <Fragment>
         <Typography variant="h3" color="deep-purple" className="">
            عرض معاملات الخزنة
         </Typography>

         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <Table
            headers={TABLE_HEAD}
            rowsLength={data?.length}
            footerSpan={[3, 3]}
            total={total}
            footerTitle="كاش الخزنة"
         >
            {data?.map(({ name, price, date }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{price < 0 ? "سحب" : price > 0 ? "ايداع" : "----"}</Col>
                  <Col>{Math.abs(price)}</Col>
                  <Col>{new Date(date).toLocaleDateString()}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
