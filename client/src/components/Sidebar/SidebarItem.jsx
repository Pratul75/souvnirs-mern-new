import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SidebarItem = ({ title, navLink, Icon, sidebarState }) => {
  // Animation properties for sidebar item title
  const titleVariants = {
    expanded: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
    collapsed: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <motion.li
      className="w-full my-2"
      initial={false}
      animate={sidebarState ? "expanded" : "collapsed"}
      variants={titleVariants}
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
            variants={titleVariants}
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
