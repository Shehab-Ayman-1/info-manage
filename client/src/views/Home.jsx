import { Card, CardBody, CardHeader, Collapse, List, ListItem } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAxios } from "@/hooks/useAxios";
import { getSearchList } from "@/redux/slices/products";
import { Loading } from "@/layout/Loading";
import { PageHead } from "@/components/public";

export const Home = () => {
   const { searchList } = useSelector(({ products }) => products);
   const { data, loading, isSubmitted, refetch } = useAxios();

   const [open, setOpen] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [filterList, setFilterList] = useState(null);
   const [startSearch, setStartSearch] = useState(false);

   const { data: cashData } = useAxios("get", "/locker/get-total-cash");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (!startSearch || searchList.length) return;
      (async () => {
         const { data, error, isSubmitted } = await refetch("get", "/products/get-search-list");
         if (isSubmitted && error) return;
         dispatch(getSearchList(data));
      })();
   }, [startSearch, searchList]);

   useEffect(() => {
      if (!data?.length) return;
      const result = data.map((product) => {
         const matched = product.name.includes(searchText.trim()) || product.barcode.includes(searchText.trim());
         return matched ? product : null;
      });

      setFilterList(() => result.filter((item) => item));
   }, [searchText]);

   const handleChange = (event) => {
      setSearchText(() => event.target.value);
      setStartSearch(true);
      event.target.value ? setOpen(true) : setOpen(false);
   };

   const handleItem = (companyId, productId) => {
      setOpen(false);
      setSearchText("");
      navigate(`/profile/${companyId}/${productId}`);
   };

   return (
      <Fragment>
         <PageHead variant="h2" text={cashData?.toLocaleString() || "00,00"} className="text-white" />
         <Card className="relative m-auto mt-11 w-full max-w-2xl bg-transparent shadow-none">
            <CardHeader
               className={`flex-between bg-gradient rounded-3xl text-dimWhite ${open ? `rounded-b-none` : ``}`}
            >
               <i className="fa fa-search block pr-3 text-xl md:text-2xl" />
               <input
                  type="search"
                  placeholder="البحث...."
                  className="w-full bg-transparent p-3 text-base sm:text-xl md:p-5 md:text-2xl"
                  onChange={handleChange}
               />
            </CardHeader>

            <CardBody
               className={`mx-auto max-h-[50vh] w-[90%] overflow-y-auto rounded-lg p-0 shadow-sp sm:w-[95%] ${
                  open ? "bg-gradient dark:text-white" : ""
               }`}
            >
               <Collapse open={open}>
                  <List>
                     {(filterList || searchList).length ? (
                        (filterList || searchList)?.map(({ name, companyId, productId }, i) => (
                           <ListItem
                              key={i}
                              className="text-xl font-bold hover:bg-dimPurple hover:dark:text-white"
                              onClick={() => handleItem(companyId, productId)}
                           >
                              {name.split(searchText).map((part, i) => (
                                 <Fragment key={i}>
                                    {i ? (
                                       <span className={searchText === " " ? "pr-1" : "text-primary"}>
                                          {searchText.trim()}
                                       </span>
                                    ) : null}{" "}
                                    {part}
                                 </Fragment>
                              ))}
                           </ListItem>
                        ))
                     ) : !isSubmitted && loading ? (
                        <ListItem>
                           <Loading subLoading />
                        </ListItem>
                     ) : (
                        <ListItem>لا يوجد نتائج بحث</ListItem>
                     )}
                  </List>
               </Collapse>
            </CardBody>
         </Card>
      </Fragment>
   );
};
