import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";
import { Switch } from "@/components/public";

const TABLE_HEAD = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];

export const ShowProducts = () => {
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
         const companyMatch = company.includes(searchText);
         const productsMatch = products.filter(
            ({ name, barcode }) => name.includes(searchText) || String(barcode).includes(searchText),
         );

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
      if (count <= 0) return "text-blue-gray-500/50";
      else if (count > 0 && count <= min) return "text-red-500";
      else if (count > min && count <= max) return "text-orange-500";
      else return "text-blue-gray-500";
   };

   return (
      <Card className="rounded-none bg-transparent">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="my-5 md:my-10">
            <div className="flex-between border-sp mx-auto overflow-hidden rounded-xl px-4 py-2 shadow-sp dark:shadow-none">
               <i className="fa fa-search block text-2xl" />
               <input
                  type="search"
                  placeholder="البحث...."
                  onChange={(e) => setSearchText(() => e.target.value)}
                  className="w-full bg-transparent text-xl md:p-1 md:pb-2 md:text-2xl"
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

         <Card className="card-table-outfit h-full w-full ">
            <table className="w-full table-auto">
               <thead>
                  <tr className="border-b-sp">
                     {TABLE_HEAD.map((head) => (
                        <th key={head} className="bg-dimPurple p-2 dark:bg-primary md:p-4">
                           <Typography
                              variant="h5"
                              color="deep-purple"
                              className="text-center text-base dark:text-white lg:text-xl"
                           >
                              {head}
                           </Typography>
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {(searchResult || data)?.map(({ company, products }, index) => {
                     const classes = "p-2 md:p-4";
                     const typography = "text-center text-base lg:text-xl";

                     return products?.map(({ name, count, price, total, min, max }, i) => (
                        <tr
                           key={i}
                           className={`${minmax(count, min, max)} ${
                              index % 2 ? "bg-deep-purple-900/20" : ""
                           } ${classes}`}
                        >
                           {!i ? (
                              <td className={classes} rowSpan={Math.floor(products.length)}>
                                 <Typography variant="h5" className={`${typography} text-blue-gray-500`}>
                                    {company}
                                 </Typography>
                              </td>
                           ) : null}
                           <td className={classes}>
                              <Typography variant="h5" className={typography}>
                                 {name}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography variant="h5" className={typography}>
                                 {count}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography variant="h5" className={typography}>
                                 {price}
                              </Typography>
                           </td>
                           <td className={classes}>
                              <Typography variant="h5" className={typography}>
                                 {data?.length ? total?.toLocaleString() : 0}
                              </Typography>
                           </td>
                        </tr>
                     ));
                  })}
               </tbody>

               <tfoot>
                  <tr
                     className={`border-t-sp ${
                        (searchResult || data)?.length % 2 ? "bg-dimPurple dark:bg-primary" : ""
                     }`}
                  >
                     <th colSpan={3} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="text-center text-base dark:text-white lg:text-xl"
                        >
                           اجمالي البضائع
                        </Typography>
                     </th>
                     <th colSpan={3} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="text-center text-base dark:text-white lg:text-xl"
                        >
                           {data?.length ? total?.all.toLocaleString() : 0} جنيه
                        </Typography>
                     </th>
                  </tr>
               </tfoot>
            </table>
         </Card>
      </Card>
   );
};
