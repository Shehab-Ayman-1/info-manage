import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field, Selectbox } from "@/components/ui";
import { FieldWithRedirectLink } from ".";

export const InsertProduct = ({ redirectTo, product, setProduct, setFormData }) => {
   const [text] = useTranslation();
   const { products } = useSelector(({ products }) => products);

   const handleAddField = () => {
      const { buyPrice, ...data } = product;
      if (!Object.values(data).every((p) => p)) return alert("يجب ادخال جميل البيانات المطلوبه");
      setFormData((form) => {
         const data = { ...form }; // We Make Copy Of Data Because It Make Problem With The TableProducts While Fetching
         const prodIndex = data.products.findIndex((item) => item.name === product.name);
         if (prodIndex === -1) {
            data.products.push(product);
         } else {
            data.products[prodIndex].count = +data.products[prodIndex].count + +product.count;
            data.products[prodIndex].price = +product.price;
         }

         return data;
      });

      if (text.headerText === text("statement-buy-title")) setProduct(() => ({ name: null, count: 0, price: 0 }));
      else setProduct(() => ({ ...product, name: null, count: 0, price: 0, buyPrice: 0 }));
   };

   return (
      <div className="mb-5 w-full rounded-xl border border-solid px-2 md:px-4">
         <FieldWithRedirectLink path="/creates/products" redirectTo={redirectTo}>
            <Selectbox
               label={text("chooseProduct")}
               value={product.name}
               options={products?.map(({ name }) => name).filter((name) => name) || []}
               onChange={(value) => setProduct((data) => ({ ...data, name: value }))}
            />
         </FieldWithRedirectLink>

         <div className="flex-between flex-wrap sm:flex-nowrap">
            <Field
               type="number"
               label={text("count")}
               value={product.count}
               onChange={(event) => setProduct((data) => ({ ...data, count: event.target.value }))}
               containerStyle="sm:!w-[50%] w-full"
            />
            <Field
               type="number"
               label={text("price")}
               value={product.price}
               onChange={(event) => setProduct((data) => ({ ...data, price: event.target.value }))}
               containerStyle="sm:!w-[50%] w-full"
            />
         </div>

         <Button
            color="deep-purple"
            className="mx-auto my-4 block text-base hover:brightness-125"
            onClick={handleAddField}
         >
            {text("insert")}
            <i className="fa fa-plus mx-2 text-base text-white hover:text-white" />
         </Button>
      </div>
   );
};
