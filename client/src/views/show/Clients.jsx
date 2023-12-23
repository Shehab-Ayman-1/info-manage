import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";

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
      if (bills) setTotal((total) => ({ ...total, bills: bills.reduce((prev, cur) => prev + cur.neededCost, 0) }));
      if (debts) setTotal((total) => ({ ...total, debts: debts.reduce((prev, cur) => prev + cur.neededCost, 0) }));
   }, [bills, debts]);

   return (
      <Fragment>
         <Loading isSubmitted={bIsSubmitted} loading={bLoading} error={bError} message={bills} />
         <Loading isSubmitted={dIsSubmitted} loading={dLoading} error={dError} message={debts} />

         <PageHead text={text("clients-title-clients")} />

         <Typography variant="h2" color="gray" className={bills?.length ? "hidden" : "my-6"}>
            {text("clients-table-nobills")}
         </Typography>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[4, 4]}
            footerTitle={text("clients-table-footer")}
            total={total?.bills}
         >
            {bills?.map(({ client, phone, discount, billsCost, neededCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>{discount || 0}</Col>
                  <Col>{billsCost}</Col>
                  <Col>{neededCost}</Col>
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
            {debts?.map(({ client, phone, discount, billsCost, neededCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>{discount || 0}</Col>
                  <Col>{billsCost}</Col>
                  <Col>{neededCost}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
