import { Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useLayoutEffect, useState } from "react";

import { Selectbox } from "@/components/ui";

export const Languages = () => {
   const [text, i18next] = useTranslation();
   const [language, setLanguage] = useState(localStorage.getItem("language") || "en");

   useLayoutEffect(() => {
      i18next.changeLanguage(language);
      localStorage.setItem("language", language);
      document.querySelector("html").setAttribute("dir", language === "en" ? "ltr" : "rtl");
   }, [language]);

   const onChange = (value) => {
      if (i18next.language === "en") setLanguage(() => (value === "English" ? "en" : "ar"));
      if (i18next.language === "ar") setLanguage(() => (value === "انجليزي" ? "en" : "ar"));
      window.location.reload();
   };

   return (
      <div className="">
         <Typography variant="h3" color="deep-purple" className="text-2xl leading-normal">
            {text("configrator-display-language")}
         </Typography>
         <Typography className="text-base leading-normal text-dimWhite">{text("configrator-subTitle")}</Typography>
         <Selectbox
            label={text("configrator-choose-language")}
            value={language}
            containerStyle="mt-0"
            options={[text("configrator-choose-language-ar"), text("configrator-choose-language-en")]}
            onChange={onChange}
         />
      </div>
   );
};
