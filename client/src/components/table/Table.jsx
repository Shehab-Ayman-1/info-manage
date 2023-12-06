import { Card } from "@material-tailwind/react";
import { Foot } from "./Foot";
import { Head } from "./Head";

export const Table = ({ headers, rows, footerTitle, footerSpan, total, children }) => {
   if (!rows?.length) return;

   return (
      <Card className="card-table-outfit h-full w-full overflow-x-auto">
         <table className="w-full table-auto">
            {rows?.length ? <Head headers={headers} /> : null}

            <tbody>{children}</tbody>

            {total ? (
               <Foot
                  rows={rows}
                  headers={headers}
                  footerTitle={footerTitle}
                  footerSpan={footerSpan || [2, 2]}
                  total={total}
               />
            ) : null}
         </table>
      </Card>
   );
};
