import React, { useState } from "react";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import { adminSidebarMapping, vendorSidebarMapping } from "../../mappings";

const Sidebar = () => {
  const [sidebarState, setSidebarState] = useState(false);

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

  return (
    <ul
      className={`menu bg-base-300 rounded-box ml-8 mt-6 w-${
        sidebarState ? "64" : "28"
      } flex items-center shadow-xl py-8  transition-all duration-300 ease-in-out`}
      onMouseEnter={() => setSidebarState(true)}
      onMouseLeave={() => setSidebarState(false)}
    >
      {conditionalSidebarMapping()?.map(({ title, navLink, Icon }) => (
        <SidebarItem
          key={nanoid()}
          title={sidebarState ? title : ""}
          navLink={navLink}
          Icon={Icon}
          sidebarState={sidebarState}
        />
      ))}
    </ul>
  );
};

export default Sidebar;
