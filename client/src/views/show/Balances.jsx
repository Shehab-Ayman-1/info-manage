import { Card } from "@material-tailwind/react";
import { BalancesInfo } from "@/components/show/balances";

export const ShowBalances = () => {
   return (
      <Card className="rounded-none bg-transparent">
         <BalancesInfo price="buy" title="balances-buy-title" />
         <BalancesInfo price="sale" title="balances-sale-title" />
      </Card>
   );
};
