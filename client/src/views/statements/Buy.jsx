import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { FieldWithRedirectLink, Info, InsertProduct, TableProducts } from "@/components/statements";
import { filterSelection, getSuppliers } from "@/redux/products";
import { Form, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
export const BuyStatement = () => {
   const [text, i18next] = useTranslation();
   const formState = {
      paymentWay: text("statement-payment-way-project"),
      paymentMethod: text("cash"), // visa, cash
      supplier: "",
      adminPay: "0",
      discount: "0",
      toStore: true,
      products: [],
   };

   const { refetch: sRefetch } = useAxios();
   const { data, isSubmitted, loading, error, refetch } = useAxios();

   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({ name: "", count: "", price: "" });

   const { suppliers, products } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   useEffect(() => {
      setFormData((formData) => ({ ...formData, products: [] }));
   }, []);

   useEffect(() => {
      if (suppliers.length) return;
      (async () => {
         const { data, isSubmitted, error } = await sRefetch("get", "/products/get-suppliers-list");
         if (isSubmitted && error) return;
         dispatch(getSuppliers(data));
      })();
   }, []);

   useEffect(() => {
      if (formData.paymentWay !== text("statement-payment-way-project"))
         return setFormData((form) => ({ ...form, adminPay: 0 }));

      setFormData((form) => {
         const data = { ...form };
         const adminPay = data.products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
         return { ...data, adminPay };
      });
   }, [formData.paymentWay, formData.products.length]);

   useEffect(() => {
      if (!products?.length) return;

      const produc = products?.find(({ name }) => name === product.name);
      if (!produc) return;

      setProduct((data) => ({ ...data, price: produc?.buyPrice || 0 }));
   }, [product.name]);

   useEffect(() => {
      dispatch(filterSelection({ process: "suppliers", supplier: formData.supplier }));
   }, [formData.supplier]);

   const handleSubmit = async (event) => {
      event.preventDefault();
      const { supplier, discount, paymentMethod, paymentWay, adminPay, products } = formData;

      if (!products.length || !supplier || !discount || !paymentMethod || !paymentWay || !adminPay) {
         return alert("يجب ادخال جميع البيانات المطلوبه");
      }

      await refetch("put", "/products/buy-products", { ...formData, lang: i18next.language });
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("statement-buy-title")}
         buttonText={text("statement-buy-btn")}
         loading={loading || (isSubmitted && !error && !data?.warn)}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <FieldWithRedirectLink path="/creates/supplier" redirectTo="/statements/buy">
            <Selectbox
               label={text("chooseSupplier")}
               options={suppliers}
               value={formData.supplier}
               loading={!isSubmitted && loading}
               onChange={(value) => setFormData(() => ({ ...formState, supplier: value }))}
            />
         </FieldWithRedirectLink>

         <Info isAdminPay={true} formData={formData} setFormData={setFormData} />

         <InsertProduct
            redirectTo="/statements/buy"
            product={product}
            setProduct={setProduct}
            setFormData={setFormData}
         />

         <TableProducts formData={formData} setFormData={setFormData} />
      </Form>
   );
};
