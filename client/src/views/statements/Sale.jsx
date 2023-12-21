import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getLists, filterSelection } from "@/redux/slices/products";
import { getClients } from "@/redux/slices/bills";
import { Selectbox } from "@/components/public";
import { StatementForm } from "@/components/statements";
import { useAxios } from "@/hooks/useAxios";

const formState = {
   client: "عميل غير معروف",
   clientPay: "",
   discount: "",
   toStore: false,
   products: [],
};
export const SaleStatement = () => {
   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({
      category: "",
      company: "",
      name: "",
      count: 0,
      price: 0,
      buyPrice: 0,
   });

   const { loading: ccLoading, isSubmitted: ccIsSubmitted, refetch: ccRefetch } = useAxios();
   const { data, isSubmitted, loading, error, refetch } = useAxios();
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
      if (name === "name" || name === "category" || name === "company")
         return setProduct((data) => ({ ...data, [name]: value }));
      setFormData((data) => ({ ...data, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      const { toStore, ...data } = formData;
      if (!Object.values(data).every((u) => u)) return alert("يجب ادخال جميع البيانات المطلوبة");

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
            value={product.category}
            loading={!ccIsSubmitted && ccLoading}
            onChange={(value) => handleSelectChange("category", value)}
         />
         <Selectbox
            label="اختار اسم الشركة"
            options={companies}
            value={product.company}
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
