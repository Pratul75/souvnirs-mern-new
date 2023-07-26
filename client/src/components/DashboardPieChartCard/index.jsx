import PropTypes from "prop-types";

const DashboardPieChartCard = ({
  label,
  labelColor,
  amount,
  addAmount,
  icon,
}) => {
  return (
    <div className="w-full flex justify-between p-2 bg-base-100 rounded-xl">
      {/* left side */}
      <div className="flex">
        <div className="p-4  rounded-xl flex flex-col">
          <div className="flex  items-center gap-2">
            <span className={`w-2 h-2 ${labelColor} rounded-full`}></span>
            <span>{label}</span>
          </div>
          <div className="flex gap-4">
            <p>{amount}</p>
            <div className="text-gray-300">+{addAmount}$</div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex">
        <button>{icon}</button>
      </div>
    </div>
  );
};

DashboardPieChartCard.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  addAmount: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default DashboardPieChartCard;
