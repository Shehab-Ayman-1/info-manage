import { useEffect, useState } from "react";
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";

import { Field, Form, Selectbox, Switch } from "@/components/public";
import { filterSelection, getLists, getSuppliers } from "@/redux/slices/products";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/loading";

const supplierState = { supplier: "", name: "", count: 0, toStore: false };
const categoryState = { category: "", company: "", name: "", count: 0, toStore: false };
export const Transfer = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const {
      data: sendData,
      loading: sLoading,
      error: sError,
      isSubmitted: sIsSubmitted,
      refetch: sRefetch,
   } = useAxios();
   const [supplierData, setSupplierData] = useState(supplierState);
   const [categoryData, setCategoryData] = useState(categoryState);
   const { categories, companies, products, suppliers } = useSelector(({ products }) => products);
   const dispatch = useDispatch();

   useEffect(() => {
      if (!suppliers.length) {
         (async () => {
            const { data, isSubmitted, error } = await refetch("get", "/products/get-products-list");
            if (isSubmitted && error) return;
            dispatch(getLists(data));
         })();
      }

      if (!categories.length) {
         (async () => {
            const { data, isSubmitted, error } = await refetch("get", "/products/get-suppliers-list");
            if (isSubmitted && error) return;
            dispatch(getSuppliers(data));
         })();
      }
   }, []);

   useEffect(() => {
      dispatch(filterSelection({ process: "suppliers", supplier: supplierData.supplier }));
   }, [supplierData.supplier]);

   useEffect(() => {
      dispatch(filterSelection({ category: categoryData.category, company: "" }));
   }, [categoryData.category]);

   useEffect(() => {
      dispatch(filterSelection({ category: categoryData.category, company: categoryData.company }));
   }, [categoryData.company]);

   const handleSelectChange = (name, value, process = "supplier") => {
      if (process === "supplier") return setSupplierData((data) => ({ ...data, [name]: value }));
      if (process === "category") return setCategoryData((data) => ({ ...data, [name]: value }));
   };

   const handleFieldChange = (event, process = "supplier") => {
      if (process === "supplier")
         return setSupplierData((data) => ({ ...data, [event.target.name]: event.target.value }));
      if (process === "category")
         return setCategoryData((data) => ({ ...data, [event.target.name]: event.target.value }));
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      if (supplierData.supplier) {
         const { toStore, ...data } = supplierData;
         if (!Object.values(data).every((p) => p)) return alert("يجب ادخال جميع البيانات المطلوبة");

         await sRefetch("put", `/products/transfer-products/supplier`, supplierData);
      }

      if (categoryData.category) {
         const { toStore, ...data } = categoryData;
         if (!Object.values(data).every((p) => p)) return alert("يجب ادخال جميع البيانات المطلوبة");

         await sRefetch("put", `/products/transfer-products/category`, categoryData);
      }
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText="تحويل منتجات"
         buttonText="تحويل"
         loading={(sIsSubmitted && !sError) || sLoading}
      >
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />
         <Loading isSubmitted={sIsSubmitted} loading={sLoading} error={sError} message={sendData} to="/" />

         <Tabs value="supplier">
            <TabsHeader
               className="border border-solid border-primary bg-primary/25 dark:bg-primary/10"
               indicatorProps={{ className: "bg-primary/50" }}
            >
               <Tab
                  value="supplier"
                  className="text-lg font-semibold dark:text-white"
                  onClick={() => setCategoryData(categoryState)}
               >
                  مندوب
               </Tab>
               <Tab
                  value="category"
                  className="text-lg font-semibold dark:text-white"
                  onClick={() => setSupplierData(supplierState)}
               >
                  قسم
               </Tab>
            </TabsHeader>

            <TabsBody>
               <TabPanel value="supplier" className="min-h-[350px] overflow-y-auto">
                  <Selectbox
                     label="اختر اسم المندوب"
                     options={suppliers}
                     required={false}
                     value={supplierData.supplier}
                     onChange={(value) => handleSelectChange("supplier", value)}
                  />

                  <Selectbox
                     label="اختر اسم المنتج"
                     options={products?.map(({ name }) => name).filter((n) => n) || []}
                     required={false}
                     value={supplierData.name}
                     onChange={(value) => handleSelectChange("name", value)}
                  />

                  <Field
                     type="number"
                     label="العدد"
                     name="count"
                     value={supplierData.count}
                     required={false}
                     onChange={handleFieldChange}
                  />

                  <div className="mt-5">
                     <Switch
                        label={supplierData.toStore ? "الي المخزن" : "الي المحل"}
                        checked={supplierData.toStore}
                        required={false}
                        onChange={(event) =>
                           setSupplierData((data) => ({ ...data, toStore: event.target.checked }))
                        }
                     />
                  </div>
               </TabPanel>

               <TabPanel value="category" className="overflow-y-auto">
                  <Selectbox
                     label="اختر اسم القسم"
                     options={categories}
                     required={false}
                     value={categoryData.category}
                     onChange={(value) => handleSelectChange("category", value, "category")}
                  />

                  <Selectbox
                     label="اختر اسم الشركة"
                     options={companies}
                     required={false}
                     value={categoryData.company}
                     onChange={(value) => handleSelectChange("company", value, "category")}
                  />

                  <Selectbox
                     label="اختر اسم المنتج"
                     options={products?.map(({ name }) => name).filter((n) => n) || []}
                     required={false}
                     value={categoryData.name}
                     onChange={(value) => handleSelectChange("name", value, "category")}
                  />

                  <Field
                     type="number"
                     label="العدد"
                     name="count"
                     value={categoryData.count}
                     required={false}
                     onChange={(event) => handleFieldChange(event, "category")}
                  />

                  <div className="mt-5">
                     <Switch
                        label={categoryData.toStore ? "الي المخزن" : "الي المحل"}
                        checked={categoryData.toStore}
                        required={false}
                        onChange={(event) =>
                           setCategoryData((data) => ({ ...data, toStore: event.target.checked }))
                        }
                     />
                  </div>
               </TabPanel>
            </TabsBody>
         </Tabs>
      </Form>
   );
};
