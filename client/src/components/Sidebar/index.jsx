import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import { toggleSidebar } from "../../features/appConfig/appSlice";
import { SmallVIcon } from "../../icons";
import { BsFilter } from "react-icons/bs";
import Avatar from "../Avatar";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import { adminSidebarMapping, vendorSidebarMapping } from "../../mappings";
import { useState } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);
  // const conditionalSidebarMapping = () => {
  //   const userRole = JSON.parse(localStorage.getItem("role"));
  //   if (userRole === "user") {
  //     console.log("USER IS LOGGED");
  //     return userSidebarMapping;
  //   } else if (userRole === "vendor") {
  //     console.log("VENDOR IS LOGGED");
  //     return vendorSidebarMapping;
  //   } else if (userRole === "admin") {
  //     return adminSidebarMapping;
  //   } else {
  //     return [];
  //   }
  // };

  return (
    <>
      <ul
        onMouseEnter={() => setSidebarState((prevState) => !prevState)}
        onMouseLeave={() => setSidebarState((prevState) => !prevState)}
        className={`menu bg-base-300 rounded-box ml-8 mt-6 w-28 flex items-center shadow-xl py-8  transition-all duration-300 ease-in-out ${
          sidebarState ? "w-56" : "w-28"
        }`}
      >
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
        <SidebarItem />
      </ul>

      {/* expanded */}
    </>
  );
};

export default Sidebar;
