import { Card, CardBody, CardHeader, Collapse, List, ListItem } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSearchList } from "@/redux/slices/products";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const Searchbar = ({ openSearchbar, setOpenSearchbar }) => {
   const { searchList } = useSelector(({ products }) => products);
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   const [open, setOpen] = useState(false);
   const [filterList, setFilterList] = useState(null);
   const [searchText, setSearchText] = useState("");
   const [startSearch, setStartSearch] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

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
      navigate(`/profile/${companyId}/${productId}`);
      setOpen(false);
      setOpenSearchbar(false);
      setSearchText("");
   };

   return (
      <Card
         className={`fixed left-1/2 top-36 w-full max-w-2xl -translate-x-1/2 bg-transparent shadow-none transition-[2s] ${
            openSearchbar ? "" : "hidden"
         }`}
      >
         <CardHeader
            className={`flex-between bg-gradient rounded-3xl text-dimWhite shadow-sp ${
               open ? `rounded-b-none` : ``
            }`}
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
                                 ) : null}
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
   );
};
