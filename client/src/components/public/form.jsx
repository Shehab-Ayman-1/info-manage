import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";

export const Form = ({
   headerText = "",
   buttonText = "",
   cardStyle = "",
   loading = false,
   onSubmit,
   children,
}) => {
   return (
      <form onSubmit={onSubmit} className="p-5 md:p-0">
         <Card className={`m-auto mt-14 min-h-full w-96 max-w-full shadow-sp md:mt-32 ${cardStyle}`}>
            <CardHeader variant="gradient" color="deep-purple" className="mb-4 grid h-28 place-items-center">
               <Typography variant="h3" color="white">
                  {headerText}
               </Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">{children}</CardBody>

            <CardFooter className="pt-0">
               <Button
                  type="submit"
                  variant="gradient"
                  disabled={loading}
                  color="deep-purple"
                  className="text-2xl"
                  fullWidth
               >
                  {buttonText}
               </Button>
            </CardFooter>
         </Card>
      </form>
   );
};
