import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";

import { Field, Form, Selectbox, Switch } from "@/components/public";
import { Loading } from "@/layout/loading";
import { Table } from "@/components/statements";

const TABLE_HEAD = ["", "#", "المنتج", "العدد", "السعر", "الاجمالي"];
export const StatementForm = ({
   onSubmit,
   text,
   data,
   loading,
   error,
   isSubmitted,
   formData,
   setFormData,
   product,
   setProduct,
   children,
   handleSelectChange,
}) => {
   const { products } = useSelector(({ products }) => products);

   const handleFieldChange = (event) => {
      if (event.target.name === "discount")
         return setFormData((data) => ({ ...data, discount: event.target.value }));
      setProduct((p) => ({ ...p, [event.target.name]: event.target.value }));
   };

   const addField = () => {
      if (!Object.values(product).every((p) => p)) return alert("يجب ادخال جميل البيانات المطلوبه");
      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setProduct(() => ({ name: null, count: 0, price: 0 }));
   };

   return (
      <Form
         onSubmit={onSubmit}
         headerText={text?.headerText}
         buttonText={text?.buttonText}
         loading={(isSubmitted && !error && !data?.warn) || loading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         {children}

         <div className="rounded-xl border border-solid border-deep-purple-500/50 px-2 md:px-4">
            <div className="w-full">
               <Selectbox
                  label="اختار اسم المنتج"
                  options={products?.map(({ name }) => name).filter((n) => n) || []}
                  value={product.name}
                  onChange={(value) => handleSelectChange("name", value)}
               />
            </div>

            <div className="flex-between flex-wrap sm:flex-nowrap">
               <Field
                  type="number"
                  label="العدد"
                  name="count"
                  value={product.count}
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
               <Field
                  type="number"
                  label="السعر"
                  name="price"
                  value={product.price}
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
            </div>

            <div className="flex-around">
               <Button color="deep-purple" className="my-2 text-xl dark:text-black" onClick={addField}>
                  اضافه
               </Button>
               <Switch
                  label={formData.toStore ? "المخزن" : "المحل"}
                  checked={formData.toStore}
                  onChange={(e) => setFormData((d) => ({ ...d, toStore: e.target.checked }))}
               />
            </div>
         </div>

         <div className="mb-5">
            <Field
               type="number"
               min="0"
               name="discount"
               value={formData.discount}
               label="الخصم"
               onChange={handleFieldChange}
            />
         </div>

         <Table headers={TABLE_HEAD} rows={formData.products} setFormData={setFormData} allowTotal />
      </Form>
   );
};
