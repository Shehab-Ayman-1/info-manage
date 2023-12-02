import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner, Alert } from "@material-tailwind/react";

export const Loading = ({ isSubmitted, loading, error, message, to }) => {
   const [open, setOpen] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      setOpen(true);

      setTimeout(
         () => {
            setOpen(() => false);
            isSubmitted && !error && !message.warn && to && navigate(to);
         },
         message?.warn ? 5000 : 3000,
      );
   }, [isSubmitted, loading, error, message]);

   if (!isSubmitted && loading)
      return <Spinner className="fixed left-[45%] top-1/2 z-[1002] h-24 w-24" color="indigo" />;

   if (isSubmitted && error)
      return (
         <Alert
            open={open}
            className="fixed left-1/2 top-28 z-[1002] max-w-screen-sm -translate-x-1/2 text-xl"
            color="red"
            onClose={() => setOpen(false)}
         >
            {error || ""}
         </Alert>
      );

   if (isSubmitted && message?.warn)
      return (
         <Alert
            open={open}
            className="fixed left-1/2 top-28 z-[1002] max-w-screen-sm -translate-x-1/2 text-xl"
            color="amber"
            onClose={() => setOpen(false)}
         >
            {message?.warn || ""}
         </Alert>
      );

   if (isSubmitted && !error && message?.success)
      return (
         <Alert
            open={open}
            className="fixed left-1/2 top-28 z-[1002] max-w-screen-sm -translate-x-1/2 text-xl"
            color="green"
            onClose={() => setOpen(false)}
         >
            {message?.success || ""}
         </Alert>
      );
};
