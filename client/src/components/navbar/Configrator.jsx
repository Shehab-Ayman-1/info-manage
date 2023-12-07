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
      { theme: "deep-purple", from: "from-purple-400", to: "to-purple-900" },
      { theme: "red", from: "from-red-400", to: "to-red-900" },
      { theme: "blue", from: "from-blue-400", to: "to-blue-900" },
      { theme: "gray", from: "from-blue-gray-400", to: "to-blue-gray-900" },
      { theme: "green", from: "from-green-400", to: "to-green-900" },
      { theme: "orange", from: "from-orange-400", to: "to-orange-900" },
      { theme: "pink", from: "from-pink-400", to: "to-pink-900" },
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
            className="bg-white p-5 dark:bg-darkGray"
            placement="right"
            overlayProps={{ className: "cursor-pointer min-h-screen" }}
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
                  {colors.map(({ theme, from, to }, i) => (
                     <IconButton
                        key={i}
                        variant="text"
                        color="deep-purple"
                        onClick={() => handleChangeTheme(theme)}
                        className="group"
                     >
                        <div
                           className={`h-5 w-5 cursor-pointer rounded-full border border-solid border-black bg-gradient-to-br hover:scale-110 ${from} ${to}`}
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
