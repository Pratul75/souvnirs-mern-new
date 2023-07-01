import { Header } from "../../components";
import HeaderImgOne from "../../assets/images/headerImgOne.png";
const AdminDashboard = () => {
  return (
    <div>
      <Header
        heading="Welcome back Vishesh Bajpayee"
        subheading="Seamlessly manage and monitor all aspects of your online store from a centralized hub. Gain valuable insights, streamline operations, and maximize revenue with a user-friendly interface designed to simplifdy your tasks. "
        image={HeaderImgOne}
      />
      AdminDashboard
    </div>
  );
};

export default AdminDashboard;
