import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { headerVariant } from "../../../animation";
import { motion } from "framer-motion";
import { PATHS } from "../../../Routes/paths";
// ... (import statements)

const BreadCrumb = () => {
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
    <motion.nav
      variants={headerVariant}
      initial="initial"
      animate="animate"
      className={`hidden md:block px-4 py-2 ${darkMode ? "" : ""} rounded-xl`}
    >
      <ol className="list-reset flex text-themeColor ">
        <li>
          <a href={PATHS.login} className="hover:text-primary-dark text-sm">
            Home
          </a>
        </li>
        {breadcrumbs.map((item, index) => {
          if (item.label === "Admin") {
            return null; // Skip rendering the "Admin" breadcrumb
          }
          return (
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
                      : "text-themeColor hover:text-primary-dark text-sm"
                  }
                >
                  {item.label}
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default BreadCrumb;
