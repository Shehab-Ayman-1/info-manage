import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Screen = () => {
   const [text, i18next] = useTranslation();

   return (
      <div className="w-full">
         <Typography variant="h3" color="deep-purple" className="text-2xl leading-normal">
            {text("configrator-properties-title")}
         </Typography>
         <div className="">
            <Typography className="mb-2 text-base leading-normal text-dimWhite">
               Width: {screen.availWidth} px
            </Typography>
            <Typography className="mb-2 text-base leading-normal text-dimWhite">
               Height: {screen.availHeight} px
            </Typography>
         </div>
      </div>
   );
};
