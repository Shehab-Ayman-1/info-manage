import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";

export const Form = ({
   headerText = "",
   buttonText = "",
   cardStyle = "",
   loading = false,
   onSubmit = () => {},
   children,
   ...formRest
}) => {
   return (
      <form onSubmit={onSubmit} autoComplete="off" {...formRest}>
         <Card className={`m-auto mb-2 mt-14 w-[650px] max-w-full bg-transparent shadow-sp md:mt-32 ${cardStyle}`}>
            <CardHeader
               variant="gradient"
               color="deep-purple"
               className="mb-4 grid h-20 place-items-center dark:text-black sm:h-28"
            >
               <Typography variant="h3">{headerText}</Typography>
            </CardHeader>

            <CardBody className="flex flex-col gap-4">{children}</CardBody>

            {buttonText && (
               <CardFooter className="pt-0">
                  <Button
                     type="submit"
                     variant="gradient"
                     disabled={loading}
                     color="deep-purple"
                     className="text-2xl dark:text-black"
                     fullWidth
                  >
                     {buttonText}
                  </Button>
               </CardFooter>
            )}
         </Card>
      </form>
   );
};
