import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filterSelection, getSuppliers } from "@/redux/slices/products";
import { StatementForm } from "@/components/statements";
import { Selectbox } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";

const formState = { supplier: "", discount: 0, toStore: true, products: [] };
export const BuyStatement = () => {
   const { refetch: sRefetch } = useAxios();
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({ name: "", count: 0, price: 0 });
   const { suppliers, products } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   useEffect(() => {
      if (suppliers.length) return;

      (async () => {
         const { data, isSubmitted, error } = await sRefetch("get", "/products/get-suppliers-list");
         if (isSubmitted && error) return;
         dispatch(getSuppliers(data));
      })();
   }, []);

   useEffect(() => {
      if (!products?.length) return;

      const produc = products?.find(({ name }) => name === product.name);
      if (!produc) return;

      setProduct((data) => ({ ...data, price: produc?.price || 0 }));
   }, [product.name]);

   useEffect(() => {
      dispatch(filterSelection({ process: "suppliers", supplier: formData.supplier }));
   }, [formData.supplier]);

   const handleSelectChange = (name, value) => {
      if (name === "supplier") return setFormData(() => ({ ...formState, supplier: value }));
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (!formData.products.length) return alert("يجب ادخال منتج واحد علي الاقل في الفاتورة");
      await refetch("put", "/products/buy-products", formData);
   };

   return (
      <StatementForm
         onSubmit={handleSubmit}
         text={{ headerText: "كشف مندوب", buttonText: "اتمام الشراء" }}
         data={data}
         loading={loading}
         error={error}
         isSubmitted={isSubmitted}
         formData={formData}
         setFormData={setFormData}
         product={product}
         setProduct={setProduct}
         handleSelectChange={handleSelectChange}
      >
         <Selectbox
            label="اختار اسم المندوب"
            options={suppliers}
            value={formData.supplier}
            loading={!isSubmitted && loading}
            onChange={(value) => handleSelectChange("supplier", value)}
         />
      </StatementForm>
   );
};
