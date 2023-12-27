import { Button, IconButton } from "@material-tailwind/react";
import { useTranslation } from "react-i18next";

export const Pagination = ({ activePage, setActivePage, pagination }) => {
   const [text, i18next] = useTranslation();

   const next = () => {
      if (activePage === pagination) return;
      setActivePage(activePage + 1);
   };

   const prev = () => {
      if (activePage === 0) return;
      setActivePage(activePage - 1);
   };

   return (
      <div className="flex-center my-5 flex-wrap">
         <Button
            variant="text"
            className="flex-center p-0 text-xl text-primary hover:bg-blue-gray-400/20 hover:brightness-125 ltr:text-base"
            onClick={prev}
            disabled={activePage === 0}
         >
            <i className={`fa ${i18next.language === "en" ? "fa-arrow-left" : "fa-arrow-right"} text-primary`} />
            <span className="hidden pb-3 ltr:pb-1 md:inline">{i18next.language === "en" ? "prev" : "السابق"}</span>
         </Button>

         <div className="flex-center flex-wrap">
            {Array(pagination > 10 ? 10 : pagination)
               .fill(1)
               .map((_, index) => (
                  <IconButton
                     variant={activePage === index ? "gradient" : "text"}
                     color="deep-purple"
                     className="h-8 w-8 text-xl font-bold hover:bg-blue-gray-400/20 hover:brightness-125"
                     key={index}
                     onClick={() => setActivePage(index)}
                  >
                     <span className="block md:-mt-2">{index + 1}</span>
                  </IconButton>
               ))}

            <IconButton
               variant="text"
               color="deep-purple"
               className={`h-8 w-8 text-xl font-bold ${pagination > 10 ? "" : "hidden"}`}
            >
               <span className="-mt-2 block whitespace-nowrap">- - - -</span>
            </IconButton>
         </div>

         <Button
            variant="text"
            className="flex-center p-0 text-xl text-primary hover:bg-blue-gray-400/20 hover:brightness-125 ltr:text-base"
            onClick={next}
            disabled={activePage === pagination - 1}
         >
            <span className="hidden pb-3 ltr:pb-1 md:inline">{i18next.language === "en" ? "next" : "التالي"}</span>
            <i className={`fa ${i18next.language === "en" ? "fa-arrow-right" : "fa-arrow-left"} text-primary`} />
         </Button>
      </div>
   );
};
