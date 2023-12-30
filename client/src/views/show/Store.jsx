import { Card } from "@material-tailwind/react";
import { useState } from "react";

import { ProductsHeader, ProductsTable } from "@/components/show/Products";

export const ShowStore = () => {
   const [price, setPrice] = useState("buy");

   return (
      <Card className="rounded-none bg-transparent">
         <ProductsHeader page="store" price={price} setPrice={setPrice} />
         <ProductsTable count="store" price={price} />
      </Card>
   );
};
