import { Fragment, useEffect, useState } from "react";

import { Col, Row, Table } from "@/components/table";
import { PageHead } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Button } from "@material-tailwind/react";

const TABLE_HEAD = ["#", "المنتج", "العدد", "السعر", "الاجمالي"];
export const TodayBuysSales = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [total, setTotal] = useState({ buys: 0, sales: 0 });

   useEffect(() => {
      if (data) return;
      (async () => {
         await refetch("get", "/bills/get-today-reset");
      })();
   }, [data]);

   useEffect(() => {
      if (!data) return;
      const buys = data.buys.reduce((prev, cur) => prev + cur.price * cur.count, 0) || 0;
      const sales = data.sales.reduce((prev, cur) => prev + cur.price * cur.count, 0) || 0;
      setTotal(() => ({ buys, sales }));
   }, [data]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text="لا يوجد مشتريات اليوم" className={!data?.buys.length ? "" : "hidden"} />
         <div className={!total.buys ? "hidden" : ""}>
            <PageHead text="مشتريات اليوم" />
            <Table headers={TABLE_HEAD} footerSpan={[3, 2]} total={total.buys}>
               {data?.buys.map(({ name, price, count }, i) => (
                  <Row key={i} index={i}>
                     <Col>{i + 1}</Col>
                     <Col>{name}</Col>
                     <Col>{count}</Col>
                     <Col>{price}</Col>
                     <Col>{+price * +count}</Col>
                  </Row>
               ))}
            </Table>
         </div>

         <PageHead text="لا يوجد مبيعات اليوم" className={!data?.sales.length ? "" : "hidden"} />
         <div className={!total.sales ? "hidden" : ""}>
            <PageHead text="مبيعات اليوم" className="mt-10" />
            <Table headers={TABLE_HEAD} footerSpan={[3, 2]} total={total.sales}>
               {data?.sales.map(({ name, price, count }, i) => (
                  <Row key={i} index={i}>
                     <Col>{i + 1}</Col>
                     <Col>{name}</Col>
                     <Col>{count}</Col>
                     <Col>{price}</Col>
                     <Col>{+price * +count}</Col>
                  </Row>
               ))}
            </Table>
         </div>

         <Button
            variant="gradient"
            color="deep-purple"
            onClick={() => window.print()}
            className={`mt-10 text-xl hover:brightness-125 ${
               !total.buys && !total.sales ? "hidden" : "print:hidden"
            }`}
         >
            طباعه
         </Button>
      </Fragment>
   );
};
