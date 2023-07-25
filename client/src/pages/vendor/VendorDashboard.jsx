import { ToastContainer } from "react-toastify";
import { Header } from "../../components";
const VendorDashboard = () => {
  return (
    <div>
      <Header
        heading="Vendor Dashboard"
        subheading="This subheading exists because its required to provide information about vendor dashboard in banner"
      />
      <ToastContainer />
    </div>
  );
};

export default VendorDashboard;
