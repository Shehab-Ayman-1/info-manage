import { Button, IconButton } from "@material-tailwind/react";

export const Pagination = ({ activePage, setActivePage, pagination }) => {
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
            className="flex-center p-0 text-xl text-primary"
            onClick={prev}
            disabled={activePage === 0}
         >
            <i className="fa fa-arrow-right text-primary" />
            <span className="hidden pb-3 md:inline">السابق</span>
         </Button>

         <div className="flex-center flex-wrap gap-2">
            {Array(pagination)
               .fill(1)
               .map((_, index) => (
                  <IconButton
                     variant={activePage === index ? "gradient" : "text"}
                     color="deep-purple"
                     className="h-8 w-8 text-xl font-bold hover:brightness-125"
                     key={index}
                     onClick={() => setActivePage(index)}
                  >
                     <span className="-mt-2 block">{index + 1}</span>
                  </IconButton>
               ))}
         </div>

         <Button
            variant="text"
            className="flex-center p-0 text-xl text-primary"
            onClick={next}
            disabled={activePage === pagination - 1}
         >
            <span className="hidden pb-3 md:inline">التالي</span>
            <i className="fa fa-arrow-left text-primary" />
         </Button>
      </div>
   );
};
