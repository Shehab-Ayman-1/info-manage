import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useAxios } from "@/hooks/useAxios";
import { PageHead } from "@/components/ui";
import { Typography } from "@material-tailwind/react";

const TABLE_HEAD_AR = ["#", "المنتج", "اخر بيع"];
const TABLE_HEAD_EN = ["#", "Product", "Last Sale"];
export const AnalysisLessBuys = () => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (data) return;

      (async () => {
         await refetch("get", "/products/get-least-sales");
      })();
   }, []);

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <PageHead text={text("leastSelling-title")} />

         <Table headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}>
            {data?.map(({ name, date }, i) => (
               <Row key={i} index={i}>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{new Date(date).toLocaleDateString()}</Col>
               </Row>
            ))}
         </Table>

         <Typography variant="h3" color="gray" className={data?.length ? "hidden" : ""}>
            {text("leastSelling-no-result")}
         </Typography>
      </Fragment>
   );
};
