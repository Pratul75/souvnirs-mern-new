import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const DashboardPieChartCard = ({ label, labelColor, amount, icon }) => {
  const darkMode = useSelector((x) => x.appConfig.darkMode);

  return (
    <div
      className={`w-full flex flex-col md:flex-row justify-between p-2 ${
        darkMode ? "bg-cardDarker" : "bg-carsLighter"
      } shadow-xl border-[1px] border-base-200 rounded-xl`}
    >
      {/* left side */}
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <div className="p-4 rounded-xl flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 ${labelColor} rounded-full`}></span>
            <span className="text-sm">{label}</span>
          </div>
          <div className="flex gap-2 mt-1">
            <p className="text-s font-semibold">{amount}</p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex items-center mt-2 md:mt-0 mr-2">{icon}</div>
    </div>
  );
};

DashboardPieChartCard.propTypes = {
  label: PropTypes.string.isRequired,
  labelColor: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  addAmount: PropTypes.string,
  icon: PropTypes.element.isRequired,
};

export default DashboardPieChartCard;
