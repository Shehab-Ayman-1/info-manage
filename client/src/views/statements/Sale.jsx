import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Switch } from "@material-tailwind/react";

import { Field, Form, Selectbox, Table } from "@/components/public";
import { getLists, filterSelection } from "@/redux/slices/creates";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

const TABLE_HEAD = ["", "#", "المنتج", "العدد", "السعر", "الاجمالي"];
const formState = { category: "", company: "", products: [], discount: 0, toStore: false };
export const Sale = () => {
   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({ name: "", count: 0, price: 0 });
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const { refetch: ccRefetch } = useAxios();
   const { lists, categories, companies, products } = useSelector(({ creates }) => creates);
   const dispatch = useDispatch();

   useEffect(() => {
      if (lists.length) return;

      (async () => {
         const { data, isSubmitted, error } = await ccRefetch("get", "/products/get-lists");
         if (isSubmitted && error) return;
         dispatch(getLists(data));
      })();
   }, []);

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

   const handleFieldChange = (event) => {
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const addField = () => {
      if (!Object.values(product).every((p) => p)) return alert("يجب ادخال جميل البيانات المطلوبه");
      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      await refetch("put", "/products/sale-products", formData);
   };

   return (
      <Form onSubmit={handleSubmit} headerText="كشف حساب" buttonText="اتمام البيع" cardStyle="w-[500px]">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <div className="category">
            <Selectbox
               label="اختار اسم القسم"
               options={categories}
               onChange={(value) => handleSelectChange("category", value)}
            />
         </div>

         <div className="company">
            <Selectbox
               label="اختار اسم الشركة"
               options={companies}
               onChange={(value) => handleSelectChange("company", value)}
            />
         </div>

         <div className="rounded-xl border border-solid border-deep-purple-500/50 px-4">
            <div className="w-full">
               <Selectbox
                  label="اختار اسم المنتج"
                  options={products}
                  onChange={(value) => handleSelectChange("name", value)}
               />
            </div>

            <div className="flex-between flex-wrap sm:flex-nowrap">
               <Field
                  type="number"
                  label="العدد"
                  min="0"
                  name="count"
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
               <Field
                  type="number"
                  label="السعر"
                  min="0"
                  name="price"
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
            </div>

            <div className="flex-around">
               <Button color="deep-purple" className="my-2 text-xl" onClick={addField}>
                  اضافه
               </Button>
               <Switch
                  color="indigo"
                  label={`${formData.toStore ? "المخزن" : "المحل"}`}
                  checked={formData.toStore}
                  onChange={(e) => setFormData((d) => ({ ...d, toStore: e.target.checked }))}
                  containerProps={{
                     className: "whitespace-nowrap ml-5",
                  }}
                  circleProps={{
                     className: "ring-1 ring-primary",
                  }}
               />
            </div>
         </div>

         <div className="mb-5">
            <Field type="number" label="الخصم" min="0" name="discount" onChange={handleFieldChange} />
         </div>

         <div className="">
            <Table headers={TABLE_HEAD} rows={formData.products} setFormData={setFormData} allowTotal />
         </div>
      </Form>
   );
};
