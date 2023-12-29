import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field, MTDialog, Selectbox } from "@/components/ui";
import { filterSelection, getLists } from "@/redux/products";
import { useAxios } from "@/hooks/useAxios";

const productState = { _id: "", category: "", company: "", name: "", count: "", price: "", isNew: true };
export const InsertProduct = ({ formData, setFormData, open, handler }) => {
   const [text, i18next] = useTranslation();

   const { lists, categories, companies, products } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   const [product, setProduct] = useState(productState);
   const { loading, isSubmitted, refetch } = useAxios();

   useEffect(() => {
      if (lists.length) return;
      (async () => {
         const { data, isSubmitted, error } = await refetch("get", "/products/get-products-list");
         if (isSubmitted && !error) dispatch(getLists(data));
      })();
   }, []);

   useEffect(() => {
      dispatch(filterSelection({ category: product?.category || "", company: "" }));
   }, [product.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: product?.category || "", company: product?.company || "" }));
   }, [product.company]);

   useEffect(() => {
      const category = lists.find((item) => item.category === product?.category);
      if (!category) return;

      const company = category.companies.find((item) => item.company === product?.company);
      if (!company) return;

      const produc = company.products.find((item) => item.name === product?.name);
      if (!produc) return;

      dispatch(filterSelection({ category: product?.category || "", company: product?.company || "" }));
      setProduct((data) => ({
         ...data,
         price: formData?.type === "bill" ? produc.salePrice : formData?.type === "debt" ? produc.buyPrice : 0,
      }));
   }, [product?.category, product?.company, product?.name]);

   const handleFieldChange = (event) => {
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSelectChange = (name, value) => {
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleSubmit = () => {
      const { name, count, price, isNew } = product;
      setFormData((data) => {
         const isExist = data.products.find((item) => item.name === product.name);
         if (isExist) {
            alert("هذا المنتج موجود بالفعل");
            return data;
         }

         const _id = new Date().getTime().toString(32);
         data.products.push({ _id, name, count, price, isNew });
         data.insertedProducts.push({ _id, name, count, price, isNew });
         return data;
      });
      setProduct(productState);
      handler();
   };

   const priceLabel =
      formData?.type === "bill" ? text("updateBill-newWidget-salePrice") : text("updateBill-newWidget-buyPrice");
   return (
      <MTDialog
         headerText={text("updateBill-newWidget-title")}
         buttonText={text("insert")}
         open={open}
         handler={handler}
         onSubmit={handleSubmit}
      >
         <Selectbox
            label={text("chooseCategory")}
            options={categories}
            loading={!isSubmitted && loading}
            value={product?.category}
            onChange={(value) => handleSelectChange("category", value)}
         />

         <Selectbox
            label={text("chooseCompany")}
            options={companies}
            loading={!isSubmitted && loading}
            value={product?.company}
            onChange={(value) => handleSelectChange("company", value)}
         />

         <Selectbox
            label={text("chooseProduct")}
            options={products?.map((item) => item.name) || []}
            loading={!isSubmitted && loading}
            value={product?.name}
            onChange={(value) => handleSelectChange("name", value)}
         />

         <Field
            type="number"
            label={text("count")}
            name="count"
            min="0"
            value={product.count}
            onChange={(event) => setProduct((data) => ({ ...data, count: event.target.value }))}
         />

         <Field
            type="number"
            label={priceLabel}
            name="price"
            min="0"
            value={product.price}
            onChange={handleFieldChange}
         />
      </MTDialog>
   );
};
