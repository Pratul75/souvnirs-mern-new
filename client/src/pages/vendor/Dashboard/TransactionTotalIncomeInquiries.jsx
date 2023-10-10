import {
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

const TransactionTotalIncomeInquiries = () => {
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
  return (
    <div className="grid grid-cols-10 gap-4 mt-4">
      <div className="col-span-3 bg-base-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold">Transactions</h2>
        <Tabs tabs={transactionTabs} />
      </div>
      <div className="col-span-4 bg-base-200 rounded-xl p-4">
        <h2 className="text-lg font-semibold">Total Income</h2>
        <div className="flex flex-col items-center">
          <div>
            <DoughnutChart />
          </div>
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
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
            <DashboardPieChartCard
              label="Products"
              addAmount="$76,745"
              labelColor="bg-green-500"
              amount="$3421"
              icon={<GreenProductsIcon />}
            />
            <DashboardPieChartCard
              label="Vendors"
              addAmount="$76,745"
              labelColor="bg-blue-500"
              amount="$3421"
              icon={<GrayVendors />}
            />
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-base-200 rounded-xl py-4">
        <div className="flex justify-between px-4">
          <h2 className="text-lg font-semibold">Pending Inquiries</h2>
          <p className="text-blue-500 font-thin">View all</p>
        </div>
        <div className="flex flex-col mt-4">
          <span className="p-4 border-y-[1px] border-base-300">
            income requests
          </span>
          <span className="p-4 border-y-[1px] border-base-300">
            You have 2 pending requests
          </span>
          <span className="p-4 border-y-[1px] border-base-300">
            You have 3 pending orders
          </span>
          <span className="p-4 border-y-[1px] border-base-300">
            New order received
          </span>
          <p className="flex justify-end text-blue-500 font-semibold pr-4">
            Show More
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransactionTotalIncomeInquiries;
