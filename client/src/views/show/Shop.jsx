import { Card } from "@material-tailwind/react";
import { useState } from "react";

import { ProductsHeader, ProductsTable } from "@/components/show/Products";

export const ShowShop = () => {
   const [price, setPrice] = useState("sale");

   return (
      <Card className="rounded-none bg-transparent">
         <ProductsHeader page="shop" price={price} setPrice={setPrice} />
         <ProductsTable count="shop" price={price} />
      </Card>
   );
};
