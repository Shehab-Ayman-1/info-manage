import { Card, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

import { useAxios } from "@/hooks";
import { Loading } from "@/layout";

export const ShowBalances = () => {
   const [text, i18next] = useTranslation();
   const { data, loading, error, isSubmitted } = useAxios("get", `/locker/get-total-cash`);

   return (
      <Card className="bg-transparent shadow-none">
         <Loading loading={loading} isSubmitted={isSubmitted} error={error} message={data} />

         <div className="flex-around fixed left-1/2 top-1/2 w-full max-w-[80%] -translate-x-1/2 -translate-y-1/2 flex-wrap rounded-md bg-deep-purple-500">
            <Typography variant="h4" className="p-4 text-white">
               {text("show-total-cash")}
            </Typography>
            <Typography variant="h4" className="p-4 text-white">
               {`${data?.toLocaleString() || 0} ${text("pound")}`}
            </Typography>
         </div>
      </Card>
   );
};
