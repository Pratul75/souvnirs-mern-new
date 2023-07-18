import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
// main layout for the application
const AppLayout = ({ children }) => {
  return (
    <div id="app-div" className="flex h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <Sidebar />
      {/* Main content */}
      <div className="flex flex-col w-full">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        {/* <div className="w-full flex justify-center"> */}
        <div className=" flex-grow  md:mx-40 my-4 overflow-y-auto md:max-h-[calc(100vh-64px)] ">
          <div className="mx-2 ">{children}</div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
