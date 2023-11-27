import { Field, Form, Selectbox, Table } from "@/components/public";
import { Button, Switch } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TABLE_HEAD = ["المنتج", "العدد", "السعر", "الاجمالي"];

export const Buy_Sale = () => {
   const [formData, setFormData] = useState({ category: "", company: "", products: [], toStore: false });
   const [product, setProduct] = useState({ name: "", count: "", price: "" });
   const location = useLocation();
   const navigate = useNavigate();
   const pathname = location.pathname.split("/")[2];

   useEffect(() => {
      setFormData((d) => ({ ...d, toStore: pathname === "sale" }));
   }, [pathname]);

   const addField = () => {
      setFormData((d) => ({ ...d, products: [...d.products, product] }));
   };

   const handleSubmit = (event) => {
      event.preventDefault();
      console.log(formData);
      navigate("/");
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={`${pathname === "sale" ? "كشف حساب" : "كشف مندوب"}`}
         buttonText={`اتمام ${pathname === "sale" ? "البيع" : "الشراء"}`}
         cardStyle="w-[500px]"
      >
         <div className="category">
            <Selectbox
               label="اختار اسم القسم"
               onChange={(e) => setFormData((d) => ({ ...d, category: e }))}
               options={["القسم 1", "القسم 2", "القسم 3", "القسم 4"]}
            />
         </div>

         <div className="company">
            <Selectbox
               label="اختار اسم الشركة"
               onChange={(e) => setFormData((d) => ({ ...d, company: e }))}
               options={["الشركة 1", "الشركة 2", "الشركة 3", "الشركة 4"]}
            />
         </div>

         <div className="rounded-xl border border-solid border-deep-purple-500/50 px-4">
            <div className="w-full">
               <Selectbox
                  label="اختار اسم المنتج"
                  onChange={(d) => setProduct((p) => ({ ...p, name: d }))}
                  options={["المنتج 1", "المنتج 2", "المنتج 3", "المنتج 4"]}
               />
            </div>

            <div className="flex-between flex-wrap sm:flex-nowrap">
               <Field
                  type="number"
                  label="العدد"
                  onChange={(e) => setProduct((p) => ({ ...p, count: e.target.value }))}
                  containerStyle="sm:!w-[50%] w-full"
               />
               <Field
                  type="number"
                  label="السعر"
                  onChange={(e) => setProduct((p) => ({ ...p, price: e.target.value }))}
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

         <div className="">
            <Table headers={TABLE_HEAD} rows={formData.products} allowTotal />
         </div>
      </Form>
   );
};
