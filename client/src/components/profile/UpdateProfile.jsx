import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Field, MTDialog, Selectbox } from "@/components/ui";
import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const UpdateProfile = ({ setData }) => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   const [price, setPrice] = useState({ process: "sale", value: "" });
   const [openDialog, setOpenDialog] = useState(false);
   const { companyId, productId } = useParams();

   const handleOpenDialog = () => {
      setOpenDialog((open) => !open);
   };

   const handleSubmit = async () => {
      await refetch("put", `/products/edit-price/${companyId}/${productId}`, price);
      setData((data) => ({ ...data, price: { ...data.price, [price.process]: price.value } }));
      setOpenDialog(false);
   };

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} />
         <i
            className="fa fa-edit block text-xl text-orange-500 sm:text-2xl lg:text-4xl"
            onClick={handleOpenDialog}
         />
         <MTDialog
            headerText={text("profile-widget-title")}
            buttonText={text("profile-widget-btn")}
            open={openDialog}
            loading={loading || (isSubmitted && !error && !data?.warn)}
            handler={handleOpenDialog}
            onSubmit={handleSubmit}
         >
            <Field
               label={text("profile-widget-label")}
               type="number"
               min="0"
               containerStyle="mb-8"
               value={price.value}
               onChange={(event) => setPrice((data) => ({ ...data, value: event.target.value }))}
            />

            <Selectbox
               label={text("profile-widget-switch-label")}
               options={[text("profile-widget-switch-buy"), text("profile-widget-switch-sale")]}
               value={price.process ? text("profile-widget-switch-buy") : text("profile-widget-switch-sale")}
               onChange={(value) =>
                  setPrice((data) => ({
                     ...data,
                     process: value === text("profile-widget-switch-buy") ? "buy" : "sale",
                  }))
               }
            />
         </MTDialog>
      </Fragment>
   );
};
