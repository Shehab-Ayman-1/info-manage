import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Favicon } from "@/assets";

export const Home = () => {
   const [text] = useTranslation();
   const navigate = useNavigate();

   return (
      <section className="flex-between flex-col text-center md:flex-row md:text-start">
         <div className="mt-10 h-full w-full">
            <Typography
               variant="h1"
               className="text-gradient pb-10 text-5xl font-extrabold sm:text-6xl md:text-8xl"
            >
               {text("home-title")}
            </Typography>

            <Typography variant="paragraph" className="text-xl text-black dark:text-white/50">
               {text("home-subtitle1")}
               <br />
               {text("home-subtitle2")}
            </Typography>

            <div className="flex-center flex-wrap md:justify-start">
               <Button
                  to="/show/store"
                  size="lg"
                  variant="gradient"
                  color="deep-purple"
                  className="mt-5 text-xl hover:brightness-125 rtl:pb-6"
                  onClick={() => navigate("/show/shop")}
               >
                  {text("home-shop-btn")}
               </Button>
               <Button
                  to="/show/store"
                  size="lg"
                  variant="outlined"
                  color="deep-purple"
                  className="border-sp mt-5 text-xl hover:brightness-125 rtl:pb-6"
                  onClick={() => navigate("/statements/sale")}
               >
                  {text("home-statement-btn")}
               </Button>
            </div>
         </div>

         <div className="hidden h-full w-full pt-10 md:block">
            <img src={Favicon} alt="logo" className="mx-auto block w-full max-w-[460px] object-contain" />
         </div>
      </section>
   );
};
