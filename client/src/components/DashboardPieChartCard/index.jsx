import PropTypes from "prop-types";

const DashboardPieChartCard = ({
  label,
  labelColor,
  amount,
  addAmount,
  icon,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between p-2 bg-base-100 border-[1px] border-base-200 rounded-xl">
      {/* left side */}
      <div className="flex flex-col md:flex-row">
        <div className="p-4 rounded-xl flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${labelColor} rounded-full`}></span>
            <span className="text-sm md:text-base">{label}</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <p className="text-xs md:text-sm">{amount}</p>
            <div className="text-gray-300 text-xs md:text-sm">
              +{addAmount}$
            </div>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex mt-2 md:mt-0 md:ml-2">
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
