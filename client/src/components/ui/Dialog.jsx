import { Dialog, DialogBody, DialogHeader, Typography, DialogFooter, Button } from "@material-tailwind/react";

export const MTDialog = ({
   headerText = "",
   buttonText = "",
   open = false,
   loading = false,
   handler,
   onSubmit,
   children,
}) => {
   return (
      <Dialog
         open={open}
         size="md"
         handler={handler}
         className="bg-gradient max-h-[80vh] overflow-y-auto shadow-sp"
      >
         <DialogHeader className="flex-between">
            <Typography variant="h3" color="deep-purple">
               {headerText}
            </Typography>
            <i className="fa fa-times text-2xl" onClick={() => handler()} />
         </DialogHeader>

         <DialogBody>{children}</DialogBody>

         <DialogFooter>
            <Button
               color="deep-purple"
               className="text-base hover:brightness-125 md:text-xl"
               disabled={loading}
               fullWidth
               onClick={onSubmit}
            >
               {buttonText}
            </Button>
         </DialogFooter>
      </Dialog>
   );
};
