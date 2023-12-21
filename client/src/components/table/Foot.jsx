import { Typography } from "@material-tailwind/react";

export const Foot = ({ total, footerTitle, footerSpan: [colSpan1, colSpan2] }) => {
   return (
      <tfoot>
         <tr className="border-t-sp bg-primary-900">
            <th colSpan={colSpan1} className="p-2 md:p-4">
               <Typography
                  variant="h5"
                  className="text-center text-base text-white print:text-dimWhite md:text-xl"
               >
                  {footerTitle || "اجمالي البضائع"}
               </Typography>
            </th>
            <th colSpan={colSpan2} className="p-2 md:p-4">
               <Typography
                  variant="h5"
                  color="deep-purple"
                  className="text-center text-base text-white print:text-dimWhite md:text-xl"
               >
                  {total?.toLocaleString() || "00,000"} جنيه
               </Typography>
            </th>
         </tr>
      </tfoot>
   );
};
