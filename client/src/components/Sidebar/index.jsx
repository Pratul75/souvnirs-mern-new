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
import { SmallVIcon } from "../../icons/sidebarIcons";
import { toggleMobileSidebar } from "../../features/appConfig/appSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [sidebarState, setSidebarState] = useState(false);
  const isExpanded = useSelector((x) => x.appConfig.sidebarExpanded);
  const isExpandedMobile = useSelector(
    (x) => x.appConfig.mobileSidebarExpanded
  );

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

  // Animation properties for mobile sidebar
  const mobileSidebarVariants = {
    collapsed: { width: 0 },
    expanded: { width: "100%" },
  };

  return (
    <>
      <motion.ul
        className={`menu bg-base-200 hidden md:flex items-center shadow-xl overflow-y-auto max-h-screen `}
        initial={false}
        animate={sidebarState ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        onMouseEnter={() => setSidebarState(true)}
        onMouseLeave={() => !isExpanded && setSidebarState(false)}
      >
        <div className="w-full">
          <div className=" flex z-20 bg-base-200 overflow-hidden items-center justify-center sticky top-0  ">
            {sidebarState ? (
              <img src={SovniersLogo} className="h-full" alt="" />
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
                className={`menu bg-base-200 md:hidden flex items-center shadow-xl overflow-y-auto max-h-screen`}
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
