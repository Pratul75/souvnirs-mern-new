import { ToastContainer } from "react-toastify";
import { Header } from "../../../components";
import DashboardCardsList from "./DashboardCardsList";
import ProductOverviewAndAddProduct from "./ProductOverviewAndAddProduct";
import TotalSalesTab from "./TotalSalesTab";
import TransactionTotalIncomeInquiries from "./TransactionTotalIncomeInquiries";
import VendorAndOrderList from "./VendorAndOrderList";
import dashboardBannerImage from "../../../assets/bannerImages/dashboardBannerImage.png";
const AdminDashboard = () => {
  return (
    <div>
      <Header
        heading="Admins Dashboard"
        subheading="This is admin dashboard which provides all the details in a very conscise and user friendly way. You get all the details from all modules on this page"
        image={dashboardBannerImage}
      />
      {/* first row */}
      <DashboardCardsList />
      {/* second row */}
      <TotalSalesTab />
      {/* third row  */}
      <ProductOverviewAndAddProduct />
      {/* fourth row */}
      <TransactionTotalIncomeInquiries />
      {/* fifth row */}
      <VendorAndOrderList />
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
