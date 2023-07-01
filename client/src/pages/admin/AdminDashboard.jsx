import { Header, DashboardCard } from "../../components";
import HeaderImgOne from "../../assets/images/headerImgOne.png";
const AdminDashboard = () => {
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
          iconColor="bg-info"
        />
        <DashboardCard
          number={232}
          subheading="No of Orders¯"
          iconColor="bg-warning"
        />
        <DashboardCard
          number={2312}
          subheading="Total No. of Products "
          iconColor="bg-error"
        />
        <DashboardCard
          number={9853}
          subheading="No. of Vendors"
          iconColor="bg-success"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
