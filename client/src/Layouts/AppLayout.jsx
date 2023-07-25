import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// main layout for the application
const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-base-200">
      {/* Sidebar */}
      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />

        <div className="flex">
          <Sidebar />
          {/* Page content */}
          <div className=" flex-grow mx-8 py-8 mt-6 overflow-y-auto md:max-h-[calc(100vh-144px)] rounded-xl  shadow-xl bg-base-300">
            <div className="mx-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
