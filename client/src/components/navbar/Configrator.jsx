import { Button, Drawer, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export const Configrator = () => {
   const [open, setOpen] = useState(false);

   useEffect(() => {
      const mode = localStorage.getItem("mode") || "light";
      const theme = localStorage.getItem("theme") || "deep-purple";

      document.querySelector("html").setAttribute("data-theme", theme);
      document.querySelector("html").setAttribute("class", mode);
   }, []);

   const openDrawer = () => setOpen(true);
   const closeDrawer = () => setOpen(false);

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

   const colors = [
      { theme: "red", from: "from-red-400", to: "to-red-900", hover: "hover:bg-red-900/50" },
      { theme: "blue", from: "from-blue-400", to: "to-blue-900", hover: "hover:bg-blue-900/50" },
      { theme: "gray", from: "from-blue-gray-400", to: "to-blue-gray-900", hover: "hover:bg-gray-700/50" },
      { theme: "teal", from: "from-teal-400", to: "to-teal-900", hover: "hover:bg-teal-900/50" },
      { theme: "pink", from: "from-pink-400", to: "to-pink-900", hover: "hover:bg-pink-900/50" },
      { theme: "indigo", from: "from-indigo-400", to: "to-indigo-900", hover: "hover:bg-indigo-900/50" },
      {
         theme: "deep-orange",
         from: "from-deep-orange-400",
         to: "to-deep-orange-900",
         hover: "hover:bg-deep-orange-900/50",
      },
      { theme: "deep-purple", from: "from-purple-400", to: "to-purple-900", hover: "hover:bg-purple-900/50" },
   ];

   return (
      <div className="fixed">
         <IconButton
            color="deep-purple"
            variant="gradient"
            className="group !fixed bottom-10 right-10 rounded-full hover:scale-110"
            size="lg"
            onClick={openDrawer}
         >
            <i className="fa fa-gear text-2xl text-white group-hover:text-white/70" />
         </IconButton>
         <Drawer
            open={open}
            className={`bg-white p-5 dark:bg-darkGray ${open ? "min-w-[400px] max-w-full" : ""}`}
            placement="right"
            overlayProps={{ className: "cursor-pointer min-h-screen cursor-pointer" }}
            onClose={closeDrawer}
         >
            <div className="mb-6 flex items-center justify-between">
               <Typography variant="h5" className="text-dimWhite">
                  اعدادات العرض
               </Typography>
               <IconButton variant="text" color="deep-purple" onClick={closeDrawer} className="group">
                  <i className="fa fa-times text-2xl group-hover:text-primary" />
               </IconButton>
            </div>

            <div className="colors">
               <Typography variant="h3" color="deep-purple" className="mb-8 text-3xl">
                  اختر الثيم
               </Typography>
               <Typography className="mb-8 dark:text-blue-gray-500">
                  يمكنك اختيار نوع العرض الذي تفضله من هنا
               </Typography>
               <div className="flex-between">
                  {colors.map(({ theme, from, to, hover }, i) => (
                     <IconButton
                        key={i}
                        variant="text"
                        color="deep-purple"
                        onClick={() => handleChangeTheme(theme)}
                        className={`group hover:scale-125 ${hover}`}
                     >
                        <div
                           className={`h-5 w-5 cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br group-hover:scale-125 group-hover:brightness-125 ${from} ${to}`}
                        />
                     </IconButton>
                  ))}
               </div>
            </div>

            <div className="mode">
               <Typography variant="h3" color="deep-purple" className="my-8 text-3xl">
                  اختر المود
               </Typography>
               <Typography className="mb-8 dark:text-blue-gray-500">
                  يمكنك اختيار نوع المود الذي تفضله من هنا
               </Typography>
               <div className="flex-between">
                  <Button variant="gradient" onClick={() => handleChangeMode("dark")}>
                     Dark Mode
                  </Button>
                  <Button
                     variant="outlined"
                     color="deep-purple"
                     className="border-solid"
                     onClick={() => handleChangeMode("light")}
                  >
                     Light Mode
                  </Button>
               </div>
            </div>
         </Drawer>
      </div>
   );
};
