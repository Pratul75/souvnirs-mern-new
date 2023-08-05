import { ToastContainer } from "react-toastify";
import { Header } from "../../../components";
import DashboardCardsList from "./DashboardCardsList";
import ProductOverviewAndAddProduct from "./ProductOverviewAndAddProduct";
import TotalSalesTab from "./TotalSalesTab";
import TransactionTotalIncomeInquiries from "./TransactionTotalIncomeInquiries";
import VendorAndOrderList from "./VendorAndOrderList";
import dashboardBannerImage from "../../../assets/bannerImages/dashboardBannerImage.png";
import ReturnExchangeAdd from "./ReturnExchangeAdd";
const AdminDashboard = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Header
          heading="Admin Dashboard"
          subheading="This is admin dashboard which provides all the details in a very conscise and user friendly way."
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
        {/* sixth row */}
        <ReturnExchangeAdd />
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;
