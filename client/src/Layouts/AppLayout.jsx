import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// main layout for the application
const AppLayout = ({ children }) => {
  return (
    <div className="h-screen flex">
      {/* sidebar */}
      <Sidebar />
      {/* navbar and app layout */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        {/* app content */}
        <div className="p-4 overflow-y-scroll flex-grow max-h-[calc(100vh-85px)]">
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
