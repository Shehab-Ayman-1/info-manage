import { Card } from "@material-tailwind/react";
import { Fragment } from "react";

import { Pagination } from "@/components/ui";
import { Foot } from "./Foot";
import { Head } from "./Head";

export const Table = ({
   headers,
   pagination,
   footerTitle,
   footerSpan,
   total,
   tableStyle,
   activePage,
   setActivePage,
   children,
}) => {
   if (!children?.length && !children?.type) return;

   return (
      <Fragment>
         {pagination > 1 && (
            <Pagination activePage={activePage} setActivePage={setActivePage} pagination={pagination} />
         )}

         <Card
            className={`card-table-outfit dark:border-sp h-full w-full overflow-x-auto bg-transparent p-2 shadow-sp dark:shadow-none ${tableStyle}`}
         >
            <table className="w-full table-auto rounded-3xl dark:shadow-none">
               <Head headers={headers} />
               <tbody>{children}</tbody>
               {total ? <Foot footerTitle={footerTitle} footerSpan={footerSpan || [2, 2]} total={total} /> : null}
            </table>
         </Card>
      </Fragment>
   );
};
