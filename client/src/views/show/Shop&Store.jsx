import { Card } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { PageHead, Switch } from "@/components/public";
import { Table, Row, Col } from "@/components/table";

const TABLE_HEAD = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];
export const Show_Shop_Store = () => {
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
            <PageHead text={`عرض بضائع ${pathname === "store" ? "المخزن" : "المحل"}`} />

            <Switch
               label={isBuyPrice ? "سعر الشراء" : "سعر البيع"}
               checked={isBuyPrice}
               disabled={loading}
               onChange={(event) => setIsBuyPrice(() => event.target.checked)}
            />
         </div>

         <Table
            headers={TABLE_HEAD}
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
