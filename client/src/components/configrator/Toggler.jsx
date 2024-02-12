import { IconButton } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Toggler = ({ onOpen }) => {
   const [text, i18next] = useTranslation();

   return (
      <IconButton
         color="deep-purple"
         variant="gradient"
         size="lg"
         onClick={onOpen}
         className={`group !fixed bottom-10 rounded-full shadow-md hover:scale-125 print:hidden md:bottom-14 ${
            i18next.language === "en" ? "left-5 md:left-10" : "right-5 md:right-10"
         }`}
      >
         <i className="fa fa-gear fa-spin text-2xl text-white group-hover:text-white" />
      </IconButton>
   );
};
