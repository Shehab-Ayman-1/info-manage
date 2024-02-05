import { Card } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import { ProductsHeader, ProductsTable } from "@/components/show/Products";

export const ShowStore = () => {
   const [text, i18next] = useTranslation();
   const [category, setCategory] = useState(text("shop-store-switch-category-value"));
   const [price, setPrice] = useState("buy");

   return (
      <Card className="rounded-none bg-transparent">
         <ProductsHeader
            page="store"
            category={category}
            setCategory={setCategory}
            price={price}
            setPrice={setPrice}
         />
         <ProductsTable category={category} count="store" price={price} />
      </Card>
   );
};
