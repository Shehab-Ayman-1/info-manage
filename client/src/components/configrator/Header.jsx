import { useTranslation } from "react-i18next";
import { Typography } from "@material-tailwind/react";

export const Header = () => {
   const [text, i18next] = useTranslation();

   return (
      <div className="head">
         <Typography variant="h3" className="text-black dark:text-white">
            {text("configrator-drawer-title")}
         </Typography>
      </div>
   );
};
