import PropTypes from "prop-types";

const SidebarItem = ({ Icon, title }) => {
  return (
    <div className="p-4 bg-blue-100 w-full rounded-xl flex justify-start gap-4 items-center text-black cursor-pointer mb-3">
      {Icon} {/* Render the SVG icon */}
      <p className="text-[#4E62C2]">{title}</p>
    </div>
  );
};

SidebarItem.propTypes = {
  Icon: PropTypes.object.isRequired, // Use PropTypes.object for SVG
  title: PropTypes.string.isRequired,
};

export default SidebarItem;
