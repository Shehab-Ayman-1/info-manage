import { Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { ProductsHeader, ProductsTable } from "@/components/show/Products";

export const ShowShop = () => {
   const [text, i18next] = useTranslation();
   const [category, setCategory] = useState(text("shop-store-switch-category-value"));
   const [price, setPrice] = useState("sale");

   return (
      <Card className="rounded-none bg-transparent">
         <ProductsHeader
            page="shop"
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
         />
         <ProductsTable category={category} count="shop" price={price} />
      </Card>
   );
};
