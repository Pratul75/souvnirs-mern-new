import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const SidebarItem = ({ Icon, title, to }) => {
  const activeStyle = {
    // Define your active styles here
    backgroundColor: "yellow",
    fontWeight: "bold",
    // Add more styles as needed
  };

  return (
    <NavLink
      to={to}
      activeStyle={activeStyle}
      className="p-4 rounded-xl flex items-center text-black cursor-pointer mb-3 hover:bg-gray-300"
    >
      {Icon} {/* Render the SVG icon */}
      <p>{title}</p>
    </NavLink>
  );
};

SidebarItem.propTypes = {
  Icon: PropTypes.object.isRequired, // Use PropTypes.object for SVG
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarItem;
