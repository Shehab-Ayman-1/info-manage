import { Card, CardBody, CardHeader, Collapse, List, ListItem } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { getSearchList } from "@/redux/products";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const Searchbar = () => {
   const [text] = useTranslation();
   const { searchList } = useSelector(({ products }) => products);
   const { data, loading, isSubmitted, refetch } = useAxios();

   const [openSearchbar, setOpenSearchbar] = useState(false);
   const [open, setOpen] = useState(false);

   const [searchText, setSearchText] = useState("");
   const [filterList, setFilterList] = useState(null);
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
         const matched =
            product.name.includes(searchText.trim()) ||
            product.company.includes(searchText.trim()) ||
            product.barcode.includes(searchText.trim());
         return matched ? product : null;
      });

      setFilterList(() => result.filter((item) => item));
   }, [searchText]);

   const handleChange = (event) => {
      setSearchText(() => event.target.value);
      setStartSearch(true);
      setOpen(!!event.target.value);
   };

   const handleClose = () => {
      setOpenSearchbar(false);
      setSearchText("");
      setOpen(false);
   };

   const handleItem = (companyId, productId) => {
      navigate(`/profile/${companyId}/${productId}`);
      handleClose();
   };

   return (
      <Fragment>
         <i className="fa fa-search" onClick={() => setOpenSearchbar(true)} />

         <div
            className={`fixed left-0 top-0 -z-10 h-screen w-full ${openSearchbar ? "" : "hidden"}`}
            onClick={handleClose}
         />

         <Card
            className={`fixed left-1/2 top-36 w-full max-w-2xl -translate-x-1/2 bg-transparent shadow-none ${
               openSearchbar ? "" : "hidden"
            }`}
         >
            <CardHeader
               className={`flex-between bg-gradient rounded-3xl text-dimWhite shadow-sp ${
                  open ? "rounded-b-none" : ""
               }`}
            >
               <i className="fa fa-search block px-3 text-xl md:text-2xl" />
               <input
                  type="search"
                  placeholder={text("search")}
                  className="w-full bg-transparent py-3 text-base placeholder:text-dimWhite dark:placeholder:text-white sm:text-xl md:py-5 md:text-2xl"
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
                        (filterList || searchList)?.map(({ name, company, companyId, productId }, i) => (
                           <ListItem
                              key={i}
                              className="!justify-between !gap-0 text-xl font-bold hover:bg-dimPurple hover:dark:text-white"
                              onClick={() => handleItem(companyId, productId)}
                           >
                              {name?.split(searchText).map((part, i) => (
                                 <p key={i} className="w-fit whitespace-nowrap">
                                    {i ? (
                                       <span className={searchText === " " ? "pr-1" : "text-primary"}>
                                          {searchText.trim()}
                                       </span>
                                    ) : null}
                                    {part}
                                 </p>
                              ))}
                              <p className="flex-end w-full !text-dimWhite">{company || " "}</p>
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
