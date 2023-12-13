import { Typography, Button, Card, CardBody, CardHeader, CardFooter } from "@material-tailwind/react";

export const Form = ({
   headerText = "",
   buttonText = "",
   cardStyle = "",
   headerStyle = "",
   bodyStyle = "",
   footerStyle = "",
   loading = false,
   onSubmit = () => {},
   children,
   ...formRest
}) => {
   return (
      <form onSubmit={onSubmit} autoComplete="off" {...formRest}>
         <Card
            className={`dark:border-sp m-auto mb-2 mt-14 w-[650px] max-w-full bg-transparent shadow-sp dark:shadow-none md:mt-32 ${cardStyle}`}
         >
            <CardHeader
               variant="gradient"
               color="deep-purple"
               className={`mx-auto -mt-12 mb-4 grid h-20 w-[80%] place-items-center sm:h-28 ${headerStyle || ""}`}
            >
               <Typography variant="h3">{headerText}</Typography>
            </CardHeader>

            <CardBody className={`flex flex-col gap-4 ${bodyStyle}`}>{children}</CardBody>

            {buttonText && (
               <CardFooter className={`pt-0 ${footerStyle}`}>
                  <Button
                     type="submit"
                     variant="gradient"
                     disabled={loading}
                     color="deep-purple"
                     className="text-2xl hover:brightness-125"
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
