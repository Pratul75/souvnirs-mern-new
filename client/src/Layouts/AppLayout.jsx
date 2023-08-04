import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom"; // Import react-router-dom's useLocation hook
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";
import { headerVariant } from "../animation";
import { useSelector } from "react-redux";
import { Footer } from "../components";
const AppLayout = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const location = useLocation();
  const darkMode = useSelector((x) => x.appConfig.darkMode);

  // use effect
  useEffect(() => {
    const pathParts = location.pathname
      .split("/")
      .filter((part) => part !== "");
    const breadcrumbItems = pathParts.map((part, index) => {
      const path = `/${pathParts.slice(0, index + 1).join("/")}`;
      return {
        path,
        label: part.charAt(0).toUpperCase() + part.slice(1),
      };
    });
    setBreadcrumbs(breadcrumbItems);
  }, [location]);

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
          <motion.nav
            variants={headerVariant}
            initial="initial"
            animate="animate"
            className={`hidden md:block px-4 py-2 ${darkMode ? "" : ""} rounded-xl`}
          >
            <ol className="list-reset flex text-base-content">
              <li>
                <a
                  href="/"
                  className="text-primary hover:text-primary-dark text-sm"
                >
                  Home
                </a>
              </li>
              {breadcrumbs.map((item, index) => (
                <React.Fragment key={item.path}>
                  <li>
                    <span className="mx-2">/</span>
                  </li>
                  <li>
                    <Link
                      to={item.path}
                      className={
                        index === breadcrumbs.length - 1
                          ? "text-primary-dark text-sm"
                          : "text-primary hover:text-primary-dark text-sm"
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
            </ol>
          </motion.nav>
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
