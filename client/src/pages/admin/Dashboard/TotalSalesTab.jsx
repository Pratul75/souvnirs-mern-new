import { Tabs } from "../../../components";
import { Bar } from "react-chartjs-2";
import { options } from "../../../components/Charts/BarChart";
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
                      label: "Dataset 1",
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
                <p>340$</p>
              </div>
              <div className="flex items-center justify-center col-span-2 md:col-span-1 gap-2 p-4 bg-base-200 rounded-xl shadow-lg">
                <p>Total Sales</p>
                <p>360$</p>
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
            {monthData && monthLabels && (
              // display: block; box-sizing: border-box; height: 276px; width: 552px;
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
                      label: "Dataset 1",
                      data: monthData,
                      backgroundColor: "#697ed9",
                    },
                  ],
                }}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      label: "By week",
      content: (
        <div className="grid grid-cols-2">
          <div className="col-span-2 md:col-span-1">
            {dateData && dateLabels && (
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
