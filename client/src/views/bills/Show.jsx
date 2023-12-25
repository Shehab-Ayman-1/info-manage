import { Button, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["#", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["#", "Product", "Count", "Price", "Total"];
export const ShowBill = () => {
   const { id } = useParams();
   const [text, i18next] = useTranslation();

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
            <Typography variant="h3" className="whitespace-nowrap text-xl text-dimWhite md:text-2xl">
               {text("showBill-client")}: {data?.client || "----"}
            </Typography>
            <Typography variant="h3" className="whitespace-nowrap text-xl text-dimWhite md:text-2xl">
               {text("showBill-phone")}: {data?.phone || "----"}
            </Typography>
         </div>

         <Button
            variant="gradient"
            color="deep-purple"
            className={`mx-auto mb-5 w-fit pb-5 text-base hover:brightness-125 ltr:pb-3 print:hidden md:text-xl ${
               loading || (isSubmitted && error) ? "hidden" : ""
            } `}
            onClick={() => window.print()}
         >
            {text("print")}
         </Button>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            tableStyle={loading || (isSubmitted && error) ? "hidden" : ""}
            footerTitle={text("showBill-table-footer")}
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
            <Typography variant="h3" className="whitespace-nowrap text-xl text-dimWhite md:text-2xl">
               {text("showBill-discount")}: {data?.pay.discount?.toLocaleString() || 0}
            </Typography>
            <Typography variant="h3" className="whitespace-nowrap text-xl text-dimWhite md:text-2xl">
               {text("showBill-paid-cost")}: {data?.pay.value?.toLocaleString() || 0}
            </Typography>
            <Typography variant="h3" className="whitespace-nowrap text-xl text-dimWhite md:text-2xl">
               {text("showBill-pending-cost")}:{" "}
               {(total - +data?.pay.value - +data?.pay.discount)?.toLocaleString() || 0}
            </Typography>
         </div>

         <div className={loading || (isSubmitted && error) ? "hidden" : "text-center"}>
            <Typography variant="h3" className="text-xl text-dimWhite md:text-2xl">
               {text("showBill-address")}
            </Typography>
            <Typography variant="small" className="text-dimWhite">
               {text("showBill-subAddress")}
            </Typography>
         </div>
      </Fragment>
   );
};
