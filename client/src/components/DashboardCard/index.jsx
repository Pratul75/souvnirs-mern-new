import PropTypes from "prop-types";

const DashboardCard = ({ number, subheading, iconSvg, iconColor }) => {
  return (
    <div className="w-full flex justify-between items-center p-4 rounded-xl bg-[#f9f9f9]">
      <div>
        <h2 className="text-2xl">${number}</h2>
        <p>{subheading}</p>
      </div>

      <div
        className={` w-12 h-12 flex justify-center items-center rounded-xl  ${iconColor}`}
      >
        {iconSvg}
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  number: PropTypes.number.isRequired,
  subheading: PropTypes.string.isRequired,
  iconSvg: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
};
export default DashboardCard;
