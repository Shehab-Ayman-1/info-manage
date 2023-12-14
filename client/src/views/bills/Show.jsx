import { Button, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD = ["#", "المنتج", "العدد", "السعر", "الاجمالي"];
export const ShowBill = () => {
   const { id } = useParams();
   const { data, loading, error, isSubmitted } = useAxios("get", `/bills/get-bill/${id}`);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      if (!data) return;
      const result = data.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
      setTotal(() => result);
   }, [data]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div
            className={`flex-between my-10 flex-wrap !gap-10 ${
               loading || (isSubmitted && error) ? "!hidden" : ""
            }`}
         >
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               العميل: {data?.client || "----"}
            </Typography>
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               العنوان: {data?.address || "----"}
            </Typography>
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               رقم الهاتف: {data?.phone || "----"}
            </Typography>
         </div>

         <Button
            variant="gradient"
            color="deep-purple"
            className={`mx-auto mb-5 w-fit text-base print:hidden md:text-2xl ${
               loading || (isSubmitted && error) ? "hidden" : ""
            } `}
            onClick={() => window.print()}
         >
            طباعه الفاتورة
         </Button>

         <Table
            headers={TABLE_HEAD}
            rowsLength={data?.products.length}
            tableStyle={loading || (isSubmitted && error) ? "hidden" : ""}
            footerTitle="سعر الفاتورة"
            footerSpan={[3, 3]}
            total={total}
         >
            {data?.products.map(({ name, count, price }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{count}</Col>
                  <Col>{price}</Col>
                  <Col>{+price * +count}</Col>
               </Row>
            ))}
         </Table>

         <div
            className={`flex-between my-10 flex-wrap !gap-10 ${
               loading || (isSubmitted && error) ? "!hidden" : ""
            }`}
         >
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               الخصم: {data?.pay.discount || 0}
            </Typography>
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               المبلغ المدفوع: {data?.pay.value || 0}
            </Typography>
            <Typography variant="h4" color="white" className="whitespace-nowrap">
               المبلغ المتبقي: {(total - +data?.pay.value - +data?.pay.discount).toLocaleString() || 0}
            </Typography>
         </div>

         <div className={loading || (isSubmitted && error) ? "hidden" : "text-center"}>
            <Typography variant="h3" color="white">
               المركز الدولي لقطع غيار السيارات
            </Typography>
            <Typography variant="lead" color="white">
               العمرية - شارع مش عارف ايه - امام مستشفي مش عارف ايه
            </Typography>
         </div>
      </Fragment>
   );
};
