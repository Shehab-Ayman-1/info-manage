import { Button, Switch } from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { Field, Form, Selectbox, Table } from "@/components/public";
import { useDispatch, useSelector } from "react-redux";
import { filterSelection, getSuppliers } from "@/redux/slices/creates";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

const TABLE_HEAD = ["", "#", "المنتج", "العدد", "السعر", "الاجمالي"];
const formState = { supplier: "", discount: 0, toStore: true, products: [] };
export const Buy = () => {
   const { refetch: sRefetch } = useAxios();
   const { data, isSubmitted, loading, error, refetch } = useAxios();
   const [formData, setFormData] = useState(formState);
   const [product, setProduct] = useState({ name: "", count: 0, price: 0 });
   const { suppliers, products } = useSelector(({ creates }) => creates);
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
      dispatch(filterSelection({ process: "suppliers", supplier: formData.supplier }));
   }, [formData.supplier]);

   const handleSelectChange = (name, value) => {
      if (name === "supplier") return setFormData(() => ({ ...formState, supplier: value }));
      setProduct((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event) => {
      if (event.target.name === "discount")
         return setFormData((data) => ({ ...data, discount: event.target.value }));
      setProduct((p) => ({ ...p, [event.target.name]: event.target.value }));
   };

   const addField = () => {
      console.log(formData);
      setFormData((d) => ({ ...d, products: [...d.products, product] }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();

      await refetch("put", "/products/buy-products", formData);
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText="كشف مندوب"
         buttonText="اتمام الشراء"
         loading={(isSubmitted && !error) || loading}
         cardStyle="w-[500px]"
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         <div className="supplier">
            <Selectbox
               label="اختار اسم المندوب"
               onChange={(value) => handleSelectChange("supplier", value)}
               options={suppliers}
            />
         </div>

         <div className="rounded-xl border border-solid border-deep-purple-500/50 px-2 md:px-4">
            <div className="w-full">
               <Selectbox
                  label="اختار اسم المنتج"
                  onChange={(value) => handleSelectChange("name", value)}
                  options={products}
               />
            </div>

            <div className="flex-between flex-wrap sm:flex-nowrap">
               <Field
                  type="number"
                  label="العدد"
                  name="count"
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
               <Field
                  type="number"
                  label="السعر"
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
                  label={formData.toStore ? "المخزن" : "المحل"}
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
            <Field type="number" min="0" name="discount" label="الخصم" onChange={handleFieldChange} />
         </div>

         <div className="">
            <Table headers={TABLE_HEAD} rows={formData.products} setFormData={setFormData} allowTotal />
         </div>
      </Form>
   );
};
