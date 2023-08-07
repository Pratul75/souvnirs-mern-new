import PropTypes from "prop-types";
const FeaturesCard = ({
  iconOne,
  iconTwo,
  iconThree,
  iconFour,
  headingOne,
  subHeadingOne,
  headingTwo,
  subHeadingTwo,
  headingThree,
  subHeadingThree,
  headingFour,
  subHeadingFour,
}) => {
  return (
    <div className="mx-16 bg-[#F0F2F5] p-4 py-8 my-4 rounded-xl">
      <div className="flex-col md:flex-row flex  justify-center md:justify-between px-8">
        <div className="flex items-center gap-2 ">
          <div>{iconOne}</div>
          <div>
            <h3 className="font-semibold text-sm">{headingOne}</h3>
            <p className="text-xs">{subHeadingOne}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>{iconTwo}</div>
          <div>
            <h3 className="font-semibold text-sm">{headingTwo}</h3>
            <p className="text-xs">{subHeadingTwo}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>{iconThree}</div>
          <div>
            <h3 className="font-semibold text-sm">{headingThree}</h3>
            <p className="text-xs">{subHeadingThree}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>{iconFour}</div>
          <div>
            <h3 className="font-semibold text-sm">{headingFour}</h3>
            <p className="text-xs">{subHeadingFour}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
FeaturesCard.propTypes = {
  iconOne: PropTypes.node.isRequired,
  iconTwo: PropTypes.node.isRequired,
  iconThree: PropTypes.node.isRequired,
  iconFour: PropTypes.node.isRequired,
  headingOne: PropTypes.string.isRequired,
  subHeadingOne: PropTypes.string.isRequired,
  headingTwo: PropTypes.string.isRequired,
  subHeadingTwo: PropTypes.string.isRequired,
  headingThree: PropTypes.string.isRequired,
  subHeadingThree: PropTypes.string.isRequired,
  headingFour: PropTypes.string.isRequired,
  subHeadingFour: PropTypes.string.isRequired,
};

export default FeaturesCard;
