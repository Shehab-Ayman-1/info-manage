import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";
import { IconButton } from "@material-tailwind/react";

const TABLE_HEAD_AR = ["التحكم", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["Controll", "Product", "Count", "Price", "Total"];
export const TableProducts = ({ formData, setFormData, handler }) => {
   const [, i18next] = useTranslation();
   const [total, setTotal] = useState("00,00");

   useEffect(() => {
      const total = formData.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);
      setTotal(() => total || "00,00");
   }, [formData.products]);

   const handleDeleteField = (_id, name, count, isNew) => {
      setFormData((data) => {
         const products = data.products.filter((item) => item._id !== _id);
         const insertedProducts = data.insertedProducts.filter((item) => item._id !== _id);
         const updatedProducts = data.updatedProducts.filter((item) => item._id !== _id);

         if (!isNew) data.deletedProducts.push({ _id, name, count });
         return { ...data, products, insertedProducts, updatedProducts };
      });
   };

   return (
      <Table headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR} footerSpan={[3, 3]} total={total}>
         {formData.products.map(({ _id, name, count, price, inc, isNew }, i) => (
            <Row key={i} index={i}>
               <Col>
                  <IconButton
                     variant="text"
                     color="red"
                     onClick={() => handleDeleteField(_id, name, count, isNew)}
                  >
                     <i className="fa fa-times text-xl text-red-500 hover:text-red-900" />
                  </IconButton>
                  <IconButton
                     variant="text"
                     color="red"
                     onClick={() => handler({ _id, name, price, count, inc: 0 })}
                  >
                     <i className="fa fa-edit text-xl text-orange-500 hover:text-orange-900" />
                  </IconButton>
               </Col>
               <Col>{name}</Col>
               <Col>{+count + (+inc || 0)}</Col>
               <Col>{price}</Col>
               <Col>{+price * +count}</Col>
            </Row>
         ))}
      </Table>
   );
};
