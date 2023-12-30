import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Field, MTDialog } from "@/components/ui";
import { Typography } from "@material-tailwind/react";

export const UpdateProduct = ({ formData, setFormData, open, handler }) => {
   const [text] = useTranslation();
   const [product, setProduct] = useState(formData.needToUpdate);

   useEffect(() => {
      setProduct(formData.needToUpdate);
   }, [formData.needToUpdate]);

   const handleFieldChange = (event) => {
      setProduct((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = () => {
      const id = formData.needToUpdate._id;
      setFormData((data) => {
         const productIdx = data.products.findIndex((item) => item._id === id);
         const insertedIdx = data.insertedProducts.findIndex((item) => item._id === id);
         const updatedIdx = data.updatedProducts.findIndex((item) => item._id === id);

         // If This Is A New Product -> Update In Inserted Products
         if (insertedIdx !== -1) {
            data.insertedProducts[insertedIdx] = product;
            data.products[productIdx] = product;
            return data;
         }

         // Else -> Update The Updated Products
         if (updatedIdx !== -1) data.updatedProducts[updatedIdx] = product;
         else data.updatedProducts.push(product);

         // products
         data.products[productIdx] = product;
         return data;
      });
      handler();
   };

   return (
      <MTDialog
         headerText={text("updateBill-updateWidget-title")}
         buttonText={text("updateBill-submit")}
         open={open}
         handler={handler}
         onSubmit={handleSubmit}
      >
         <Typography variant="lead" className="text-center text-dimWhite">
            {text("updateBill-newWidget-desc")}
         </Typography>
         <Field
            type="number"
            name="inc"
            min="-100"
            label={text("count")}
            value={product.inc}
            onChange={handleFieldChange}
         />

         <Field
            type="number"
            name="price"
            min="0"
            label={text("price")}
            value={product.price}
            onChange={handleFieldChange}
         />
      </MTDialog>
   );
};
