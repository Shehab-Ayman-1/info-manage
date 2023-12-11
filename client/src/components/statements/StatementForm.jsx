import { Button, IconButton } from "@material-tailwind/react";
import { useSelector } from "react-redux";

import { Field, Form, Selectbox, Switch } from "@/components/public";
import { Table, Row, Col } from "@/components/table";
import { Loading } from "@/layout/Loading";
import { useEffect, useState } from "react";

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
   const [total, setTotal] = useState(0);

   useEffect(() => {
      const total = formData?.products
         ?.map((row) => ({ price: row?.price, count: row?.count }))
         ?.reduce((prev, cur) => prev + cur.price * cur.count, 0);
      setTotal(() => total || "00,00");
   }, [formData?.products]);

   const handleFieldChange = (event) => {
      if (event.target.name === "discount")
         return setFormData((data) => ({ ...data, discount: event.target.value }));
      setProduct((p) => ({ ...p, [event.target.name]: event.target.value }));
   };

   const handleAddField = () => {
      if (!Object.values(product).every((p) => p)) return alert("يجب ادخال جميل البيانات المطلوبه");
      setFormData((data) => ({ ...data, products: data.products.concat(product) }));
      setProduct(() => ({ name: null, count: 0, price: 0 }));
   };

   const handleDeleteField = (index) => {
      setFormData((data) => {
         const products = data?.products.filter((_, idx) => idx !== index);
         return { ...data, products };
      });
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

         <div className="border-primary/50 rounded-xl border border-solid px-2 md:px-4">
            <div className="w-full">
               <Selectbox
                  label="اختار اسم المنتج"
                  value={product.name}
                  loading={!isSubmitted && loading}
                  options={products?.map(({ name }) => name).filter((n) => n) || []}
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
               <Button color="deep-purple" className="my-2 text-xl hover:brightness-125" onClick={handleAddField}>
                  اضافه
               </Button>
               <Switch
                  label={formData.toStore ? "المخزن" : "المحل"}
                  checked={formData.toStore}
                  required={false}
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

         <Table headers={TABLE_HEAD} rows={formData.products} footerSpan={[3, 3]} total={total}>
            {formData.products.map(({ name, count, price }, i) => (
               <Row key={i} index={i}>
                  <Col>
                     <IconButton variant="text" color="red" onClick={() => handleDeleteField(i)}>
                        <i className="fa fa-times text-xl text-red-500 hover:text-red-900" />
                     </IconButton>
                  </Col>
                  <Col>{i + 1}</Col>
                  <Col>{name}</Col>
                  <Col>{count}</Col>
                  <Col>{price}</Col>
                  <Col>{+price * +count}</Col>
               </Row>
            ))}
         </Table>
      </Form>
   );
};
