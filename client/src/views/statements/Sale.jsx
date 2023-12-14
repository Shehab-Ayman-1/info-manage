import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLists, filterSelection } from "@/redux/slices/products";
import { getClients } from "@/redux/slices/bills";
import { Selectbox } from "@/components/public";
import { StatementForm } from "@/components/statements";
import { useAxios } from "@/hooks/useAxios";

const formState = {
   category: "",
   company: "",
   products: [],
   discount: "",
   client: "",
   clientPay: "",
   toStore: false,
};
export const SaleStatement = () => {
   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({ name: "", count: 0, price: 0 });

   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const { loading: ccLoading, isSubmitted: ccIsSubmitted, refetch: ccRefetch } = useAxios();
   const { refetch: clRefetch } = useAxios();

   const { lists, categories, companies } = useSelector(({ products }) => products);
   const { clients } = useSelector(({ bills }) => bills);
   const dispatch = useDispatch();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-products-list");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();

      if (clients.length) return;

      (async () => {
         const { data, isSubmitted, error } = await clRefetch("get", "/bills/get-clients");
         if (isSubmitted && error) return;
         dispatch(getClients(data));
      })();
   }, []);

   useEffect(() => {
      if (!lists?.length) return;

      const category = lists?.find(({ category }) => category === formData.category);
      if (!category) return;

      const company = category.companies.find(({ company }) => company === formData.company);
      if (!company) return;

      const produc = company.products.find(({ name }) => name === product.name);
      if (!produc) return;

      setProduct((data) => ({ ...data, price: produc?.price || 0 }));
   }, [product.name]);

   useEffect(() => {
      dispatch(filterSelection({ category: formData.category, company: "" }));
   }, [formData.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: formData.category, company: formData.company }));
   }, [formData.company]);

   useEffect(() => {
      if (!data?.warnIndexes) return;

      setFormData((form) => {
         const products = form.products.filter((_, index) => data.warnIndexes.includes(index + 1));
         return { ...form, products };
      });
   }, [data]);

   const handleSelectChange = (name, value) => {
      if (name === "name") return setProduct((data) => ({ ...data, [name]: value }));
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!formData.products.length) return alert("يجب ادخال منتج واحد علي الاقل في الفاتورة");
      await refetch("put", "/products/sale-products", formData);
   };

   return (
      <StatementForm
         onSubmit={handleSubmit}
         text={{ headerText: "كشف حساب", buttonText: "اتمام البيع" }}
         data={data}
         loading={loading}
         error={error}
         isSubmitted={isSubmitted}
         formData={formData}
         setFormData={setFormData}
         product={product}
         setProduct={setProduct}
         isAdminPay={false}
         handleSelectChange={handleSelectChange}
      >
         <Selectbox
            label="اختار اسم القسم"
            options={categories}
            value={formData.category}
            loading={!ccIsSubmitted && ccLoading}
            onChange={(value) => handleSelectChange("category", value)}
         />
         <Selectbox
            label="اختار اسم الشركة"
            options={companies}
            value={formData.company}
            loading={!ccIsSubmitted && ccLoading}
            onChange={(value) => handleSelectChange("company", value)}
         />
         <Selectbox
            label="اختار اسم العميل"
            options={clients}
            value={formData.client}
            loading={!ccIsSubmitted && ccLoading}
            onChange={(value) => handleSelectChange("client", value)}
         />
      </StatementForm>
   );
};
