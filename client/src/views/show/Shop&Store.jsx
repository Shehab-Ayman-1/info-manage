import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { PageHead, Selectbox, Switch } from "@/components/ui";
import { Table, Row, Col } from "@/components/table";

const TABLE_HEAD_AR = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["Company", "Product", "Count", "Price", "Total"];
export const Show_Shop_Store = () => {
   const [text, i18next] = useTranslation();
   const location = useLocation();
   const pathname = location.pathname.split("/")[2];

   const [activePage, setActivePage] = useState(0);
   const [isBuyPrice, setIsBuyPrice] = useState(pathname === "store");

   const { data, isSubmitted, loading, error, refetch } = useAxios();

   useEffect(() => {
      (async () => {
         await refetch(
            "get",
            `/products/get-table-list?price=${
               isBuyPrice ? "buy" : "sale"
            }&count=${pathname}&activePage=${activePage}`,
         );
      })();
   }, [pathname, isBuyPrice, activePage]);

   const minmax = (count, min, max) => {
      if (count <= 0) return "text-blue-gray-500/50 dark:text-blue-gray-700";
      else if (count > 0 && count <= min) return "text-red-500 dark:text-red-500";
      else if (count > min && count <= max) return "text-orange-500 dark:text-orange-500";
      else return "text-blue-gray-500 dark:text-blue-gray-200";
   };

   return (
      <Card className="rounded-none bg-transparent">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="flex-between mb-2 flex-col px-4 sm:flex-row">
            <PageHead
               text={pathname === "store" ? text("shop-store-title-store") : text("shop-store-title-shop")}
            />

            <div className="">
               <Selectbox
                  label={isBuyPrice ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
                  value={isBuyPrice ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
                  loading={!isSubmitted && loading}
                  options={[text("shop-store-switch-buy"), text("shop-store-switch-sale")]}
                  onChange={(value) => setIsBuyPrice(() => value === text("shop-store-switch-buy"))}
               />
            </div>
         </div>

         <Table
            headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR}
            footerSpan={[2, 3]}
            total={data?.total}
            activePage={activePage}
            setActivePage={setActivePage}
            pagination={data?.pagination}
         >
            {data?.data?.map(({ company, products }, i) => {
               return products?.map(({ name, count, total, price, min, max }, j) => (
                  <Row key={j} index={i} className="">
                     {!j ? (
                        <Col
                           rowSpan={Math.floor(products.length)}
                           className="text-dimWhite dark:text-blue-gray-200"
                        >
                           {company}
                        </Col>
                     ) : null}
                     <Col className={minmax(count, min, max)}>{name}</Col>
                     <Col className={minmax(count, min, max)}>{count}</Col>
                     <Col className={minmax(count, min, max)}>{price}</Col>
                     <Col className={minmax(count, min, max)}>{total.toLocaleString()}</Col>
                  </Row>
               ));
            })}
         </Table>
      </Card>
   );
};
