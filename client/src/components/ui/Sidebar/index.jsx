import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";

import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import SovniersLogo from "../../../assets/images/souvnirsLogo.png";
import SovniersLogoDarkMode from "../../../assets/images/souvnirsLogoDarkMode.png";
import { SmallVIcon } from "../../../icons/sidebarIcons";
import { toggleMobileSidebar } from "../../../features/appConfig/appSlice";
import Card from "../Card";
import Avatar from "../Avatar";
import { conditionalSidebarMapping, getRandomColor } from "../../../utils";
import { sidebarVariants, mobileSidebarVariants } from "../../../animation";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);
  const isExpanded = useSelector((x) => x.appConfig.sidebarExpanded);
  const isExpandedMobile = useSelector(
    (x) => x.appConfig.mobileSidebarExpanded
  );
  const darkMode = useSelector((x) => x.appConfig.darkMode);

  // Update sidebarState when isExpanded changes
  useEffect(() => {
    setSidebarState(isExpanded);
  }, [isExpanded]);
  // TODO : Temperory commented as first and lat name cannot be fetched from be for the moment
  // const username = JSON.parse(localStorage.getItem("username"));
  // console.log("index.jsx", username);
  const userInitials = "VB";

  const role = JSON.parse(localStorage.getItem("role"));
  console.log("USER CREDENTIALS: ", userInitials);

  return (
    <>
      <motion.ul
        className={` bg-base-200 hidden md:flex items-center border-r-[1px] border-base-300`}
        initial={false}
        animate={sidebarState ? "expanded" : "collapsed"}
        variants={sidebarVariants}
      >
        <div className="w-full">
          <div className="flex  bg-base-200 items-center  justify-center h-full w-full py-4">
            {sidebarState ? (
              <div id="logo" className="w-40">
                <img
                  src={darkMode ? SovniersLogoDarkMode : SovniersLogo}
                  className="w-full"
                  alt=""
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <SmallVIcon width={25} />
              </div>
            )}
          </div>
          <div
            className="overflow-y-auto overflow-x-hidden max-h-[88vh] mt-4"
            style={{ height: " calc(100vh-79px)" }}
          >
            <div className="mx-2 cursor-pointer">
              <Card>
                {sidebarState ? (
                  <div className="flex gap-4 p-4">
                    <Avatar
                      initials={userInitials}
                      bgColor={getRandomColor()}
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">{userInitials}</h3>
                      <h5 className="text-sm">{role.toUpperCase()}</h5>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex justify-center">
                    <Avatar
                      initials={userInitials}
                      bgColor={getRandomColor()}
                    />
                  </div>
                )}
              </Card>
            </div>
            <div className="mt-4">
              {conditionalSidebarMapping()?.map(({ title, navLink, Icon }) => (
                <SidebarItem
                  key={nanoid()}
                  title={title}
                  navLink={navLink}
                  Icon={(props) => (
                    <Icon
                      {...props}
                      className={props.isActive ? "text-shopPrimaryColor" : ""}
                    />
                  )}
                  sidebarState={sidebarState}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.ul>

      {/* mobile sidebar */}
      <div>
        <AnimatePresence>
          {isExpandedMobile && (
            <motion.div
              onClick={() => dispatch(toggleMobileSidebar())}
              className="fixed z-50 bg-transparent backdrop-blur h-auto md:hidden transition-all ease-in-out duration-300 overflow-y-scroll"
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              variants={mobileSidebarVariants}
            >
              <motion.ul
                className={`menu bg-base-200 md:hidden flex items-center shadow-xl overflow-y-auto max-h-screen `}
                initial={false}
                animate={sidebarState ? "expanded" : "collapsed"}
                variants={sidebarVariants}
                onMouseEnter={() => setSidebarState(true)}
                onMouseLeave={() => !isExpanded && setSidebarState(false)}
              >
                <div className="w-full">
                  {conditionalSidebarMapping()?.map(
                    ({ title, navLink, Icon }) => (
                      <SidebarItem
                        key={nanoid()}
                        title={title}
                        navLink={navLink}
                        Icon={Icon}
                        sidebarState={sidebarState}
                      />
                    )
                  )}
                </div>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Sidebar;
