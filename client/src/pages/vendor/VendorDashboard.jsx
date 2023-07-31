import { ToastContainer } from "react-toastify";
import { Header } from "../../components";
import DashboardCardsList from "../admin/Dashboard/DashboardCardsList";
import TotalSalesTab from "../admin/Dashboard/TotalSalesTab";
import ProductOverviewAndAddProduct from "../admin/Dashboard/ProductOverviewAndAddProduct";
import TransactionTotalIncomeInquiries from "../admin/Dashboard/TransactionTotalIncomeInquiries";
import VendorAndOrderList from "../admin/Dashboard/VendorAndOrderList";

const VendorDashboard = () => {
  return (
    <div>
      <Header
        heading="Vendor Dashboard"
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
