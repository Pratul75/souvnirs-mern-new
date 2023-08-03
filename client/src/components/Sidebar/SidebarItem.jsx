import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarVariant } from "../../animation";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLink } from "../../features/appConfig/appSlice";

const SidebarItem = ({ title, navLink, Icon, sidebarState }) => {
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.appConfig.darkMode)

  const col = darkMode ? "bg-gray-800" : "bg-[#4680ff36]"
  return (
    <li className="mx-2 cursor-pointer">
      <NavLink
        onClick={() => dispatch(setActiveLink(navLink))}
        to={navLink}
        className={({ isActive }) =>
          isActive
            ? `flex text-themeColor  ${col} rounded-xl  w-full p-4 ${sidebarState ? "justify-start" : "justify-center"
            } `
            : `flex hover:bg-base-300 rounded-xl w-full p-4 transition-all ease-in-out duration-300 ${sidebarState ? "justify-start" : "justify-center"
            } `
        }
      >
        <div className="flex flex-row gap-2 items-center">
          {Icon && <Icon />} {/* Only render Icon if it exists */}
          {sidebarState && title && (
            <motion.span
              className={`ml-2 text-xs font-semibold ${sidebarState ? "block" : "hidden"
                }`}
              variants={sidebarVariant}
              expanded="expanded"
              collapsed="collapsed"
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {title}
            </motion.span>
          )}
        </div>
      </NavLink>
    </li>
  );
};

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  navLink: PropTypes.string.isRequired,
  Icon: PropTypes.node,
  sidebarState: PropTypes.bool.isRequired,
};

export default SidebarItem;
