import { Tabs, DashboardChartCart } from "../../../components";
import { Bar } from "react-chartjs-2";
import { data, options } from "../../../components/Charts/BarChart";
import {
  TotalSalesBlack,
  RevenueIconBlack,
  AbandomCartBlack,
  AdsSpentBlack,
} from "../../../icons";

const TotalSalesTab = () => {
  const tabs = [
    {
      label: "Total Sales",
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex">
            <div style={{ width: "100%", height: "100%" }}>
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-center ">
            <div className="bg-base-100">
              <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount="1,800"
                dynamicAmount="-245"
                percentageColor="text-red-500"
              />
              <DashboardChartCart
                SvgIcon={<RevenueIconBlack />}
                label="Revenue"
                percentage="30.6%"
                totalAmount="$5667"
                dynamicAmount="+$2100"
                percentageColor="text-green-500"
              />
              <DashboardChartCart
                SvgIcon={<AbandomCartBlack />}
                label="Total Sales"
                percentage="5%"
                totalAmount="128"
                dynamicAmount="-26"
                percentageColor="text-yellow-500"
              />
              <DashboardChartCart
                SvgIcon={<AdsSpentBlack />}
                label="Ads Spent"
                percentage="10.6%"
                totalAmount="$2500"
                dynamicAmount="$200"
                percentageColor="text-red-500"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By Month",
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex">
            {/* Use flexbox for equal heights */}
            {/* Set the height of the parent container */}
            <div style={{ width: "100%", height: "100%" }}>
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-center ">
            {/* Use flexbox for equal heights */}
            <div className="bg-base-100">
              <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount="1,800"
                dynamicAmount="-245"
                percentageColor="text-red-500"
              />
              <DashboardChartCart
                SvgIcon={<RevenueIconBlack />}
                label="Revenue"
                percentage="30.6%"
                totalAmount="$5667"
                dynamicAmount="+$2100"
                percentageColor="text-green-500"
              />
              <DashboardChartCart
                SvgIcon={<AbandomCartBlack />}
                label="Total Sales"
                percentage="5%"
                totalAmount="128"
                dynamicAmount="-26"
                percentageColor="text-yellow-500"
              />
              <DashboardChartCart
                SvgIcon={<AdsSpentBlack />}
                label="Ads Spent"
                percentage="10.6%"
                totalAmount="$2500"
                dynamicAmount="$200"
                percentageColor="text-red-500"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By Year",
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex">
            {/* Use flexbox for equal heights */}
            {/* Set the height of the parent container */}
            <div style={{ width: "100%", height: "100%" }}>
              <Bar options={options} data={data} />
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-center ">
            {/* Use flexbox for equal heights */}
            <div className="bg-base-100">
              <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount="1,800"
                dynamicAmount="-245"
                percentageColor="text-red-500"
              />
              <DashboardChartCart
                SvgIcon={<RevenueIconBlack />}
                label="Revenue"
                percentage="30.6%"
                totalAmount="$5667"
                dynamicAmount="+$2100"
                percentageColor="text-green-500"
              />
              <DashboardChartCart
                SvgIcon={<AbandomCartBlack />}
                label="Total Sales"
                percentage="5%"
                totalAmount="128"
                dynamicAmount="-26"
                percentageColor="text-yellow-500"
              />
              <DashboardChartCart
                SvgIcon={<AdsSpentBlack />}
                label="Ads Spent"
                percentage="10.6%"
                totalAmount="$2500"
                dynamicAmount="$200"
                percentageColor="text-red-500"
              />
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default TotalSalesTab;
