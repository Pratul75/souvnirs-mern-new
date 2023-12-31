import { ToastContainer } from "react-toastify";
import { Header } from "../../../components";
import DashboardCardsList from "./DashboardCardsList";
import ProductOverviewAndAddProduct from "./ProductOverviewAndAddProduct";
import TotalSalesTab from "./TotalSalesTab";
import TransactionTotalIncomeInquiries from "./TransactionTotalIncomeInquiries";
import VendorAndOrderList from "./VendorAndOrderList";

const VendorDashboard = () => {
  return (
    <div>
      <Header
        heading="Admin Dashboard"
        subheading="This is admin dashboard which provides all the details in a very conscise and user friendly way. You get all the details from all modules on this page"
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

export default VendorDashboard;
