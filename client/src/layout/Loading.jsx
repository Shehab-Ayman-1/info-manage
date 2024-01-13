import { Spinner, Alert, Progress, Typography } from "@material-tailwind/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Loading = ({ subLoading, hideSubLoadingText, isSubmitted, loading, error, message, to }) => {
   const [text] = useTranslation();
   const [open, setOpen] = useState(true);
   const navigate = useNavigate();
   let timeout;

   useEffect(() => {
      setOpen(true);

      const delay = message?.warn || message?.error ? 7000 : 3000;
      clearTimeout(timeout);

      timeout = setTimeout(() => {
         setOpen(() => false);
         isSubmitted && !error && !message?.warn && to && navigate(to);
      }, delay);
   }, [isSubmitted, error, message]);

   if (!isSubmitted && loading && !subLoading)
      return (
         <Fragment>
            <Progress className="animate-progress fixed left-0 top-0 z-[1000] bg-primary" value={0} size="sm" />
            <Spinner className="fixed left-[45%] top-1/2 z-[1002] h-16 w-16" color="deep-purple" />
         </Fragment>
      );

   if (subLoading)
      return (
         <Fragment>
            <Typography variant="h5" color="deep-purple" className={`ml-4 ${hideSubLoadingText ? "hidden" : ""}`}>
               {text("loading")}
            </Typography>
            <Spinner className="h-8 w-8" color="deep-purple" />
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
