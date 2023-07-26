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
    <>
      <div className="flex justify-between items-center w-full p-4  rounded-xl bg-base-200 mb-2">
        <div className="flex gap-4">
          <div
            className={` w-12 h-12 p-1 rounded-xl  flex items-center justify-center ${
              !SvgIcon && "bg-base-100"
            }`}
          >
            {SvgIcon ? SvgIcon : iconText}
          </div>
          <div>
            <h4 className=" font-thin">{label}</h4>
            <p>{totalAmount}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p>{dynamicAmount}</p>
          <p className={`${percentageColor}`}>{percentage}</p>
        </div>
      </div>
    </>
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
