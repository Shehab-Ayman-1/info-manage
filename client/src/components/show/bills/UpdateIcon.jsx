import { IconButton } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export const UpdateIcon = ({ id }) => {
   const navigate = useNavigate();

   return (
      <IconButton
         variant="text"
         color="orange"
         className="group h-7 w-7 md:h-10 md:w-10"
         onClick={() => navigate(`/bills/update-bill/${id}`)}
      >
         <i className="fa fa-edit text-base text-orange-500 group-hover:text-orange-900 md:text-xl" />
      </IconButton>
   );
};
