import { Button, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";

import { colors } from "@/constants/configrator";

export const Colors = ({ onClose }) => {
   const [text, i18next] = useTranslation();

   useLayoutEffect(() => {
      const theme = localStorage.getItem("theme") || "deep-purple";
      document.querySelector("html").setAttribute("data-theme", theme);

      const mode = localStorage.getItem("mode") || "light";
      document.querySelector("html").setAttribute("class", mode);
   }, []);

   const onClick = (theme) => {
      document.querySelector("html").setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      onClose();
   };

   return (
      <div className="colors mt-8">
         <Typography variant="h3" color="deep-purple" className="text-2xl leading-normal">
            {text("configrator-theme-title")}
         </Typography>
         <Typography className="mb-2 text-base leading-normal text-dimWhite">
            {text("configrator-subTitle")}
         </Typography>
         <div className="flex-between flex-wrap">
            {colors.map(({ theme, from, to, hover }, i) => (
               <Button
                  key={i}
                  variant="text"
                  onClick={() => onClick(theme)}
                  className={`group px-1 hover:scale-125 ${hover}`}
               >
                  <div
                     className={`h-6 w-6 cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br group-hover:scale-125 group-hover:brightness-125 ltr:h-7 ltr:w-7 ${from} ${to}`}
                  />
               </Button>
            ))}
         </div>
      </div>
   );
};
