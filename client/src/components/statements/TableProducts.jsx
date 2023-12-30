import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Col, Row, Table } from "@/components/table";

const TABLE_HEAD_AR = ["حذف", "#", "المنتج", "العدد", "السعر", "الاجمالي"];
const TABLE_HEAD_EN = ["DEL", "#", "Product", "Count", "Price", "Total"];
export const TableProducts = ({ formData, setFormData }) => {
   const [text, i18next] = useTranslation();
   const [total, setTotal] = useState(0);

   useEffect(() => {
      const total = formData.products.reduce((prev, cur) => prev + +cur.price * +cur.count, 0);
      setTotal(total || "00,00");
   }, [formData]);

   const handleDeleteField = (index) => {
      setFormData((data) => {
         const products = data.products.filter((_, idx) => idx !== index);
         return { ...data, products };
      });
   };

   return (
      <Table headers={i18next.language === "en" ? TABLE_HEAD_EN : TABLE_HEAD_AR} footerSpan={[3, 3]} total={total}>
         {formData.products.map(({ name, count, price }, i) => (
            <Row key={i} index={i}>
               <Col>
                  <IconButton variant="text" color="red" onClick={() => handleDeleteField(i)}>
                     <i className="fa fa-times text-xl text-red-500 hover:text-red-900" />
                  </IconButton>
               </Col>
               <Col>{i + 1}</Col>
               <Col>{name}</Col>
               <Col>{+count}</Col>
               <Col>{+price}</Col>
               <Col>{+price * +count}</Col>
            </Row>
         ))}
      </Table>
   );
};
