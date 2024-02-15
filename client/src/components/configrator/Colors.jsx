import { Button, Typography } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
import { useLayoutEffect } from "react";

const colors = [
   { theme: "silver", from: "from-gray-400", to: "to-gray-900", hover: "hover:bg-gray-900/50" },
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
   { theme: "deep-purple", from: "from-purple-400", to: "to-purple-900", hover: "hover:bg-purple-900/50" },
   { theme: "blue", from: "from-blue-400", to: "to-blue-900", hover: "hover:bg-blue-900/50" },
   { theme: "teal", from: "from-teal-400", to: "to-teal-900", hover: "hover:bg-teal-900/50" },
   { theme: "cyan", from: "from-cyan-400", to: "to-cyan-900", hover: "hover:bg-cyan-900/50" },
];

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
      <div className="">
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
                  color={theme === "silver" ? "gray" : theme}
                  onClick={() => onClick(theme)}
                  className={`group px-2 hover:scale-125 ${hover}`}
               >
                  <div
                     className={`${from} ${to} h-[22px] w-[22px] cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br group-hover:scale-125 group-hover:brightness-125`}
                  />
               </Button>
            ))}
         </div>
      </div>
   );
};
