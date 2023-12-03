import { Card, CardBody, CardHeader, Collapse, List, ListItem } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAxios } from "@/hooks/useAxios";
import { getSearchList } from "@/redux/slices/creates";

export const Home = () => {
   const { searchList } = useSelector(({ creates }) => creates);
   const { data, refetch } = useAxios();
   const [open, setOpen] = useState(false);
   const [searchText, setSearchText] = useState("");
   const [filterList, setFilterList] = useState(null);
   const [startSearch, setStartSearch] = useState(false);
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
         const matched = product.name.includes(searchText) || String(product.barcode).includes(searchText);
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
      navigate(`/products/${companyId}/${productId}`);
   };

   return (
      <main className="home-section">
         <Card className="relative m-auto mt-11 w-[95%] max-w-2xl bg-transparent shadow-none">
            <CardHeader className="flex-between rounded-lg border-2 border-solid px-3 shadow-sp md:py-3">
               <i className="fa fa-search block text-2xl" />
               <input
                  type="search"
                  placeholder="البحث...."
                  className="w-full bg-transparent p-1 pb-2 text-base sm:text-xl md:text-2xl"
                  onChange={handleChange}
               />
            </CardHeader>

            <CardBody
               className={`mx-auto max-h-[50vh] w-[90%] overflow-y-auto rounded-lg p-0 shadow-sp sm:w-[95%] ${
                  open ? "bg-white" : ""
               }`}
            >
               <Collapse open={open}>
                  <List>
                     {(filterList || searchList).length ? (
                        (filterList || searchList)?.map(({ name, companyId, productId }, i) => (
                           <ListItem onClick={() => handleItem(companyId, productId)} key={i}>
                              {name}
                           </ListItem>
                        ))
                     ) : (
                        <ListItem>لا يوجد نتائج بحث</ListItem>
                     )}
                  </List>
               </Collapse>
            </CardBody>
         </Card>
      </main>
   );
};
