import { Routes, Route } from "react-router-dom";
import { PageNotFound, Wrapper } from "@/layout";
import { links } from "./constants";
import { Home } from "@/views";

export const App = () => {
   return (
      <Routes>
         <Route path="*" element={<PageNotFound />} />

         <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />} />
         </Route>

         {links.map(({ title, path, paths }) => (
            <Route path={path} element={<Wrapper />} key={title}>
               {paths?.map(({ name, link, Component }) => (
                  <Route path={`/${path}/${link}`} element={<Component />} key={name} />
               ))}
            </Route>
         ))}
      </Routes>
   );
};
/* 
<Route path="/" element={<Wrapper />}>
   <Route index element={<Home />} />
   <Route path="*" element={<PageNotFound />} />

   <Route path="/products">
      <Route path="shop" element={<ShopProducts />} />
      <Route path="store" element={<StoreProducts />} />
      <Route path="buy-products" element={<BuyProducts />} />
      <Route path="sale-products" element={<SaleProducts />} />
      <Route path="edit-prices" element={<EditPrices />} />
   </Route>

   <Route path="/suppliers">
      <Route path="add-category" element={<AddCategory />} />
      <Route path="add-company" element={<AddCompany />} />
      <Route path="add-products" element={<AddProducts />} />
   </Route>
</Route>
*/
