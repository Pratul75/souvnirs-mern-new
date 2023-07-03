import PropTypes from "prop-types";

const DetailsCard = ({
  SvgIcon,
  label,
  totalAmount,
  percentage,
  dynamicAmount,
  percentageColor,
}) => {
  return (
    <>
      <div className="flex justify-between items-center w-full p-2 rounded-xl bg-base-100 ">
        <div className="flex gap-4 ">
          <div className=" w-12 h-12 p-1 rounded-xl bg-base-200 flex items-center justify-center">
            {SvgIcon}
          </div>
          <div>
            <h4 className="text-gray-700 font-thin">{label}</h4>
            <p>{totalAmount}</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col">
          <p>{dynamicAmount}</p>
          <p className={`${percentageColor}`}>{percentage}</p>
        </div>
      </div>
      <hr />
    </>
  );
};

DetailsCard.propTypes = {
  SvgIcon: PropTypes.element.isRequired,
  label: PropTypes.string.isRequired,
  totalAmount: PropTypes.string.isRequired,
  percentage: PropTypes.string.isRequired,
  dynamicAmount: PropTypes.string.isRequired,
  percentageColor: PropTypes.string.isRequired,
};

export default DetailsCard;
