import { Card } from "@material-tailwind/react";
import { Foot } from "./Foot";
import { Head } from "./Head";

export const Table = ({ headers, rowsLength, footerTitle, footerSpan, total, children }) => {
   if (!rowsLength) return;

   return (
      <Card className="card-table-outfit dark:border-sp h-full w-full overflow-x-auto bg-transparent p-2 shadow-sp dark:shadow-none">
         <table className="w-full table-auto rounded-3xl dark:shadow-none">
            <Head headers={headers} />

            <tbody>{children}</tbody>

            {total ? <Foot footerTitle={footerTitle} footerSpan={footerSpan || [2, 2]} total={total} /> : null}
         </table>
      </Card>
   );
};
