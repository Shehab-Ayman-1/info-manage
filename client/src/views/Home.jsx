import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const buttonStyle = "mt-5 rtl:pb-6 text-xl hover:brightness-125";
export const Home = () => {
   const [text] = useTranslation();
   const navigate = useNavigate();

   return (
      <section className="mt-10 flex h-full w-full flex-col items-center justify-center">
         <Typography variant="h1" className="text-gradient pb-10 text-5xl sm:text-6xl md:text-8xl">
            {text("home-title")}
         </Typography>

         <Typography variant="paragraph" className="text-center text-xl text-black dark:text-white/50">
            {text("home-subtitle1")}
            <br />
            {text("home-subtitle2")}
         </Typography>

         <div className="flex-center flex-wrap">
            <Button
               to="/show/store"
               size="lg"
               variant="gradient"
               color="deep-purple"
               className={`${buttonStyle}`}
               onClick={() => navigate("/show/shop")}
            >
               {text("home-shop-btn")}
            </Button>
            <Button
               to="/show/store"
               size="lg"
               variant="outlined"
               color="deep-purple"
               className={`border-sp ${buttonStyle}`}
               onClick={() => navigate("/statements/sale")}
            >
               {text("home-statement-btn")}
            </Button>
         </div>
      </section>
   );
};
