import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { PageHead, Selectbox } from "@/components/ui";
import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["#", "الاسم", "عدد المبيعات"];
const TABLE_HEAD_EN = ["#", "Name", "Sales Count"];
const years = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38].map((y) => `20${y}`);
export const AnalysisForYear = () => {
   const [text, i18next] = useTranslation();
   const [calender, setCalender] = useState("");
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (!calender) return;
      (async () => {
         await refetch("get", `/products/get-products-by-date?date=${calender}&calender=year`);
      })();
   }, [calender]);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <PageHead text={text("bestSelling-year-title")} />

            <Selectbox
               label={text("bestSelling-choose-year")}
               containerStyle="max-w-fit"
               options={years}
               value={calender}
               onChange={(value) => setCalender(`${value}-01-01`)}
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
