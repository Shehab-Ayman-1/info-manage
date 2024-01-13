import { Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Selectbox } from "@/components/ui";

const colors = [
   { theme: "red", from: "from-red-400", to: "to-red-900", hover: "hover:bg-red-900/50" },
   { theme: "pink", from: "from-pink-400", to: "to-pink-900", hover: "hover:bg-pink-900/50" },
   { theme: "orange", from: "from-orange-400", to: "to-orange-900", hover: "hover:bg-orange-900/50" },
   {
      theme: "deep-orange",
      from: "from-deep-orange-400",
      to: "to-deep-orange-900",
      hover: "hover:bg-deep-orange-900/50",
   },
   { theme: "indigo", from: "from-indigo-400", to: "to-indigo-900", hover: "hover:bg-indigo-900/50" },
   { theme: "blue", from: "from-blue-400", to: "to-blue-900", hover: "hover:bg-blue-900/50" },
   { theme: "deep-purple", from: "from-purple-400", to: "to-purple-900", hover: "hover:bg-purple-900/50" },
   { theme: "teal", from: "from-teal-400", to: "to-teal-900", hover: "hover:bg-teal-900/50" },
];

export const Configrator = () => {
   const [text, i18next] = useTranslation();

   const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
   const [open, setOpen] = useState(false);

   useLayoutEffect(() => {
      const theme = localStorage.getItem("theme") || "deep-purple";
      document.querySelector("html").setAttribute("data-theme", theme);

      const mode = localStorage.getItem("mode") || "light";
      document.querySelector("html").setAttribute("class", mode);
   }, []);

   useLayoutEffect(() => {
      i18next.changeLanguage(lang);
      localStorage.setItem("lang", lang);
      document.querySelector("html").setAttribute("dir", lang === "en" ? "ltr" : "rtl");
   }, [lang]);

   const openDrawer = () => {
      setOpen(true);
   };

   const closeDrawer = () => {
      setOpen(false);
   };

   const handleChangeLanguage = (value) => {
      if (i18next.language === "en") setLang(() => (value === "English" ? "en" : "ar"));
      if (i18next.language === "ar") setLang(() => (value === "انجليزي" ? "en" : "ar"));
      window.location.reload();
   };

   const handleChangeMode = (mode) => {
      document.querySelector("html").setAttribute("class", mode);
      localStorage.setItem("mode", mode);
      setOpen(false);
   };

   const handleChangeTheme = (theme) => {
      document.querySelector("html").setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
      setOpen(false);
   };

   return (
      <div className="fixed z-[1003]">
         <IconButton
            color="deep-purple"
            variant="gradient"
            size="lg"
            className={`group !fixed bottom-10 ${
               i18next.language === "en" ? "right-5 md:right-10" : "left-5 md:left-10"
            } rounded-full shadow-md hover:scale-125 print:hidden md:bottom-14`}
            onClick={openDrawer}
         >
            <i className="fa fa-gear fa-spin text-2xl text-white group-hover:text-white" />
         </IconButton>

         <Drawer
            placement={i18next.language === "en" ? "left" : "right"}
            open={open}
            className="bg-gradient flex-between flex-col overflow-y-auto p-5"
            onClose={closeDrawer}
         >
            <div className="head">
               <Typography variant="h3" className="text-black dark:text-white">
                  {text("configrator-drawer-title")}
               </Typography>
            </div>

            <div className="properties mt-8 w-full">
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
                        color="deep-purple"
                        onClick={() => handleChangeTheme(theme)}
                        className={`group px-3 hover:scale-125 ${hover}`}
                     >
                        <div
                           className={`h-6 w-6 cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br group-hover:scale-125 group-hover:brightness-125 ltr:h-7 ltr:w-7 ${from} ${to}`}
                        />
                     </Button>
                  ))}
               </div>
            </div>

            <div className="mode mt-8">
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
                     onClick={() => handleChangeMode("dark")}
                  >
                     Dark Mode
                  </Button>
                  <Button
                     size="lg"
                     variant="outlined"
                     color="deep-purple"
                     className="border-solid hover:brightness-125 ltr:text-base"
                     onClick={() => handleChangeMode("light")}
                  >
                     Light Mode
                  </Button>
               </div>
            </div>

            <div className="language mt-8">
               <Typography variant="h3" color="deep-purple" className="text-2xl leading-normal">
                  {text("configrator-display-language")}
               </Typography>
               <Typography className="mb-2 text-base leading-normal text-dimWhite">
                  {text("configrator-subTitle")}
               </Typography>
               <Selectbox
                  label={text("configrator-choose-language")}
                  value={lang}
                  options={[text("configrator-choose-language-ar"), text("configrator-choose-language-en")]}
                  onChange={handleChangeLanguage}
               />
            </div>
         </Drawer>
      </div>
   );
};
