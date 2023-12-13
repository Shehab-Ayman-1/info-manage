import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { Switch } from "@/components/public";
import { Table, Row, Col } from "@/components/table";

const TABLE_HEAD = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];

export const Show_Shop_Store = () => {
   const location = useLocation();
   const pathname = location.pathname.split("/")[2];
   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState(null);
   const [isBuyPrice, setIsBuyPrice] = useState(pathname === "shop");
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const [total, setTotal] = useState({ all: 0, company: 0 });

   useEffect(() => {
      (async () => {
         await refetch("get", `/products/get-table-list?price=${isBuyPrice ? "buy" : "sale"}&count=${pathname}`);
      })();
   }, [pathname, isBuyPrice]);

   useEffect(() => {
      if (!data?.length) return;

      const result = data?.map(({ company, products }) => {
         const companyMatch = company.includes(searchText.trim());

         const productsMatch = products.filter(({ name, barcode }) => {
            const nameMatch = name?.includes(searchText.trim());
            const barcodeMatch = barcode?.includes(searchText.trim());
            return nameMatch || barcodeMatch;
         });

         return (companyMatch && { company, products }) || { company, products: productsMatch };
      });

      setSearchResult(() => result);
   }, [searchText]);

   useEffect(() => {
      if (!data?.length) return;

      const all = (searchResult || data).map((company) =>
         company.products.map((product) => product.total).reduce((p, c) => p + c, 0),
      );

      setTotal((prev) => ({ ...prev, all: all.reduce((prev, cur) => prev + cur, 0) }));
   }, [data, searchResult]);

   const minmax = (count, min, max) => {
      if (count <= 0) return "text-blue-gray-500/50 dark:text-blue-gray-700";
      else if (count > 0 && count <= min) return "text-red-500 dark:text-red-500";
      else if (count > min && count <= max) return "text-orange-500 dark:text-orange-500";
      else return "text-blue-gray-500 dark:text-blue-gray-200";
   };

   return (
      <Card className="rounded-none bg-transparent">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="my-5 md:my-10">
            <div className="flex-between dark:border-sp mx-auto overflow-hidden rounded-xl px-4 py-2 shadow-sp dark:shadow-none">
               <i className="fa fa-search block text-2xl" />
               <input
                  type="search"
                  placeholder="البحث...."
                  onChange={(e) => setSearchText(() => e.target.value)}
                  className="w-full bg-transparent text-xl caret-primary md:p-1 md:pb-2 md:text-2xl"
               />
            </div>
         </div>

         <div className="flex-between mb-2 flex-col px-4 sm:flex-row">
            <Typography variant="h4" className="text-3xl text-primary sm:text-4xl md:text-6xl">
               عرض بضائع {pathname === "store" ? "المخزن" : "المحل"}
            </Typography>
            <Switch
               label={isBuyPrice ? "سعر الشراء" : "سعر البيع"}
               checked={isBuyPrice}
               disabled={loading}
               onChange={(event) => setIsBuyPrice(() => event.target.checked)}
            />
         </div>

         <Table headers={TABLE_HEAD} rowsLength={searchResult?.length || data?.length} footerSpan={[2, 3]} total={total.all}>
            {(searchResult || data)?.map(({ company, products }, i) => {
               return products?.map(({ name, count, price, total, min, max }, j) => (
                  <Row key={j} index={i} className="">
                     {!j ? (
                        <Col
                           rowSpan={Math.floor(products.length)}
                           className="text-blue-gray-500 dark:text-blue-gray-200"
                        >
                           {company}
                        </Col>
                     ) : null}
                     <Col className={minmax(count, min, max)}>{name}</Col>
                     <Col className={minmax(count, min, max)}>{count}</Col>
                     <Col className={minmax(count, min, max)}>{price}</Col>
                     <Col className={minmax(count, min, max)}>
                        {data?.length ? total?.toLocaleString() : "00,00"}
                     </Col>
                  </Row>
               ));
            })}
         </Table>
      </Card>
   );
};
