import { Table } from "@/components/public";
import { Card, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TABLE_HEAD = ["#", "المنتج", "العدد", "السعر", "الاجمالي"];

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
   const [searchText, setSearchText] = useState("");
   const [searchResult, setSearchResult] = useState(null);
   const location = useLocation();
   const pathname = location.pathname.split("/")[2];

   useEffect(() => {
      const result = TABLE_ROWS.map((item) => (item.name.includes(searchText) ? item : "")).filter((item) => item);
      setSearchResult(() => result);
   }, [searchText]);

   return (
      <Card>
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

         <Typography variant="h1" color="deep-purple" className="m-auto mb-2">
            عرض بضائع {pathname === "store" ? "المخزن" : "المحل"}
         </Typography>

         <div className="m-auto w-[95%] px-2">
            <Table headers={TABLE_HEAD} rows={searchResult || TABLE_ROWS} allowTotal />
         </div>
      </Card>
   );
};
