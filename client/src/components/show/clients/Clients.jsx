import { Chip, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const GOLD = { price: 30000, discount: 2000 };
const SILVER = { price: 20000, discount: 1000 };
const BRONZE = { price: 10000, discount: 500 };
const TABLE_HEAD_AR = ["#", "العميل", "رقم الهاتف", "الخصومات", "تكلفه الفواتير", "المبلغ المتبقي", "الشريحة"];
const TABLE_HEAD_EN = ["#", "Client", "Phone", "Discounts", "Bills Cost", "Pending Cost", "Level"];
export const Clients = () => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", "/bills/get-clients-list?type=bill");
   const [total, setTotal] = useState(0);

   useEffect(() => {
      if (!data) return;
      const total = data.reduce((prev, cur) => prev + +cur.pendingCost, 0);
      setTotal(() => total || "00,00");
   }, [data]);

   const levels = (cost) => {
      if (cost < BRONZE.price) return { color: "text-blue-gray-500", level: text("clients-level-fresher") };
      if (cost > BRONZE.price && cost < SILVER.price)
         return { color: "text-brown-500", level: text("clients-level-bronze") };
      if (cost > SILVER.price && cost < GOLD.price)
         return { color: "text-black dark:text-white/80", level: text("clients-level-silver") };
      if (cost > GOLD.price)
         return { color: "text-orange-800 dark:text-orange-500", level: text("clients-level-gold") };
      return { color: "", level: "" };
   };

   const levelColor = (billsCost) => {
      if (levels(billsCost).level === text("clients-level-gold")) return "amber";
      if (levels(billsCost).level === text("clients-level-silver")) return "blue-gray";
      if (levels(billsCost).level === text("clients-level-bronze")) return "brown";
      return "gray";
   };

   if (!data) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />;

   return (
      <Fragment>
         <Typography variant="h2" color="gray" className={data?.length ? "hidden" : "my-6"}>
            {text("clients-table-nobills")}
         </Typography>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[4, 4]}
            footerTitle={text("clients-table-footer")}
            total={total}
         >
            {data?.map(({ client, phone, discount, billsCost, pendingCost }, i) => (
               <Row key={i} index={i} className={levels(billsCost).color}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col className="!text-red-500">
                     {levels(billsCost).level === text("clients-level-gold") && discount < GOLD.discount ? (
                        -(GOLD.discount - +discount)
                     ) : levels(billsCost).level === text("clients-level-silver") && discount < SILVER.discount ? (
                        -(SILVER.discount - +discount)
                     ) : levels(billsCost).level === text("clients-level-bronze") && discount < BRONZE.discount ? (
                        -(BRONZE.discount - +discount)
                     ) : (
                        <span className="text-dimWhite dark:text-blue-gray-200">{discount}</span>
                     )}
                  </Col>
                  <Col>{billsCost}</Col>
                  <Col>{pendingCost}</Col>
                  <Col>
                     <Chip
                        value={levels(billsCost).level}
                        variant="gradient"
                        color={levelColor(billsCost)}
                        size="sm"
                        className="mx-auto w-fit rounded-full rtl:pb-2"
                     />
                  </Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
