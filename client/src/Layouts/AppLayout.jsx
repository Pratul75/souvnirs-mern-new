import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// main layout for the application
const AppLayout = ({ children }) => {
  return (
    <div className="h-screen  flex">
      {/*sidebar */}
      <Sidebar />
      {/* navbar */}
      <div className="w-full">
        <Navbar />
        {/* app layout */}
        <div className="mx-4 mt-4 max-w-[1400px] overflow-y-scroll max-h-[calc(100vh-85px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
