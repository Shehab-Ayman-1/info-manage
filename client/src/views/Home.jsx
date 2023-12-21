import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
   const navigate = useNavigate();

   const buttonStyle = "mt-5 pb-5 text-xl hover:brightness-125";
   return (
      <section className="mt-10 flex h-full w-full flex-col items-center justify-center">
         <Typography variant="h1" className="text-gradient pb-10 text-6xl md:text-8xl">
            المركز الدولي
         </Typography>
         <Typography variant="paragraph" className="text-center text-2xl text-black dark:text-white/50">
            للتجارة والتوزيع وقطع غيار السيارات والنقل
            <br />
            وغسيل السيارات
         </Typography>
         <div className="flex-between mx-auto w-fit flex-wrap">
            <Button
               to="/show/store"
               size="sm"
               variant="gradient"
               color="deep-purple"
               className={`${buttonStyle}`}
               onClick={() => navigate("/show/shop")}
            >
               عرض منتجات المحل
            </Button>
            <Button
               to="/show/store"
               size="sm"
               variant="outlined"
               color="deep-purple"
               className={`border-sp ${buttonStyle}`}
               onClick={() => navigate("/statements/sale")}
            >
               كشف حساب
            </Button>
         </div>
      </section>
   );
};
