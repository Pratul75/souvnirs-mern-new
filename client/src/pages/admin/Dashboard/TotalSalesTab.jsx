import { Tabs } from "../../../components";
import { Bar } from "react-chartjs-2";
import { options } from "../../../components/ui/Charts/BarChart";
import { useEffect, useState } from "react";
import API_WRAPPER from "../../../api";
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
    setChartData(response.data);
    setDateLables(response.data.dateData.labels);
    setDateData(response.data.dateData.counts);
    setMonthLables(response.data.monthData.labels);
    setMonthData(response.data.monthData.counts);
    setYearLables(response.data.yearData.labels);
    setYearData(response.data.yearData.counts);
    setTotalSales(response.data.totalSales);
  };
  console.log("TotalSalesTa..b.jsx===>", monthData, monthLabels);

  useEffect(() => {
    getBarChartData();
  }, []);

  const tabs = [
    {
      label: "By year",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            {yearData && yearLabels && (
              // display: block; box-sizing: border-box; height: 276px; width: 552px;
              <Bar
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  height: "276px",
                }}
                options={options}
                data={{
                  labels: yearLabels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: yearData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            )}
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>{chartData?.yearData?.totalYearsSells}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Sales</p>
                <p>{chartData?.totalSales}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Vendors</p>
                <p>340$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>340$</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By month",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            {/* // display: block; box-sizing: border-box; height: 276px; width: 552px; */}
            <div>
              <Bar
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  height: "276px",
                }}
                options={options}
                data={{
                  labels: monthLabels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: monthData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>{chartData?.monthData?.totalMothsSells}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Sales</p>
                <p>{chartData?.totalSales}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Vendors</p>
                <p>340$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>340$</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      label: "By week",
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 md:col-span-1">
            <div>
              {/* // display: block; box-sizing: dborder-box; height: 276px; width: 552px; */}
              <Bar
                style={{
                  display: "block",
                  boxSizing: "border-box",
                  height: "276px",
                }}
                options={options}
                data={{
                  labels: dateLabels,
                  datasets: [
                    {
                      label: "Revenue",
                      data: dateData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>{chartData?.dateData?.totalDateSells}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Sales</p>
                <p>{chartData?.totalSales}$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Vendors</p>
                <p>340$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Income</p>
                <p>340$</p>
              </div>
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
