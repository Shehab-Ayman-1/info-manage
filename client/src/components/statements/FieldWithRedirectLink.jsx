import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export const FieldWithRedirectLink = ({ path, redirectTo, children }) => {
   return (
      <div className="flex w-full items-end gap-x-4">
         {children}

         {redirectTo && (
            <Link to={path} state={{ redirectTo }}>
               <Button variant="gradient" size="sm" color="deep-purple" className="items-end p-2">
                  <i className="fa fa-plus text-white hover:text-white" />
               </Button>
            </Link>
         )}
      </div>
   );
};
