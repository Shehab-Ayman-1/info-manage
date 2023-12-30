import { useParams } from "react-router-dom";
import { Fragment } from "react";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const DeleteProfile = () => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();
   const { companyId, productId } = useParams();

   const handleSubmit = async () => {
      const confirm = window.confirm("هل انت متاكد من حذف هذا المنتج");
      if (!confirm) return;
      await refetch("delete", `/products/delete-product/${companyId}/${productId}`);
      setTimeout(() => window.location.reload(), 5000);
   };

   return (
      <Fragment>
         <Loading isSubmitted={isSubmitted} loading={loading} error={error} message={data} to="/" />
         <i
            className="fa fa-times block text-xl text-red-500 hover:text-red-900 sm:text-2xl lg:text-4xl"
            onClick={handleSubmit}
         />
      </Fragment>
   );
};
