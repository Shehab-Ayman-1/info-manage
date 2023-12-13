import { Col, Row, Table } from "@/components/table";
import { Form } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Fragment, useEffect, useState } from "react";

const TABLE_HEAD = ["#", "المنتج", "العملية", "المكان", "العدد", "السعر", "الاجمالي"];
export const TodayBuysSales = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [total, setTotal] = useState(0);

   useEffect(() => {
      if (data) return;
      (async () => {
         await refetch("get", "/products/get-today-reset");
      })();
   }, [data]);

   useEffect(() => {
      if (!data || total) return;
      const result = data?.map(({ products }) => {
         return products.reduce((prev, cur) => {
            if (cur.shop) return prev + Math.abs(cur.shop) * cur.sale;
            if (cur.store) return prev + Math.abs(cur.shop) * cur.buy;
            return 0;
         }, 0);
      });
      setTotal(() => result.reduce((prev, cur) => prev + cur, 0));
   }, [data]);

   const handleSubmit = (event) => {
      event.preventDefault();
      window.print();
   };

   return (
      <Form
         onSubmit={handleSubmit}
         footerStyle="print:hidden"
         buttonText="طباعه"
         headerText="مبيعات ومشتريات اليوم"
      >
         <Table headers={TABLE_HEAD} rowsLength={data?.length} footerSpan={[4, 3]} total={total}>
            {data &&
               data?.map(({ name, products }, i) =>
                  products?.map(({ shop, store, buy, sale }, j) => (
                     <Row key={j} index={i}>
                        {!j ? <Col rowSpan={products?.length}>{i + 1}</Col> : null}

                        {!j ? <Col rowSpan={products?.length}>{name}</Col> : null}

                        <Col>{shop < 0 || store < 0 ? "بيع" : shop > 0 || store > 0 ? "شراء" : "----"}</Col>

                        <Col>{shop ? "المحل" : store ? "المخزن" : "----"}</Col>

                        <Col>{Math.abs(shop || store)}</Col>

                        <Col>{shop < 0 || store < 0 ? sale : shop > 0 || store > 0 ? buy : "----"}</Col>

                        <Col>{shop ? sale * Math.abs(shop) : store ? buy * Math.abs(store) : "----"}</Col>
                     </Row>
                  )),
               )}
         </Table>
      </Form>
   );
};
