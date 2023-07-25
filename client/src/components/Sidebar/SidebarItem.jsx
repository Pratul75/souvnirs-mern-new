import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const SidebarItem = ({ title, navLink, Icon, sidebarState }) => {
  return (
    <li className="w-full my-2">
      <Link
        to={navLink}
        className={`tooltip tooltip-right flex  w-full  p-4 ${
          sidebarState ? "justify-start" : "justify-center"
        }`}
        data-tip={title}
      >
        <Icon />
        {title && <span className="ml-2 text-md">{title}</span>}
      </Link>
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
