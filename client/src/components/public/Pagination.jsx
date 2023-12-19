import { Button, IconButton } from "@material-tailwind/react";

export const Pagination = ({ activePage, setActivePage, rowsLength, prev, next }) => {
   return (
      <div className={`flex-center my-5 ${activePage >= 0 ? "" : "!hidden"}`}>
         <Button
            variant="text"
            className="flex-center text-xl dark:text-white"
            onClick={prev}
            disabled={activePage === 0}
         >
            <i className="fa fa-arrow-right text-black dark:text-white" />
            <span className="pb-3">السابق</span>
         </Button>

         <div className="flex items-center gap-2">
            {Array(rowsLength)
               .fill(1)
               .map((_, index) => (
                  <IconButton
                     variant={activePage === index ? "gradient" : "text"}
                     color={"deep-purple"}
                     className="text-xl font-bold hover:brightness-125"
                     key={index}
                     onClick={() => setActivePage(index)}
                  >
                     {index + 1}
                  </IconButton>
               ))}
         </div>

         <Button
            variant="text"
            className="flex-center text-xl dark:text-white"
            onClick={next}
            disabled={activePage === rowsLength - 1}
         >
            <span className="pb-3">التالي</span>
            <i className="fa fa-arrow-left text-black dark:text-white" />
         </Button>
      </div>
   );
};
