import { Chip, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/ui";

const GOLD = { price: 30000, discount: 2000 };
const SILVER = { price: 20000, discount: 1000 };
const BRONZE = { price: 10000, discount: 500 };
const TABLE_HEAD_AR = ["#", "العميل", "رقم الهاتف", "الخصومات", "تكلفه الفواتير", "المبلغ المتبقي"];
const TABLE_HEAD_EN = ["#", "Client", "Phone", "Discounts", "Bills Cost", "Pending Cost"];
export const ShowClients = () => {
   const [text, i18next] = useTranslation();
   const [total, setTotal] = useState({ bills: 0, debts: 0 });
   const {
      data: bills,
      loading: bLoading,
      error: bError,
      isSubmitted: bIsSubmitted,
   } = useAxios("get", "/bills/get-clients-list?type=bill");
   const {
      data: debts,
      loading: dLoading,
      error: dError,
      isSubmitted: dIsSubmitted,
   } = useAxios("get", "/bills/get-clients-list?type=debt");

   useEffect(() => {
      if (bills)
         setTotal((total) => ({ ...total, bills: bills.reduce((prev, cur) => prev + +cur.pendingCost, 0) }));
      if (debts)
         setTotal((total) => ({ ...total, debts: debts.reduce((prev, cur) => prev + +cur.pendingCost, 0) }));
   }, [bills, debts]);

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

   return (
      <Fragment>
         <Loading isSubmitted={bIsSubmitted} loading={bLoading} error={bError} message={bills} />
         <Loading isSubmitted={dIsSubmitted} loading={dLoading} error={dError} message={debts} />

         <PageHead text={text("clients-title-clients")} />

         <Typography variant="h2" color="gray" className={bills?.length ? "hidden" : "my-6"}>
            {text("clients-table-nobills")}
         </Typography>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN.concat("Level") : TABLE_HEAD_AR.concat("المستوي")}
            footerSpan={[4, 4]}
            footerTitle={text("clients-table-footer")}
            total={total?.bills}
         >
            {bills?.map(({ client, phone, discount, billsCost, pendingCost }, i) => (
               <Row key={i} index={i} className={levels(billsCost).color}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>
                     {levels(billsCost).level === text("clients-level-gold") && discount < GOLD.discount ? (
                        <span className="text-red-500">-{GOLD.discount - +discount}</span>
                     ) : levels(billsCost).level === text("clients-level-silver") && discount < SILVER.discount ? (
                        <span className="text-red-500">-{SILVER.discount - +discount}</span>
                     ) : levels(billsCost).level === text("clients-level-bronze") && discount < BRONZE.discount ? (
                        <span className="text-red-500">-{BRONZE.discount - +discount}</span>
                     ) : (
                        discount
                     )}
                  </Col>
                  <Col>{billsCost}</Col>
                  <Col>{pendingCost}</Col>
                  <Col>
                     <Chip
                        value={levels(billsCost).level}
                        variant="gradient"
                        color={
                           levels(billsCost).level === text("clients-level-gold")
                              ? "amber"
                              : levels(billsCost).level === text("clients-level-silver")
                                ? "blue-gray"
                                : levels(billsCost).level === text("clients-level-bronze")
                                  ? "brown"
                                  : "gray"
                        }
                        size="sm"
                        className="mx-auto w-fit rounded-full rtl:pb-2"
                     />
                  </Col>
               </Row>
            ))}
         </Table>

         <PageHead text={text("clients-title-suppliers")} className="mt-10" />

         <Typography variant="h2" color="gray" className={debts?.length ? "hidden" : "my-6"}>
            {text("clients-table-nodebts")}
         </Typography>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[4, 4]}
            footerTitle={text("clients-table-footer")}
            total={total?.debts}
         >
            {debts?.map(({ client, phone, discount, billsCost, pendingCost }, i) => (
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
