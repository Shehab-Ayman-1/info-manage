import { Typography } from "@material-tailwind/react";

export const Home = () => {
   return (
      <section className="mt-10 flex h-full w-full flex-col items-center justify-center">
         <Typography variant="h1" color="deep-purple" className="mb-10 text-6xl md:text-8xl">
            المركز الدولي
         </Typography>
         <Typography variant="paragraph" className="text-center text-2xl text-white/50 md:text-3xl">
            للتجارة والتوزيع وقطع غيار السيارات والنقل
         </Typography>
         <Typography variant="paragraph" className="mt-3 text-center text-2xl text-white/50 md:text-3xl">
            وغسيل السيارات
         </Typography>
      </section>
   );
};
