import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import { adminSidebarMapping, vendorSidebarMapping } from "../../mappings";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const isExpanded = useSelector((x) => x.appConfig.sidebarExpanded);

  // Update sidebarState when isExpanded changes
  useEffect(() => {
    setSidebarState(isExpanded);
  }, [isExpanded]);

  const conditionalSidebarMapping = () => {
    const userRole = JSON.parse(localStorage.getItem("role"));
    if (userRole === "user") {
      console.log("USER IS LOGGED");
      return userSidebarMapping;
    } else if (userRole === "vendor") {
      console.log("VENDOR IS LOGGED");
      return vendorSidebarMapping;
    } else if (userRole === "admin") {
      return adminSidebarMapping;
    } else {
      return [];
    }
  };

  // Animation properties for sidebar width
  const sidebarVariants = {
    expanded: {
      width: "250px",
    },
    collapsed: {
      width: "100px",
    },
  };

  return (
    <motion.ul
      className={`menu bg-base-300 rounded-box ml-8 mt-6 flex items-center shadow-xl overflow-y-auto max-h-[calc(100vh-150px)]`}
      initial={false}
      animate={sidebarState ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onMouseEnter={() => setSidebarState(true)}
      onMouseLeave={() => !isExpanded && setSidebarState(false)}
    >
      <div>
        {conditionalSidebarMapping()?.map(({ title, navLink, Icon }) => (
          <SidebarItem
            key={nanoid()}
            title={title}
            navLink={navLink}
            Icon={Icon}
            sidebarState={sidebarState}
          />
        ))}
      </div>
    </motion.ul>
  );
};

export default Sidebar;
