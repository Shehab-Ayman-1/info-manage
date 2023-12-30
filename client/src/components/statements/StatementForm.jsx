import { Button, IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field, Form, Selectbox } from "@/components/ui";
import { Table, Row, Col } from "@/components/table";
import { Loading } from "@/layout/Loading";

const TABLE_HEAD_AR = ["حذف", "#", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["DEL", "#", "Product", "Count", "Price", "Total"];
export const StatementForm = ({
   headerText,
   buttonText,

   onSubmit,
   handleSelectChange,
   isAdminPay,

   data,
   loading,
   error,
   isSubmitted,

   formData,
   setFormData,

   product,
   setProduct,

   children,
}) => {
   const [text, i18next] = useTranslation();
   const { products } = useSelector(({ products }) => products);
   const [total, setTotal] = useState(0);

   useEffect(() => {
      const total = formData?.products
         ?.map((data) => ({ price: data?.price, count: data?.count }))
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
      <Form onSubmit={onSubmit} headerText={headerText} buttonText={buttonText}>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />

         {children}

         <div className="w-full rounded-xl border border-solid px-2 md:px-4">
            <Selectbox
               label={text("chooseProduct")}
               value={product.name}
               loading={!isSubmitted && loading}
               options={products?.map(({ name }) => name).filter((n) => n) || []}
               onChange={(value) => handleSelectChange("name", value)}
            />

            <div className="flex-between flex-wrap sm:flex-nowrap">
               <Field
                  type="number"
                  label={text("count")}
                  name="count"
                  value={product.count}
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
               <Field
                  type="number"
                  label={text("price")}
                  name="price"
                  value={product.price}
                  onChange={handleFieldChange}
                  containerStyle="sm:!w-[50%] w-full"
               />
            </div>

            <Button
               color="deep-purple"
               className="mx-auto my-4 block text-base hover:brightness-125"
               onClick={handleAddField}
            >
               {text("insert")}
               <i className="fa fa-plus mx-2 text-base text-white hover:text-white" />
            </Button>
         </div>

         <div className="mb-5">
            <Field
               type="number"
               min="0"
               name="discount"
               value={formData.discount}
               label={text("discount")}
               onChange={handleFieldChange}
            />
            {isAdminPay ? (
               <Field
                  type="number"
                  min="0"
                  name="adminPay"
                  value={formData.adminPay}
                  label={text("paidcost")}
                  onChange={handleFieldChange}
               />
            ) : (
               <Field
                  type="number"
                  min="0"
                  name="clientPay"
                  value={formData.clientPay}
                  label={text("recievedcost")}
                  onChange={handleFieldChange}
               />
            )}
         </div>
      </Form>
   );
};
