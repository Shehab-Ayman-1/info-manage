import { useTranslation } from "react-i18next";
import { PageHead, Selectbox } from "../../ui";

export const ProductsHeader = ({ page, price, setPrice }) => {
   const [text, i18next] = useTranslation();

   return (
      <div className="flex-between mb-2 flex-col px-4 sm:flex-row">
         <PageHead text={page === "store" ? text("shop-store-title-store") : text("shop-store-title-shop")} />

         <div className="">
            <Selectbox
               label={price === "buy" ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
               value={price === "buy" ? text("shop-store-switch-buy") : text("shop-store-switch-sale")}
               options={[text("shop-store-switch-buy"), text("shop-store-switch-sale")]}
               onChange={(value) => setPrice(() => (value === text("shop-store-switch-buy") ? "buy" : "sale"))}
            />
         </div>
      </div>
   );
};
