import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["Company", "Product", "Count", "Price", "Total"];
export const ProductsTable = ({ category, price, count }) => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const [activePage, setActivePage] = useState(0);

   useEffect(() => {
      (async () => {
         const myCategory = category === text("shop-store-switch-category-value") ? "" : category;
         const query = `category=${myCategory}&price=${price}&count=${count}&activePage=${activePage}`;
         await refetch("get", `/products/get-table-list?${query}`);
      })();
   }, [price, category, activePage]);

   const minmax = (count, min, max) => {
      if (count <= 0) return "!text-blue-gray-500/50 dark:!text-blue-gray-700";
      else if (count > 0 && count <= min) return "!text-red-500 dark:!text-red-500";
      else if (count > min && count <= max) return "!text-orange-500 dark:!text-orange-500";
      else return "!text-blue-gray-500 dark:!text-blue-gray-200";
   };

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[2, 3]}
            total={data?.total}
            activePage={activePage}
            setActivePage={setActivePage}
            pagination={data?.pagination}
         >
            {data?.data?.map(({ company, products }, i) => {
               return products?.map(({ name, count, price, total, min, max }, j) => (
                  <Row key={j} index={i}>
                     {!j && (
                        <Col className={minmax(3, 1, 2)} rowSpan={Math.floor(products.length)}>
                           {company}
                        </Col>
                     )}
                     <Col className={minmax(count, min, max)}>{name}</Col>
                     <Col className={minmax(count, min, max)}>{count}</Col>
                     <Col className={minmax(count, min, max)}>{price}</Col>
                     <Col className={minmax(count, min, max)}>{total.toLocaleString()}</Col>
                  </Row>
               ));
            })}
         </Table>
      </Fragment>
   );
};
