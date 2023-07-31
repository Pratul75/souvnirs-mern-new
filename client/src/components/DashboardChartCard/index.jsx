import PropTypes from "prop-types";

const DetailsCard = ({
  SvgIcon,
  label,
  totalAmount,
  percentage,
  dynamicAmount,
  percentageColor,
  iconText,
}) => {
  return (
    <div className="flex  w-full py-2 bg-base-100 border-b-[1px] border-base-200 mb-2">
      <div className="w-full flex flex-row  justify-between items-center">
        <div className="flex gap-4 items-center mb-2 md:mb-0">
          <div
            className={`w-12 h-12 p-1 rounded-xl flex items-center justify-center ${
              !SvgIcon && "bg-base-100"
            }`}
          >
            {SvgIcon ? SvgIcon : iconText}
          </div>
          <div>
            <h4 className="font-thin text-sm md:text-base">{label}</h4>
            <p className="text-xs md:text-sm">{totalAmount}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col items-end">
          <p className="text-xs md:text-sm">{dynamicAmount}</p>
          <p className={`${percentageColor} text-xs md:text-sm`}>
            {percentage}
          </p>
        </div>
      </div>
    </div>
  );
};

DetailsCard.propTypes = {
  SvgIcon: PropTypes.element,
  label: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  dynamicAmount: PropTypes.string.isRequired,
  percentageColor: PropTypes.string.isRequired,
  iconText: PropTypes.string,
};

export default DetailsCard;
