import { Button, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Modes = ({ onClose }) => {
   const [text, i18next] = useTranslation();

   const onClick = (mode) => {
      document.querySelector("html").setAttribute("class", mode);
      localStorage.setItem("mode", mode);
      onClose();
   };

   return (
      <div className="">
         <Typography variant="h3" color="deep-purple" className="text-2xl leading-normal">
            {text("configrator-mode-title")}
         </Typography>
         <Typography className="mb-2 text-base leading-normal text-dimWhite">
            {text("configrator-subTitle")}
         </Typography>
         <div className="flex-between">
            <Button
               size="lg"
               variant="gradient"
               className="hover:brightness-125 ltr:text-base"
               onClick={() => onClick("dark")}
            >
               Dark Mode
            </Button>
            <Button
               size="lg"
               variant="outlined"
               color="deep-purple"
               className="border-solid hover:brightness-125 ltr:text-base"
               onClick={() => onClick("light")}
            >
               Light Mode
            </Button>
         </div>
      </div>
   );
};
