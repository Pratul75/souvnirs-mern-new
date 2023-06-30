import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import { toggleSidebar } from "../../features/appConfig/appSlice";
import { SmallVIcon } from "../../icons";
import { BsFilter } from "react-icons/bs";
import Avatar from "../Avatar";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import { sidebarMapping } from "../../mappings";

const Sidebar = () => {
  const dispatch = useDispatch();
  const isExpanded = useSelector((state) => state.appConfig.sidebarExpanded);

  return (
    <>
      {/* desktop sidebar */}
      <div
        className={`w-16 md:border-r-[1px] overflow-y-auto border-gray-500 hidden md:block bg-[#F8F9FAB2] h-screen ${
          isExpanded ? "lg:w-96" : "lg:w-28"
        } transition-all duration-500`}
      >
        {/* Collapsed State */}
        <div
          className={`flex w-full flex-col justify-center items-center mt-4 ${
            isExpanded ? "hidden" : "block"
          }`}
        >
          <SmallVIcon />
          <div className="flex flex-col justify-center items-center">
            {sidebarMapping.map(({ Icon, navLink }) => {
              return (
                <SidebarItem
                  to={navLink}
                  key={nanoid()}
                  Icon={<Icon />}
                  // title={title}
                />
              );
            })}
          </div>
        </div>

        {/* Expanded State */}
        <div className={`${isExpanded ? "block" : "hidden"}`}>
          <div className="flex flex-col mx-2 items-center justify-center pt-4">
            {/* Add your expanded sidebar content here */}
            {isExpanded ? (
              <img width={132} height={39} src={SovniersLogo} alt="" />
            ) : (
              "logo"
            )}
            <div className="w-full p-4 py-8 rounded-xl bg-gray-200 mx-5 mt-4 flex items-center gap-2 justify-around border-[1px] border-gray-300 cursor-pointer">
              <Avatar bgColor="bg-primary" initials="VB" />
              <div>
                <h2>Vishesh Bajpayee</h2>
                <p className="text-gray-400">Administrator</p>
              </div>
              <BsFilter size={32} />
            </div>

            <div className="mt-28 w-full">
              {sidebarMapping.map(({ title, Icon, navLink }) => {
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
      </div>

      {/* mobile view */}
      <nav
        className={`w-[50%] md:hidden h-screen ${
          isExpanded ? "translate-x-0" : " translate-x-[-100%]"
        } absolute bg-teal-600 transition-all duration-300 overflow-y-auto`}
      >
        {sidebarMapping.map(({ title, Icon, navLink }) => {
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
