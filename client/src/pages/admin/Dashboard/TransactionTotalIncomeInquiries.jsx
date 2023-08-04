import { useEffect, useState } from "react";
import {
  Card,
  DashboardChartCart,
  DashboardPieChartCard,
  DoughnutChart,
  Tabs,
} from "../../../components";
import {
  BlueIncomeIcon,
  GrayVendors,
  GreenProductsIcon,
  SalesRedIcon,
} from "../../../icons";
import API_WRAPPER from "../../../api";

const TransactionTotalIncomeInquiries = () => {
  const [data, setData] = useState()
  const [labels, setLabels] = useState()
  const [fullData, setFullData] = useState()

  // TODO: need to add success and pending transaction based on the transaction status, map accordingly the DashboardChartCart Component

  const transactionTabs = [
    {
      label: "All Transactions",
      content: (
        <div className="max-h-[400px] overflow-y-scroll">
          <DashboardChartCart
            percentage="10.6%"
            percentageColor="text-red-500"
            label="Apple Inc"
            totalAmount="#APLE-PRO-T00232"
            iconText="AI"
            dynamicAmount="$2,800"
          />
          <DashboardChartCart
            percentage="10.6%"
            percentageColor="text-green-500"
            label="Apple Inc"
            totalAmount="#APLE-PRO-T00232"
            iconText="AI"
            dynamicAmount="$2,800"
          />
          <DashboardChartCart
            percentage="10.6%"
            percentageColor="text-green-500"
            label="Apple Inc"
            totalAmount="#APLE-PRO-T00232"
            iconText="AI"
            dynamicAmount="$2,800"
          />
          <DashboardChartCart
            percentage="10.6%"
            percentageColor="text-green-500"
            label="Apple Inc"
            totalAmount="#APLE-PRO-T00232"
            iconText="AI"
            dynamicAmount="$2,800"
          />
          <DashboardChartCart
            percentage="10.6%"
            percentageColor="text-green-500"
            label="Apple Inc"
            totalAmount="#APLE-PRO-T00232"
            iconText="AI"
            dynamicAmount="$2,800"
          />
        </div>
      ),
    },
    {
      label: "Success",
      content: "Success Content",
    },
    {
      label: "Pending",
      content: "Pending Content",
    },
  ];
  const getDoughnutChartData = async () => {
    const response = await API_WRAPPER.get("/dashboard/doughnutchart")
    console.log('TransactionTotalIncomeInquiries.jsx', response.data);
    Object.keys(response.data)
    setFullData(response.data)
    setLabels(Object.keys(response.data))
    setData(Object.values(response.data))
  }
  useEffect(() => {
    getDoughnutChartData()
  }, [])
  return (
    <div className="grid grid-cols-10 gap-4 mt-4">
      <div className="col-span-10 md:col-span-3 bg-base-100 border-[1px] border-base-300 rounded-xl p-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <Tabs tabs={transactionTabs} />
      </div>
      <div className="col-span-10 md:col-span-4">
        <Card>
          <div className="p-4 py-8">
            <h2 className="text-lg font-semibold">Total Income</h2>
            <div className="flex flex-col items-center">
              <div className="mt-4 md:mt-0">
                <DoughnutChart data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "# of Votes",
                      data: data,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.5)",
                        "rgba(54, 162, 235, 0.5)",
                        "rgba(255, 206, 86, 0.5)",
                        "rgba(75, 192, 192, 0.5)",
                        "rgba(153, 102, 255, 0.5)",
                        "rgba(255, 159, 64, 0.5)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }} />
              </div>
              <div className="w-full grid grid-cols-2 gap-4 mt-4">
                <DashboardPieChartCard
                  label="Income"
                  addAmount={fullData?.income}
                  labelColor="bg-blue-500"
                  amount={fullData?.income}
                  icon={<BlueIncomeIcon />}
                />
                <DashboardPieChartCard
                  label="Sales"
                  addAmount=""
                  labelColor="bg-orange-500"
                  amount={fullData?.sales}
                  icon={<SalesRedIcon />}
                />
                <DashboardPieChartCard
                  label="Products"
                  addAmount=""
                  labelColor="bg-green-500"
                  amount={fullData?.products}
                  icon={<GreenProductsIcon />}
                />
                <DashboardPieChartCard
                  label="Vendors"
                  addAmount=""
                  labelColor="bg-blue-500"
                  amount={fullData?.vendors}
                  icon={<GrayVendors />}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-10 md:col-span-3">
        <Card>
          <div className=" bg-base-100 border-[1px] border-base-300 rounded-xl py-4">
            <div className="flex justify-between px-4">
              <h2 className="text-lg font-semibold">Pending Inquiries</h2>
              <p className="text-blue-500 font-thin cursor-pointer">View all</p>
            </div>
            <div className="flex flex-col mt-4">
              <span className="p-4 border-y-[1px] border-base-200">
                income requests
              </span>
              <span className="p-4 border-y-[1px] border-base-200">
                You have 2 pending requests
              </span>
              <span className="p-4 border-y-[1px] border-base-200">
                You have 3 pending orders
              </span>
              <span className="p-4 border-y-[1px] border-base-200">
                New order received
              </span>
              <p className="flex justify-end text-blue-500 font-semibold pr-4 mt-4 cursor-pointer">
                Show More
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TransactionTotalIncomeInquiries;
