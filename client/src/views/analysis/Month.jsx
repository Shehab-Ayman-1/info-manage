import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { Field, PageHead } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["#", "الاسم", "عدد المبيعات"];
const TABLE_HEAD_EN = ["#", "Name", "Sales Count"];
export const AnalysisForMonth = () => {
   const [text, i18next] = useTranslation();

   const [calender, setCalender] = useState("");
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (!calender) return;
      (async () => {
         await refetch("get", `/products/get-products-by-date?date=${calender}`);
      })();
   }, [calender]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <PageHead text={text("bestSelling-month-title")} />

            <Field
               type="month"
               label={text("bestSelling-last-month")}
               containerStyle="max-w-fit"
               onChange={(event) => setCalender(event.target.value)}
            />
         </div>

         <br />

         <Table headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR} total={data?.total}>
            {data?.map(({ name, salesCount }, i) => (
               <Row index={i} key={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{salesCount}</Col>
               </Row>
            ))}
         </Table>

         <Typography variant="h3" color="gray" className={data?.length ? "hidden" : ""}>
            {text("bestSelling-no-result")}
         </Typography>
      </Fragment>
   );
};
