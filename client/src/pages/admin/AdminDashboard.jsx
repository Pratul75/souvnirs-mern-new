import { Header, DashboardCard, Tabs } from "../../components";
import HeaderImgOne from "../../assets/images/headerImgOne.png";
import BarChartImg from "../../assets/images/barChartImg.png";
import DetailsCard from "../../components/DetailsCard";
import { TotalSalesIcon } from "../../icons";

const AdminDashboard = () => {
  const tabs = [
    {
      label: "Total Sales",
      content: (
        <div className="flex gap-4 bg-white">
          {/* add barchart later */}
          <img src={BarChartImg} />
          <div className="w-full flex flex-col gap-2">
            <DetailsCard icon={<TotalSalesIcon />} />
            <DetailsCard />
            <DetailsCard />
            <DetailsCard />
          </div>
        </div>
      ),
    },
    { label: "By Month", content: "Content 2" },
    { label: "By Year", content: "Content 3" },
    { label: "By Weekly", content: "Content 4" },
  ];

  // specific return statement ius provided here
  return (
    <div className="flex flex-col ">
      <Header
        heading="Welcome back Vishesh Bajpayee"
        subheading="Seamlessly manage and monitor all aspects of your online store from a centralized hub. Gain valuable insights, streamline operations, and maximize revenue with a user-friendly interface designed to simplifdy your tasks. "
        image={HeaderImgOne}
      />
      <div className="flex gap-4 mt-4">
        <DashboardCard
          number={13323}
          subheading="Total Sales"
          iconColor="bg-error"
        />
        <DashboardCard
          number={232}
          subheading="No of Orders"
          iconColor="bg-warning"
        />
        <DashboardCard
          number={2312}
          subheading="Total No. of Products "
          iconColor="bg-info"
        />
        <DashboardCard
          number={9853}
          subheading="No. of Vendors"
          iconColor="bg-success"
        />
      </div>

      {/* tabs are spefcificaslly provided */}
      <Tabs tabs={tabs} />
    </div>
  );
};

export default AdminDashboard;
