import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

import { PageHead, Selectbox } from "@/components/ui";
import { getLists } from "@/redux/products";
import { useAxios } from "@/hooks";

export const ProductsHeader = ({ page, category, setCategory, price, setPrice }) => {
   const { loading, refetch } = useAxios();
   const [text, i18next] = useTranslation();
   const { categories } = useSelector((state) => state.products);
   const dispatch = useDispatch();

   useEffect(() => {
      if (categories.length) return;
      (async () => {
         const { data, isSubmitted, error } = await refetch("get", "/products/get-products-list");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
   }, []);

   return (
      <div className="flex-between mb-2 flex-col px-4 md:flex-row">
         <PageHead text={page === "store" ? text("shop-store-title-store") : text("shop-store-title-shop")} />

         <div className="flex-start flex-col sm:flex-row">
            <Selectbox
               label={price === "buy" ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
               value={price === "buy" ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
               options={[text("shop-store-switch-buy"), text("shop-store-switch-sale")]}
               onChange={(value) => setPrice(() => (value === text("shop-store-switch-buy") ? "buy" : "sale"))}
            />
            <Selectbox
               label={text("shop-store-switch-category")}
               value={
                  category === text("shop-store-switch-category-value")
                     ? text("shop-store-switch-category-value")
                     : category
               }
               loading={loading}
               options={[text("shop-store-switch-category-value")].concat(categories)}
               onChange={(value) => setCategory(value)}
            />
         </div>
      </div>
   );
};
