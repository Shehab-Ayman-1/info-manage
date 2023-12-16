import { Fragment, useEffect, useState } from "react";

import { PageHead, Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Col, Row, Table } from "@/components/table";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["#", "الاسم", "عدد المشتريات", "عدد المبيعات"];
const years = [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38].map((y) => `20${y}`);
export const AnalysisForYear = () => {
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
            <PageHead text="المنتجات الاكثر مبيعاً في السنه" />

            <Selectbox
               label="اختر اسم المندوب"
               containerStyle="!w-fit"
               options={years}
               value={calender}
               onChange={(value) => setCalender(`${value}-01-01`)}
            />
         </div>

         <br />

         <Table headers={TABLE_HEAD} rowsLength={data?.length} total={data?.total}>
            {data?.map(({ name, buysCount, salesCount }, i) => (
               <Row index={i} key={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{buysCount}</Col>
                  <Col>{salesCount}</Col>
               </Row>
            ))}
         </Table>

         <Typography variant="h3" color="gray" className={data?.length ? "hidden" : ""}>
            لا يوجد نتائج بحث
         </Typography>
      </Fragment>
   );
};
