import { Tooltip, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { Favicon } from "@/assets";

export const Footer = () => {
   const [text, i18next] = useTranslation();
   const placement = i18next.language === "en" ? "left" : "right";

   return (
      <footer className="flex-between bg-gradient w-full flex-col p-4 text-xl md:flex-row">
         <Typography variant="h5" color="deep-purple" className="flex-start">
            <img src={Favicon} alt="logo" className="h-8 w-8" />
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
