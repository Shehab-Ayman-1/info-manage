import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

import { Field, Form, Switch } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const ProductProfile = () => {
   const { companyId, productId } = useParams();
   const [openDialog, setOpenDialog] = useState(false);
   const [price, setPrice] = useState({ process: "sale", value: "" });
   const { data, setData, loading, error, isSubmitted, refetch } = useAxios();
   const {
      data: editData,
      loading: eLoading,
      error: eError,
      isSubmitted: eIsSubmitted,
      refetch: eRefetch,
   } = useAxios();
   const {
      data: deleteData,
      loading: dLoading,
      error: dError,
      isSubmitted: dIsSubmitted,
      refetch: dRefetch,
   } = useAxios();

   useEffect(() => {
      if (!companyId || !productId || data) return;

      (async () => {
         await refetch("get", `/products/get-profile/${companyId}/${productId}`);
      })();
   }, []);

   const handleFieldChange = (event) => {
      setPrice((price) => ({ ...price, value: event.target.value }));
   };

   const handleOpenDialog = () => {
      setOpenDialog((open) => !open);
   };

   const handleSubmit = async () => {
      await eRefetch("put", `/products/edit-price/${companyId}/${productId}`, price);
      setOpenDialog(false);
      setData((data) => ({ ...data, price: { ...data.price, [price.process]: price.value } }));
   };

   const handleDelete = async () => {
      const confirm = window.confirm("هل انت متاكد من حذف هذا المنتج");
      if (!confirm) return;
      await dRefetch("delete", `/products/delete-product/${companyId}/${productId}`);
      setTimeout(() => window.location.reload(), 5000);
   };

   if (isSubmitted && error) return <Loading isSubmitted={isSubmitted} loading={loading} error={error} />;
   const valueTypograph = `bg-dimPurple rounded-lg text-xl pr-4 p-2 dark:text-blue-gray-500`;

   return (
      <Form headerText="عرض منتج">
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} />
         <Loading isSubmitted={eIsSubmitted} loading={eLoading} error={eError} message={editData} />
         <Loading isSubmitted={dIsSubmitted} loading={dLoading} error={dError} message={deleteData} to="/" />

         {data?.name && (
            <Fragment>
               <div className="w-full">
                  <img
                     src={data.img}
                     alt="profile"
                     className="object-cotain mx-auto block h-32 w-32 rounded-full shadow-sp"
                  />
                  <div className="flex-center mt-5 w-full !gap-6">
                     <i
                        className="fa fa-times block text-4xl text-red-500 hover:text-red-900"
                        onClick={handleDelete}
                     />
                     <i className="fa fa-edit block text-4xl text-orange-500" onClick={handleOpenDialog} />
                  </div>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الاسم
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.name}
                  </Typography>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الباركود
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.barcode}
                  </Typography>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        سعر الشراء
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.buy} جنية
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        سعر البيع
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.sale} جنية
                     </Typography>
                  </div>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        عدد المخزن
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.store} قطعة
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple">
                        عدد المحل
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.shop} قطعة
                     </Typography>
                  </div>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple">
                     الموردين
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.suppliers.length ? data.suppliers.join(" | ") : "لا يوجد"}
                  </Typography>
               </div>
            </Fragment>
         )}

         <Dialog
            open={openDialog}
            size="md"
            handler={handleOpenDialog}
            className="max-h-[80vh] overflow-y-auto shadow-sp dark:bg-darkGray"
         >
            <DialogHeader className="flex-between">
               <Typography variant="h2" color="deep-purple">
                  تعديل سعر المنتج
               </Typography>
               <i className="fa fa-times text-2xl" onClick={handleOpenDialog} />
            </DialogHeader>

            <DialogBody>
               <Field
                  label="سعر المنتج الجديد"
                  containerStyle="mb-8"
                  value={price.value}
                  onChange={handleFieldChange}
               />
               <Switch
                  label={price.process === "buy" ? "تعديل سعر الشراء" : "تعديل سعر البيع"}
                  checked={price.process === "buy"}
                  onChange={(e) => setPrice((data) => ({ ...data, process: e.target.checked ? "buy" : "sale" }))}
               />
            </DialogBody>

            <DialogFooter>
               <Button
                  color="deep-purple"
                  className="text-xl dark:text-black"
                  disabled={eLoading || (eIsSubmitted && !eError)}
                  fullWidth
                  onClick={handleSubmit}
               >
                  تعديل
               </Button>
            </DialogFooter>
         </Dialog>
      </Form>
   );
};
