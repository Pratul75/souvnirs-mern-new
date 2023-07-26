import { DashboardCard } from "../../../components";
import {
  NoOfOrders,
  NoOfProducts,
  NoOfVendors,
  TotalSalesIcon,
} from "../../../icons";

const DashboardCardsList = () => {
  return (
    <div>
      {" "}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
        <DashboardCard
          number={1}
          subheading="Total Sales"
          iconColor="bg-red-500"
          iconSvg={<TotalSalesIcon />}
        />
        <DashboardCard
          number={2}
          subheading="No. of Orders"
          iconSvg={<NoOfOrders />}
          iconColor="bg-green-500"
        />
        <DashboardCard
          number={3}
          subheading="Total No. of Products"
          iconSvg={<NoOfProducts />}
          iconColor="bg-orange-500"
        />
        <DashboardCard
          number={4}
          subheading="No. of Vendors"
          iconSvg={<NoOfVendors />}
          iconColor="bg-blue-500"
        />
      </div>
    </div>
  );
};

export default DashboardCardsList;
