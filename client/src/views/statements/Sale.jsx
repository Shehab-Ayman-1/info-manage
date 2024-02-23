import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { FieldWithRedirectLink, Info, InsertProduct, TableProducts } from "@/components/statements";
import { getLists, filterSelection } from "@/redux/products";
import { Form, Selectbox } from "@/components/ui";
import { getClients } from "@/redux/bills";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const productState = { category: "", company: "", name: "", count: "", price: "", buyPrice: 0 };
export const SaleStatement = () => {
   const [text, i18next] = useTranslation();
   const formState = {
      client: text("statement-unknown-client"),
      clientPay: '0',
      discount: '0',
      paymentMethod: text("cash"), // visa, cash
      paymentWay: text("statement-payment-way-project"),
      toStore: false,
      products: [],
   };

   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState(productState);

   const { loading: lLoading, isSubmitted: lIsSubmitted, refetch: lRefetch } = useAxios();
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const { refetch: cRefetch } = useAxios();

   const { lists, categories, companies } = useSelector(({ products }) => products);
   const { clients } = useSelector(({ bills }) => bills);
   const dispatch = useDispatch();

   useEffect(() => {
      setFormData((formData) => ({ ...formData, products: [] }));
   }, []);

   useEffect(() => {
      if (!lists.length) {
         (async () => {
            const { data, isSubmitted, error } = await lRefetch("get", "/products/get-products-list");
            if (isSubmitted && error) return;
            dispatch(getLists(data));
         })();
      }

      if (!clients.length) {
         (async () => {
            const { data, isSubmitted, error } = await cRefetch("get", "/bills/get-clients");
            if (isSubmitted && error) return;
            dispatch(getClients(data));
         })();
      }
   }, []);

   useEffect(() => {
      if (formData.paymentWay !== text("statement-payment-way-project"))
         return setFormData((form) => ({ ...form, clientPay: 0 }));

      setFormData((form) => {
         const data = { ...form };
         const clientPay = data.products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
         return { ...data, clientPay };
      });
   }, [formData.paymentWay, formData.products.length]);

   useEffect(() => {
      if (!lists?.length) return;

      const category = lists?.find(({ category }) => category === product.category);
      if (!category) return;

      const company = category.companies.find(({ company }) => company === product.company);
      if (!company) return;

      const produc = company.products.find(({ name }) => name === product.name);
      if (!produc) return;

      setProduct((data) => ({ ...data, price: produc?.salePrice || 0, buyPrice: produc?.buyPrice || 0 }));
   }, [product.name]);

   useEffect(() => {
      dispatch(filterSelection({ category: product.category, company: "" }));
   }, [product.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: product.category, company: product.company }));
   }, [product.company]);

   const handleSelectChange = (name, value) => {
      if (name === "category" || name === "company") return setProduct((data) => ({ ...data, [name]: value }));
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const { toStore, ...data } = formData;

      if (!Object.values(data).every((u) => u)) return alert("يجب ادخال جميع البيانات المطلوبة");
      if (!formData.products.length) return alert("يجب ادخال منتج واحد علي الاقل في الفاتورة");

      await refetch("put", "/products/sale-products", { ...formData, lang: i18next.language });
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("statement-sale-title")}
         buttonText={text("statement-sale-btn")}
         loading={loading || (isSubmitted && !error && !data?.warn)}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <FieldWithRedirectLink path="/creates/client" redirectTo="/statements/sale">
            <Selectbox
               label={formData.client}
               options={clients}
               value={formData.client}
               loading={!lIsSubmitted && lLoading}
               onChange={(value) => handleSelectChange("client", value)}
            />
         </FieldWithRedirectLink>

         <Info isAdminPay={false} formData={formData} setFormData={setFormData} />

         <div className="flex-between flex-wrap md:flex-nowrap">
            <Selectbox
               label={text("chooseCategory")}
               options={categories}
               value={product.category}
               loading={!lIsSubmitted && lLoading}
               onChange={(value) => handleSelectChange("category", value)}
            />

            <Selectbox
               label={text("chooseCompany")}
               options={companies}
               value={product.company}
               loading={!lIsSubmitted && lLoading}
               onChange={(value) => handleSelectChange("company", value)}
            />
         </div>

         <InsertProduct product={product} setProduct={setProduct} setFormData={setFormData} />

         <TableProducts formData={formData} setFormData={setFormData} />
      </Form>
   );
};
