import { Button, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Field, Form, Selectbox } from "@/components/public";
import { Table, Row, Col } from "@/components/table";
import { Loading } from "@/layout/Loading";

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
   isAdminPay,
   handleSelectChange,
   children,
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
      if (
         event.target.name === "discount" ||
         event.target.name === "clientPay" ||
         event.target.name === "adminPay"
      )
         return setFormData((data) => ({ ...data, [event.target.name]: event.target.value }));
      setProduct((p) => ({ ...p, [event.target.name]: event.target.value }));
   };

   const handleAddField = () => {
      const { buyPrice, ...data } = product;
      if (!Object.values(data).every((p) => p)) return alert("يجب ادخال جميل البيانات المطلوبه");
      setFormData((data) => ({ ...data, products: data.products.concat(product) }));

      if (text.headerText === "كشف مندوب") setProduct(() => ({ name: null, count: 0, price: 0 }));
      else setProduct(() => ({ ...product, name: null, count: 0, price: 0, buyPrice: 0 }));
   };

   const handleDeleteField = (index) => {
      setFormData((data) => {
         const products = data?.products.filter((_, idx) => idx !== index);
         return { ...data, products };
      });
   };

   return (
      <Form onSubmit={onSubmit} headerText={text?.headerText} buttonText={text?.buttonText}>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         {children}

         <Selectbox
            label="المكان"
            value={formData.toStore ? "المخزن" : "المحل"}
            options={["المخزن", "المحل"]}
            onChange={(value) => setFormData((data) => ({ ...data, toStore: value === "المخزن" }))}
         />

         <div className="w-full rounded-xl border border-solid px-2 md:px-4">
            <Selectbox
               label="اختار اسم المنتج"
               value={product.name}
               loading={!isSubmitted && loading}
               options={products?.map(({ name }) => name).filter((n) => n) || []}
               onChange={(value) => handleSelectChange("name", value)}
            />

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

            <Button
               color="deep-purple"
               className="mx-auto my-2 block py-2 text-base hover:brightness-125"
               onClick={handleAddField}
            >
               <i className="fa fa-plus ml-2 text-base text-white hover:text-white" />
               اضافه
            </Button>
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
            {isAdminPay ? (
               <Field
                  type="number"
                  min="0"
                  name="adminPay"
                  value={formData.adminPay}
                  label="المبلغ المدفوع"
                  onChange={handleFieldChange}
               />
            ) : (
               <Field
                  type="number"
                  min="0"
                  name="clientPay"
                  value={formData.clientPay}
                  label="المبلغ المحصل"
                  onChange={handleFieldChange}
               />
            )}
         </div>

         <Table headers={TABLE_HEAD} footerSpan={[3, 3]} total={total}>
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
