import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Foot = ({ total, footerTitle, footerSpan: [colSpan1, colSpan2] }) => {
   const [text] = useTranslation();

   return (
      <tfoot>
         <tr className="border-t-sp bg-gradient-to-br from-primary-300 to-primary-900 text-center">
            <th colSpan={colSpan1} className="p-2 md:p-4">
               <Typography variant="h5" className="text-base text-white print:text-dimWhite md:text-xl">
                  {footerTitle || text("table-footer-title")}
               </Typography>
            </th>
            <th colSpan={colSpan2} className="p-2 text-center md:p-4">
               <Typography
                  variant="h5"
                  color="deep-purple"
                  className="text-base text-white print:text-dimWhite md:text-xl"
               >
                  {total?.toLocaleString() || "00,000"} <span className="text-lg">{text("pound")}</span>
               </Typography>
            </th>
         </tr>
      </tfoot>
   );
};
