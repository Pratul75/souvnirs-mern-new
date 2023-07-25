import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sidebarVariant } from "../../animation";

const SidebarItem = ({ title, navLink, Icon, sidebarState }) => {
  // Animation properties for sidebar item title

  return (
    <motion.li
      className="w-full my-2"
      initial={false}
      animate={sidebarState ? "expanded" : "collapsed"}
      variants={sidebarVariant}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <Link
        to={navLink}
        className={`flex w-full p-4 ${
          sidebarState ? "justify-start" : "justify-center"
        }`}
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
      </Link>
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
