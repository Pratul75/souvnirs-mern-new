import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <div className=" flex-grow mx-8 md:mx-40 my-4 overflow-y-auto md:max-h-[calc(100vh-64px)]">
          <div className="mx-10">{children}</div>
        </div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
