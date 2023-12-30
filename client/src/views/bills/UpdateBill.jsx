import { Button } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { InsertProduct, UpdateProduct, TableProducts, BillInfo } from "@/components/show/bills";
import { Form } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

const formState = {
   client: "",
   phone: "",
   date: "",
   toStore: false,
   pay: { completed: false, discount: "", value: "" },
   needToUpdate: { _id: "", name: "", price: "", count: "", inc: "" },
   products: [],
   insertedProducts: [],
   updatedProducts: [],
   deletedProducts: [],
};
export const UpdateBill = () => {
   const [text] = useTranslation();
   const { billId } = useParams();

   const [formData, setFormData] = useState(formState);
   const [openAddDialog, setOpenAddDialog] = useState(false);
   const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

   const { data, loading, error, isSubmitted } = useAxios("get", `/bills/get-bill/${billId}`);
   const { data: sData, loading: sLoading, error: sError, isSubmitted: sIsSubmitted, refetch } = useAxios();

   useEffect(() => {
      setFormData(() => ({ ...formState, ...data, toStore: data?.place === "store" }));
   }, [data]);

   const handleAddDialog = () => {
      setOpenAddDialog((open) => !open);
   };

   const handleUpdateDialog = (needToUpdate) => {
      if (needToUpdate) setFormData((data) => ({ ...data, needToUpdate }));
      setOpenUpdateDialog((open) => !open);
   };

   const handleSubmit = async (event) => {
      event.preventDefault();
      const { toStore, type, insertedProducts, updatedProducts, deletedProducts } = formData;

      if (!insertedProducts.length && !updatedProducts.length && !deletedProducts.length)
         return alert("لا يوجد اي تغيرات علي الفاتورة");

      const body = { toStore, type, insertedProducts, updatedProducts, deletedProducts };
      const { data, isSubmitted, error } = await refetch("put", `/bills/update-bill/${billId}`, body);

      if (isSubmitted || error || data?.warn) setTimeout(() => window.location.reload(), 5000);
   };

   const buttonProps = {
      variant: "gradient",
      color: "deep-purple",
      className: "mx-auto w-fit pb-5 text-xl hover:brightness-125 ltr:text-base",
      onClick: handleAddDialog,
   };

   return (
      <Form
         onSubmit={handleSubmit}
         headerText={text("updateBill-title")}
         buttonText={text("updateBill-submit")}
         loading={(sIsSubmitted && !sError && !sData?.warn) || sLoading}
      >
         <Loading isSubmitted={sIsSubmitted} loading={sLoading} error={sError} message={sData} to="/show/bills" />
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />

         <BillInfo formData={formData} />

         <Button {...buttonProps}>
            <i className="fa fa-plus mx-2 text-white hover:text-white" />
            {text("updateBill-add-btn")}
         </Button>

         <TableProducts formData={formData} setFormData={setFormData} handler={handleUpdateDialog} />

         <UpdateProduct
            formData={formData}
            setFormData={setFormData}
            open={openUpdateDialog}
            handler={handleUpdateDialog}
         />

         <InsertProduct
            formData={formData}
            setFormData={setFormData}
            open={openAddDialog}
            handler={handleAddDialog}
         />
      </Form>
   );
};
