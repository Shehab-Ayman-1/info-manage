import { Tooltip, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Footer = () => {
   const [text, i18next] = useTranslation();
   const placement = i18next.language === "en" ? "left" : "right";

   return (
      <footer className="flex-between w-full flex-col p-4 text-xl print:hidden md:flex-row">
         <Typography variant="h5" className="flex-start text-dimWhite">
            {text("footerCreator")}
         </Typography>

         <div className="flex-center my-2 gap-5">
            <Tooltip content="Facebook" placement={placement}>
               <i className="fab fa-facebook-f" />
            </Tooltip>
            <Tooltip content="Instagram" placement={placement}>
               <i className="fab fa-instagram" />
            </Tooltip>
            <Tooltip content="Twitter" placement={placement}>
               <i className="fab fa-twitter" />
            </Tooltip>
            <Tooltip content="Youtube" placement={placement}>
               <i className="fab fa-youtube" />
            </Tooltip>
         </div>
      </footer>
   );
};
