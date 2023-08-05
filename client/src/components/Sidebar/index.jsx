import { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import { nanoid } from "@reduxjs/toolkit";
import {
  adminSidebarMapping,
  vendorSidebarMapping,
  customerSidebarMapping,
} from "../../mappings";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import SovniersLogo from "../../assets/images/souvnirsLogo.png";
import SovniersLogoDarkMode from "../../assets/images/souvnirsLogoDarkMode.png";
import { SmallVIcon } from "../../icons/sidebarIcons";
import { toggleMobileSidebar } from "../../features/appConfig/appSlice";
import Card from "../Card";
import Avatar from "../Avatar";
import { getRandomColor } from "../../utils";
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
      width: "250px",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    collapsed: {
      width: "100px",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  // Animation properties for mobile sidebar
  const mobileSidebarVariants = {
    collapsed: { width: 0 },
    expanded: { width: "100%" },
  };

  return (
    <>
      <motion.ul
        className={` bg-base-200 hidden md:flex items-center shadow-lg 
        `}
        initial={false}
        animate={sidebarState ? "expanded" : "collapsed"}
        variants={sidebarVariants}
      >
        <div className="w-full">
          <div className="flex z-20 bg-base-200 overflow-hidden items-center justify-center h-full w-full py-4">
            {sidebarState ? (
              <div className="w-40">
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
            className="overflow-y-auto max-h-[88vh] mt-4"
            style={{ height: " calc(100vh-79px)" }}
          >
            <div className="mx-2">
              <Card>
                {sidebarState ? (
                  <div className="flex gap-4 p-4">
                    <Avatar initials="JS" bgColor={getRandomColor()} />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-bold">John Smith</h3>
                      <h5 className="text-sm">Administrator</h5>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 flex justify-center">
                    <Avatar initials="JD" bgColor={getRandomColor()} />
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
                      className={props.isActive ? "text-themeColor" : ""}
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
