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

const Sidebar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.appConfig.sidebarExpanded);

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
    <>
      {/* desktop sidebar */}
      <nav
        className={`w-16  overflow-y-auto   hidden md:block bg-base-300 h-screen ${
          isExpanded ? "lg:w-96" : "lg:w-28"
        } transition-all duration-500 ease-in-out`}
      >
        {/* Collapsed State */}
        <div
          className={`flex w-full flex-col justify-center items-center mt-4 ${
            isExpanded ? "hidden" : "block"
          }`}
        >
          <SmallVIcon />
          <div className="flex flex-col justify-center items-center">
            {conditionalSidebarMapping().map(({ Icon, navLink }) => {
              return (
                <SidebarItem
                  to={navLink}
                  key={nanoid()}
                  Icon={<Icon />}
                  title={""}
                />
              );
            })}
          </div>
        </div>

        {/* Expanded State */}
        <div className={`${isExpanded ? "block" : "hidden"}`}>
          <div className="flex flex-col mx-2 items-center justify-center pt-4 border-r-2 border-base-300">
            {/* Add your expanded sidebar content here */}
            {isExpanded && (
              <img
                width={132}
                height={39}
                src={SovniersLogo}
                alt="souvnirs-logo"
              />
            )}
            <div className="w-full p-4 py-8 rounded-xl bg-base-100 mx-5 mt-4 flex items-center gap-2 justify-around shadow-lg cursor-pointer ">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div>
                <h2>Vishesh Bajpayee</h2>
                <p className="text-gray-400">Administrator</p>
              </div>
              <BsFilter size={32} />
            </div>

            <div className="mt-3 w-full max-h-[calc(100vh-208px)] overflow-y-auto">
              {/* Apply fixed height and add overflow-y-auto */}
              {conditionalSidebarMapping().map(({ title, Icon, navLink }) => {
                return (
                  <SidebarItem
                    to={navLink}
                    key={nanoid()}
                    Icon={<Icon />}
                    title={title}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </nav>
      {/* mobile sidebar view */}
      <nav
        className={`w-[50%] md:hidden h-screen ${
          isExpanded ? "translate-x-0" : " translate-x-[-100%]"
        }  absolute bg-rose-50 transition-all duration-300 overflow-y-auto`}
      >
        {conditionalSidebarMapping().map(({ title, Icon, navLink }) => {
          return (
            <SidebarItem
              to={navLink}
              key={nanoid()}
              Icon={<Icon />}
              title={title}
            />
          );
        })}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="absolute top-5 right-5 text-white"
        >
          <AiOutlineClose />
        </button>
      </nav>
    </>
  );
};

export default Sidebar;
