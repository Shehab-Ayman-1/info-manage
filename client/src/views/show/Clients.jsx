import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";

const TABLE_HEAD = ["#", "العميل", "العنوان", "رقم الهاتف", "النوع", "الخصومات", "عدد الفواتير", "المبلغ المتبقي"];
export const ShowClients = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [total, setTotal] = useState(0);

   useEffect(() => {
      if (data) return;

      (async () => {
         await refetch("get", "/bills/get-clients-list");
      })();
   }, []);

   useEffect(() => {
      if (!data) return;

      setTotal(() => data.reduce((prev, cur) => prev + cur.neededCost, 0));
   }, [data]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <Typography variant="h3" color="deep-purple">
            عرض العملاء
         </Typography>

         <Table
            headers={TABLE_HEAD}
            rowsLength={data?.length}
            footerSpan={[4, 4]}
            footerTitle="اجمالي المبالغ المتبقيه"
            total={total}
         >
            {data?.map(({ client, address, phone, type, discount, billsCount, neededCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{address}</Col>
                  <Col>{phone}</Col>
                  <Col>{type === "bill" ? "فاتورة" : type === "debt" ? "مديونية" : "----"}</Col>
                  <Col>{discount}</Col>
                  <Col>{billsCount}</Col>
                  <Col>{neededCost}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
