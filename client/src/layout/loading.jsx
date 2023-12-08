import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Spinner, Alert, Progress } from "@material-tailwind/react";

export const Loading = ({ subLoading, isSubmitted, loading, error, message, to }) => {
   const [open, setOpen] = useState(true);
   const navigate = useNavigate();

   useEffect(() => {
      setOpen(true);

      setTimeout(
         () => {
            setOpen(() => false);
            isSubmitted && !error && !message?.warn && to && navigate(to);
         },
         message?.warn ? 5000 : 3000,
      );
   }, [isSubmitted, loading, error, message]);

   if (!isSubmitted && loading && !subLoading)
      return (
         <Fragment>
            <Progress className="loading-animate bg-primary" value={0} size="sm" />
            <Spinner className="fixed left-[45%] top-1/2 z-[1002] h-24 w-24" color="deep-purple" />;
         </Fragment>
      );

   if (!isSubmitted && loading && subLoading)
      return (
         <Fragment>
            <Spinner className="h-10 w-10" color="deep-purple" />;
         </Fragment>
      );

   if (isSubmitted && error)
      return (
         <Alert
            open={open}
            className="fixed left-1/2 top-28 z-[1002] w-[95%] max-w-screen-sm -translate-x-1/2 text-xl"
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
            className="fixed left-1/2 top-28 z-[1002] w-[95%] max-w-screen-sm -translate-x-1/2 text-xl"
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
            className="fixed left-1/2 top-28 z-[1002] w-[95%] max-w-screen-sm -translate-x-1/2 text-xl"
            color="green"
            onClose={() => setOpen(false)}
         >
            {message?.success || ""}
         </Alert>
      );
};
