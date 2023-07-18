import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { setActiveLink } from "../../features/appConfig/appSlice";

const SidebarItem = ({ Icon, title, to }) => {
  const dispatch = useDispatch();
  const isActiveLink = useSelector((x) => x.appConfig.activeLink.payload);
  const sidebarExpanded = useSelector((x) => x.appConfig.sidebarExpanded);

  return (
    <NavLink
      to={to}
      className={`p-4 rounded-xl flex items-center  cursor-pointer mb-3 hover:bg-gray-300 ${
        isActiveLink === to ? "bg-blue-100 text-[#4E62C2]" : ""
      }`}
      onClick={() => dispatch(setActiveLink(to))}
    >
      {Icon}

      {sidebarExpanded && <p className="ml-4">{title}</p>}
    </NavLink>
  );
};

SidebarItem.propTypes = {
  Icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default SidebarItem;
