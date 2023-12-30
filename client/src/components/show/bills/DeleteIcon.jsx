import { IconButton } from "@material-tailwind/react";
import { Fragment } from "react";

import { useAxios } from "@/hooks/useAxios";
import { Loading } from "@/layout/Loading";

export const DeleteIcon = ({ id, type, setData }) => {
   const { data, loading, error, isSubmitted, refetch } = useAxios();

   const handleDelete = async () => {
      const confirm = window.confirm("هل انت متاكد من حذف الفاتورة");
      if (!confirm) return;

      const { data, isSubmitted, error } = await refetch("delete", `/bills/delete-bill/${id}?type=${type}`);
      if (isSubmitted && (error || data?.warn)) return;

      setData((form) => {
         const data = form.data.filter((item) => item._id !== id);
         return { ...form, data };
      });
   };

   return (
      <Fragment>
         <Loading loading={loading} isSubmitted={isSubmitted} error={error} message={data} />
         <IconButton
            variant="text"
            color="red"
            className={`group h-7 w-7 md:h-10 md:w-10 ${loading ? "pointer-events-none" : ""}`}
            onClick={handleDelete}
         >
            <i className="fa fa-times text-base text-red-500 group-hover:text-red-900 md:text-xl" />
         </IconButton>
      </Fragment>
   );
};
