import { Card, Switch, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { Table } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

const TABLE_HEAD = ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي"];

const TABLE_ROWS = [
   {
      name: "Dale Newman",
      count: 94,
      price: 505,
   },
   {
      name: "Tom Cole",
      count: 27,
      price: 186,
   },
   {
      name: "Carrie Stokes",
      count: 30,
      price: 853,
   },
   {
      name: "Walter Spencer",
      count: 75,
      price: 155,
   },
   {
      name: "Ella Garrett",
      count: 64,
      price: 753,
   },
   {
      name: "Rodney Craig",
      count: 27,
      price: 498,
   },
   {
      name: "Richard Yates",
      count: 56,
      price: 159,
   },
   {
      name: "James Rogers",
      count: 33,
      price: 664,
   },
   {
      name: "Olivia Nash",
      count: 62,
      price: 446,
   },
   {
      name: "Micheal Graham",
      count: 57,
      price: 778,
   },
   {
      name: "Amanda Garrett",
      count: 88,
      price: 915,
   },
   {
      name: "Marcus Henderson",
      count: 54,
      price: 130,
   },
   {
      name: "Helena Ramirez",
      count: 90,
      price: 776,
   },
   {
      name: "Rebecca Kelley",
      count: 70,
      price: 665,
   },
   {
      name: "Jeffery Steele",
      count: 20,
      price: 545,
   },
   {
      name: "Jane Woods",
      count: 66,
      price: 647,
   },
   {
      name: "Mitchell Gross",
      count: 69,
      price: 909,
   },
   {
      name: "Lucile Lopez",
      count: 77,
      price: 558,
   },
   {
      name: "Michael Ross",
      count: 16,
      price: 653,
   },
   {
      name: "Ryan Wagner",
      count: 75,
      price: 756,
   },
];

export const Shop_Store = () => {
   const location = useLocation();
   const pathname = location.pathname.split("/")[2];
   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState(null);
   const [isBuyPrice, setIsBuyPrice] = useState(pathname === "shop");
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const [total, setTotal] = useState(0);

   useEffect(() => {
      (async () => {
         await refetch("get", `/products/get-table-lists?price=${isBuyPrice ? "buy" : "sale"}&count=${pathname}`);
      })();
   }, [pathname, isBuyPrice]);

   useEffect(() => {
      if (!data?.length) return;

      const result = data?.map(({ company, products }) => {
         const companyMatch = company.includes(searchText);
         const productsMatch = products.filter(({ name }) => name.includes(searchText));

         return (companyMatch && { company, products }) || { company, products: productsMatch };
      });

      setSearchResult(() => result);
   }, [searchText]);

   useEffect(() => {
      if (!data?.length) return;
      const total = data.map((company) =>
         company.products.map((product) => product.total).reduce((p, c) => p + c, 0),
      );
      setTotal(() => total.reduce((prev, cur) => prev + cur, 0));
   }, [data]);

   return (
      <Card>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <div className="my-10">
            <div className="flex-between mx-auto w-[95%] overflow-hidden rounded-xl border border-solid border-deep-purple-100 bg-white px-4 py-2 shadow-sp">
               <i className="fa fa-search block text-2xl" />
               <input
                  type="search"
                  placeholder="البحث...."
                  onChange={(e) => setSearchText(() => e.target.value)}
                  className="w-full bg-transparent p-1 pb-2 text-2xl"
               />
            </div>
         </div>

         <div className="flex-between mb-2 px-4">
            <Typography variant="h4" color="deep-purple" className="text-4xl md:text-6xl">
               عرض بضائع {pathname === "store" ? "المخزن" : "المحل"}
            </Typography>
            <Switch
               color="indigo"
               label={isBuyPrice ? "سعر الشراء" : "سعر البيع"}
               checked={isBuyPrice}
               onChange={(event) => setIsBuyPrice(() => event.target.checked)}
               disabled={loading}
               containerProps={{
                  className: "whitespace-nowrap ml-5",
               }}
               circleProps={{
                  className: "ring-1 ring-primary",
               }}
            />
         </div>

         <Card className="h-full w-full shadow-none">
            <table className="mb-4 w-full max-w-full table-auto rounded-3xl shadow-sp">
               <thead>
                  <tr className="border-0 border-b border-solid border-deep-purple-500">
                     {TABLE_HEAD.map((head) => (
                        <th key={head} className="bg-deep-purple-50 p-4">
                           <Typography
                              variant="h5"
                              color="deep-purple"
                              className="text-center font-bold leading-none"
                           >
                              {head}
                           </Typography>
                        </th>
                     ))}
                  </tr>
               </thead>

               <tbody>
                  {(searchResult || data)?.map(({ company, products }, index) => {
                     const isLast = index === (searchResult || data)?.length - 1;
                     const classes = isLast ? "p-2 md:p-4" : "border-b border-deep-purple-500 p-2 md:p-4";
                     const typography = "text-xs md:text-md lg:text-xl text-center font-semibold";
                     return products?.map(({ name, count, price, total, min, max }, i) => (
                        <tr
                           key={i}
                           className={`${classes} ${index % 2 ? "bg-deep-purple-50/50" : ""} ${
                              count <= 0
                                 ? "text-blue-gray-500/50"
                                 : count > 0 && count <= min
                                   ? "text-red-500"
                                   : count > min && count <= max
                                     ? "text-orange-500"
                                     : "text-black"
                           }`}
                        >
                           {!i ? (
                              <td className={classes} rowSpan={Math.floor(products.length)}>
                                 <Typography variant="h5" className={typography}>
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
                     className={`border-0 border-t border-solid border-deep-purple-500 ${
                        (searchResult || data)?.length % 2 ? "bg-deep-purple-50/50" : ""
                     }`}
                  >
                     <th colSpan={2} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="md:text-md text-center text-xs font-semibold lg:text-xl"
                        >
                           اجمالي البضائع
                        </Typography>
                     </th>
                     <th colSpan={3} className="p-2 md:p-4">
                        <Typography
                           variant="h5"
                           color="deep-purple"
                           className="md:text-md text-center text-xs font-semibold lg:text-xl"
                        >
                           {data?.length ? total?.toLocaleString() : 0} جنيه
                        </Typography>
                     </th>
                  </tr>
               </tfoot>
            </table>
         </Card>
      </Card>
   );
};
