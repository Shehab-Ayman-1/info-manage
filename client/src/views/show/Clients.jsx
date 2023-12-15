import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/public";

const TABLE_HEAD = ["#", "العميل", "رقم الهاتف", "الخصومات", "تكلفه الفواتير", "المبلغ المتبقي"];
export const ShowClients = () => {
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

         <PageHead text="عرض العملاء" />

         <Typography variant="h2" color="gray" className={bills?.length ? "hidden" : "my-6"}>
            لا يوجد فواتير للعملاء
         </Typography>

         <Table
            headers={TABLE_HEAD}
            rowsLength={bills?.length}
            footerSpan={[4, 4]}
            footerTitle="اجمالي المبالغ المتبقيه"
            total={total?.bills}
         >
            {bills?.map(({ client, phone, discount, billsCost, neededCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>{discount || "----"}</Col>
                  <Col>{billsCost}</Col>
                  <Col>{neededCost}</Col>
               </Row>
            ))}
         </Table>

         <PageHead text="عرض المندوبين" className="mt-10" />

         <Typography variant="h2" color="gray" className={debts?.length ? "hidden" : "my-6"}>
            لا يوجد مديونيات
         </Typography>

         <Table
            headers={TABLE_HEAD}
            rowsLength={debts?.length}
            footerSpan={[4, 4]}
            footerTitle="اجمالي المبالغ المتبقيه"
            total={total?.debts}
         >
            {debts?.map(({ client, phone, discount, billsCost, neededCost }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{client}</Col>
                  <Col>{phone || "----"}</Col>
                  <Col>{discount || "----"}</Col>
                  <Col>{billsCost}</Col>
                  <Col>{neededCost}</Col>
               </Row>
            ))}
         </Table>
      </Fragment>
   );
};
