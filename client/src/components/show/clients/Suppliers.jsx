import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["#", "العميل", "رقم الهاتف", "الخصومات", "تكلفه الفواتير", "المبلغ المتبقي"];
const TABLE_HEAD_EN = ["#", "Client", "Phone", "Discounts", "Bills Cost", "Pending Cost"];
export const Suppliers = () => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", "/bills/get-clients-list?type=debt");
   const [total, setTotal] = useState(0);

   useEffect(() => {
      if (!data) return;
      const total = data.reduce((prev, cur) => prev + +cur.pendingCost, 0);
      setTotal(() => total || "00,00");
   }, [data]);

   if (!data) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />;
   return (
      <Fragment>
         <Typography variant="h2" color="gray" className={data?.length ? "hidden" : "my-6"}>
            {text("clients-table-nodebts")}
         </Typography>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[4, 4]}
            footerTitle={text("clients-table-footer")}
            total={total}
         >
            {data?.map(({ client, phone, discount, billsCost, pendingCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>{discount || 0}</Col>
                  <Col>{billsCost}</Col>
                  <Col>{pendingCost}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
