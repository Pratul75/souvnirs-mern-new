import PropTypes from "prop-types";
import { Sidebar, Navbar } from "../components";
import { Breadcrumb, Footer } from "../components";

const AppLayout = ({ children }) => {
  return (
    <div className="h-screen flex bg-base-200">
      {/* sidebar */}
      <div>
        <Sidebar />
      </div>
      {/* navbar and app layout */}
      <div className="flex flex-col flex-grow">
        <Navbar />
        {/* breadcrumbs */}

        {/* app content */}
        <div className="md:p-4 md:mx-6 overflow-y-scroll flex-grow max-h-[calc(100vh-85px)]">
          <Breadcrumb />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
