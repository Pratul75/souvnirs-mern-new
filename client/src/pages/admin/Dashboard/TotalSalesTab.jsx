import {
  Tabs,
  DashboardChartCart,
  DashboardPieChartCard,
} from "../../../components";
import { Bar } from "react-chartjs-2";
import { data, options } from "../../../components/Charts/BarChart";
import {
  TotalSalesBlack,
  RevenueIconBlack,
  AbandomCartBlack,
  AdsSpentBlack,
  BlueIncomeIcon,
  SalesRedIcon,
} from "../../../icons";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
import SalesJpgImage from "../../../assets/salesJpgImage.jpg";
const TotalSalesTab = () => {
  const [chartData, setChartData] = useState();
  const [dateLabels, setDateLables] = useState();
  const [monthLabels, setMonthLables] = useState();
  const [yearLabels, setYearLables] = useState();
  const [dateData, setDateData] = useState();
  const [monthData, setMonthData] = useState();
  const [yearData, setYearData] = useState();

  const [totalSales, setTotalSales] = useState();
  console.log(chartData);

  const getBarChartData = async () => {
    const response = await API_WRAPPER.get("/dashboard/barchart");
    console.log("TotalSalesTab.jsx", response.data);
    setChartData(response.data);
    setDateLables(response.data.dateData.labels);
    setDateData(response.data.dateData.counts);
    setMonthLables(response.data.monthData.labels);
    setMonthData(response.data.monthData.counts);
    setYearLables(response.data.yearData.labels);
    setYearData(response.data.yearData.counts);
    setTotalSales(response.data.totalSales);
  };
  console.log("TotalSalesTab.jsx", dateData);

  useEffect(() => {
    getBarChartData();
  }, []);

  const tabs = [
    {
      label: "By year",
      content: (
        <div className="flex  gap-4">
          <div className="col-span-3 md:col-span-2 flex flex-1">
            <div style={{ width: "100%" }}>
              {yearData && yearLabels && (
                <Bar
                  options={options}
                  data={{
                    labels: yearLabels,
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: yearData,
                        backgroundColor: "#4C62C3",
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <img className="w-60" src={SalesJpgImage} alt="sales img" />
          </div>

          <div className="flex-1 md:col-span-1 flex flex-col justify-center ">
            <div className="grid grid-cols-2 gap-4 mr-5">
              <div className="col-span-1">
                <div className="flex flex-col gap-4">
                  <DashboardPieChartCard
                    label="Income"
                    addAmount="$76,745"
                    labelColor="bg-blue-500"
                    amount="$3421"
                    icon={<BlueIncomeIcon />}
                  />
                  <DashboardPieChartCard
                    label="Sales"
                    addAmount="$76,745"
                    labelColor="bg-orange-500"
                    amount="$3421"
                    icon={<SalesRedIcon />}
                  />
                </div>
              </div>

              <div className="col-span-1">
                <div className="col-span-1">
                  <div className="flex flex-col gap-4">
                    <DashboardPieChartCard
                      label="Income"
                      addAmount="$76,745"
                      labelColor="bg-blue-500"
                      amount="$3421"
                      icon={<BlueIncomeIcon />}
                    />
                    <DashboardPieChartCard
                      label="Sales"
                      addAmount="$76,745"
                      labelColor="bg-orange-500"
                      amount="$3421"
                      icon={<SalesRedIcon />}
                    />
                  </div>
                </div>
              </div>

              {/* <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount={`${totalSales}`}
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
              /> */}
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By Month",
      content: (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2 flex">
            {/* Use flexbox for equal heights */}
            {/* Set the height of the parent container */}
            <div style={{ width: "600px", height: "250px" }}>
              {monthData && monthLabels && (
                <Bar
                  options={options}
                  data={{
                    labels: monthLabels,
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: monthData,
                        backgroundColor: "#4C62C3",
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
          <div className=" col-span-3 md:col-span-1 flex flex-col justify-center ">
            {/* Use flexbox for equal heights */}
            <div className="bg-base-100">
              <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount={`${totalSales}`}
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
      label: "By week",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-3 md:col-span-1 flex">
            {/* Use flexbox for equal heights */}
            {/* Set the height of the parent container */}
            <div style={{ width: "600px", height: "250px" }}>
              {dateData && dateLabels && (
                <Bar
                  options={options}
                  data={{
                    labels: dateLabels,
                    datasets: [
                      {
                        label: "Dataset 1",
                        data: dateData,
                        backgroundColor: "#4C62C3",
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
          <div className="col-span-3 md:col-span-1 flex flex-col justify-center ">
            {/* Use flexbox for equal heights */}
            <div className="bg-base-100">
              <DashboardChartCart
                SvgIcon={<TotalSalesBlack />}
                label="Total Sales"
                percentage="30.6%"
                totalAmount={`${totalSales}`}
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
      <Tabs enableBorder tabs={tabs} />
    </div>
  );
};

export default TotalSalesTab;
