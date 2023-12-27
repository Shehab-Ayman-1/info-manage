import { Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Field, Form, MTDialog, Selectbox, Switch } from "@/components/public";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";
import { ADMIN } from "@/constants/users";

export const Profile = () => {
   const { companyId, productId } = useParams();
   const { user } = useSelector(({ users }) => users);
   const [text] = useTranslation();

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
      if (!companyId || !productId) return;

      (async () => {
         await refetch("get", `/products/get-profile/${companyId}/${productId}`);
      })();
   }, [companyId, productId]);

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
   const valueTypograph = `bg-dimPurple rounded-lg text-base pr-4 p-2 dark:text-dimWhite md:text-2xl`;

   return (
      <Form headerText={text("profile-title")}>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} />
         <Loading isSubmitted={eIsSubmitted} loading={eLoading} error={eError} message={editData} />
         <Loading isSubmitted={dIsSubmitted} loading={dLoading} error={dError} message={deleteData} to="/" />

         {data?.name && (
            <Fragment>
               <div className="w-full">
                  <img
                     src={data.img}
                     alt="profile"
                     className="object-cotain mx-auto block h-24 w-24 rounded-full shadow-sp md:h-32 md:w-32"
                  />
                  {user?.role === ADMIN ? (
                     <div className="flex-center mt-5 w-full !gap-6">
                        <i
                           className="fa fa-times hover:text-red-9 00 block text-xl text-red-500 sm:text-2xl lg:text-4xl"
                           onClick={handleDelete}
                        />
                        <i
                           className="fa fa-edit block text-xl text-orange-500 sm:text-2xl lg:text-4xl"
                           onClick={handleOpenDialog}
                        />
                     </div>
                  ) : null}
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                     {text("profile-name")}
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.name}
                  </Typography>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                     {text("profile-barcode")}
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.barcode}
                  </Typography>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                        {text("profile-purchase-price")}
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.buy} {text("pound")}
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                        {text("profile-sales-price")}
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.price.sale} {text("pound")}
                     </Typography>
                  </div>
               </div>

               <div className="flex-between">
                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                        {text("profile-store-count")}
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.store} {text("part")}
                     </Typography>
                  </div>

                  <div className="w-full">
                     <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                        {text("profile-shop-count")}
                     </Typography>
                     <Typography variant="h6" className={valueTypograph}>
                        {data.count.shop} {text("part")}
                     </Typography>
                  </div>
               </div>

               <div className="">
                  <Typography variant="h4" color="deep-purple" className="text-xl md:text-2xl">
                     {text("profile-suppliers")}
                  </Typography>
                  <Typography variant="h6" className={valueTypograph}>
                     {data.suppliers.length ? data.suppliers.join(" | ") : "----"}
                  </Typography>
               </div>
            </Fragment>
         )}

         <MTDialog
            headerText={text("profile-widget-title")}
            buttonText={text("profile-widget-btn")}
            open={openDialog}
            loading={eLoading || (eIsSubmitted && !eError && !editData?.warn)}
            handler={handleOpenDialog}
            onSubmit={handleSubmit}
         >
            <Field
               label={text("profile-widget-label")}
               containerStyle="mb-8"
               value={price.value}
               onChange={handleFieldChange}
            />

            <Selectbox
               label={text("profile-widget-switch-label")}
               options={[text("profile-widget-switch-buy"), text("profile-widget-switch-sale")]}
               value={price.process ? text("profile-widget-switch-buy") : text("profile-widget-switch-sale")}
               loading={!isSubmitted && loading}
               onChange={(value) =>
                  setPrice((data) => ({
                     ...data,
                     process: value === text("profile-widget-switch-buy") ? "buy" : "sale",
                  }))
               }
            />
         </MTDialog>
      </Form>
   );
};
