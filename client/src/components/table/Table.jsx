import { Button, Card, IconButton } from "@material-tailwind/react";
import { Foot } from "./Foot";
import { Head } from "./Head";
import { Pagination } from "../public";

export const Table = ({
   headers,
   rowsLength,
   footerTitle,
   footerSpan,
   total,
   tableStyle,
   activePage,
   setActivePage,
   children,
}) => {
   if (!rowsLength) return;

   const next = () => {
      if (activePage === rowsLength) return;
      setActivePage(activePage + 1);
   };

   const prev = () => {
      if (activePage === 0) return;
      setActivePage(activePage - 1);
   };

   return (
      <Card
         className={`card-table-outfit dark:border-sp h-full w-full overflow-x-auto bg-transparent p-2 shadow-sp dark:shadow-none ${tableStyle}`}
      >
         <table className="w-full table-auto rounded-3xl dark:shadow-none">
            <Head headers={headers} />

            <tbody>{children}</tbody>

            {total ? <Foot footerTitle={footerTitle} footerSpan={footerSpan || [2, 2]} total={total} /> : null}
         </table>

         <Pagination
            activePage={activePage}
            setActivePage={setActivePage}
            rowsLength={rowsLength}
            next={next}
            prev={prev}
         />
      </Card>
   );
};
