import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarVariant } from "../../animation";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLink } from "../../features/appConfig/appSlice";

const SidebarItem = ({ title, navLink, Icon, sidebarState }) => {
  // Animation properties for sidebar item title
  const activeLink = useSelector((x) => x.appConfig.activeLink);
  const dispatch = useDispatch();

  return (
    <motion.li
      className={`w-full my-2 ${
        activeLink === navLink ? "bg-accent-focus" : ""
      } `}
      initial={false}
      animate={sidebarState ? "expanded" : "collapsed"}
      variants={sidebarVariant}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <NavLink
        onClick={() => dispatch(setActiveLink(navLink))}
        to={navLink}
        className={({ isActive }) =>
          isActive
            ? `bg-blue-200 text-blue-500 p-4  ${
                sidebarState ? "justify-start" : "justify-center"
              }`
            : `flex w-full p-4 ${
                sidebarState ? "justify-start" : "justify-center"
              } `
        }
      >
        {Icon && <Icon />} {/* Only render Icon if it exists */}
        {sidebarState && title && (
          <motion.span
            className="ml-2 text-md"
            variants={sidebarVariant}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {title}
          </motion.span>
        )}
      </NavLink>
    </motion.li>
  );
};

SidebarItem.propTypes = {
  title: PropTypes.string.isRequired,
  navLink: PropTypes.string.isRequired,
  Icon: PropTypes.node,
  sidebarState: PropTypes.bool.isRequired,
};

export default SidebarItem;
