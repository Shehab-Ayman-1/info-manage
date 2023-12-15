import { Card, CardBody, CardHeader, Typography } from "@material-tailwind/react";
import ApexChart from "react-apexcharts";

const chartConfig = ({ type = "bar", series, categories }) => ({
   type,
   height: 240,
   // series Put Here
   series: [{ name: series?.name, data: series?.data }],
   options: {
      chart: { toolbar: { show: false } },
      title: { show: "" },
      dataLabels: { enabled: true, style: { fontSize: 14 } },
      colors: ["var(--primary)"],
      stroke: { lineCap: "round", curve: "smooth" },
      markers: { size: 0 },
      xaxis: {
         axisTicks: { show: false },
         axisBorder: { show: false },
         labels: {
            style: { colors: "#fff", fontSize: "16px", fontFamily: "inherit", fontWeight: 400 },
         },
         // categories Put Here
         categories,
      },
      yaxis: {
         labels: {
            style: { colors: "#fff", fontSize: "16px", fontFamily: "inherit", fontWeight: 400 },
         },
      },
      grid: {
         show: true,
         borderColor: "#ddd",
         strokeDashArray: 5,
         xaxis: { lines: { show: true } },
         padding: { top: 5, right: 20 },
      },
      fill: { opacity: 0.8 },
      tooltip: { theme: "dark" },
   },
});

export const Chart = ({ className, head, description, icon, data }) => {
   if (!data?.categories || !data?.series.data) return;
   return (
      <Card className={`mx-auto my-5 w-full max-w-[600px] rounded-2xl bg-dimPurple ${className}`}>
         <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
         >
            <div className="w-max rounded-lg bg-primary p-5">
               <i className={`fa ${icon} text-3xl text-white transition hover:rotate-180 hover:text-white`} />
            </div>
            <div>
               <Typography variant="h4" color="white">
                  {head}
               </Typography>
               <Typography variant="small" className="max-w-sm font-normal text-dimWhite">
                  {description}
               </Typography>
            </div>
         </CardHeader>
         <CardBody className="px-2 pb-0">
            <ApexChart {...chartConfig(data)} />
         </CardBody>
      </Card>
   );
};
