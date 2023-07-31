import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import {
  adminSidebarMapping,
  vendorSidebarMapping,
  customerSidebarMapping,
} from "../../mappings";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import { SmallVIcon } from "../../icons/sidebarIcons";
const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState(false);
  const isExpanded = useSelector((x) => x.appConfig.sidebarExpanded);

  // Update sidebarState when isExpanded changes
  useEffect(() => {
    setSidebarState(isExpanded);
  }, [isExpanded]);

  const conditionalSidebarMapping = () => {
    const userRole = JSON.parse(localStorage.getItem("role"));
    if (userRole === "customer") {
      console.log("USER IS LOGGED");
      return customerSidebarMapping;
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
      width: "300px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    collapsed: {
      width: "100px",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.ul
      className={`menu bg-base-100 hidden md:flex items-center shadow-xl overflow-y-auto max-h-screen `}
      initial={false}
      animate={sidebarState ? "expanded" : "collapsed"}
      variants={sidebarVariants}
      onMouseEnter={() => setSidebarState(true)}
      onMouseLeave={() => !isExpanded && setSidebarState(false)}
    >
      <div>
        <div className="flex items-center justify-center mb-4">
          {sidebarState ? (
            <img src={SovniersLogo} alt="" />
          ) : (
            <div className="flex items-center justify-center">
              <SmallVIcon />
            </div>
          )}
        </div>
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
