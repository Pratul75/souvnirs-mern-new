import PropTypes from "prop-types";
// the component is to show all the features of the shop in a conscice manner
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
    <div className="bg-[#F0F2F5]  rounded-xl mt-16 px-16 ">
      <div className="flex-col md:flex-row flex  justify-center md:justify-between p-16 px-20">
        <div className="flex items-center gap-5 justify-center md:justify-start ">
          <div className="mr-2">{iconOne}</div>
          <div>
            <div className="text-black text-2xl font-semibold uppercase leading-normal">
              {headingOne}
            </div>
            <div className="text-neutral-700 text-sm font-medium leading-relaxed">
              {subHeadingOne}
            </div>
          </div>
        </div>
        <div className="divider divide-[#ededed] lg:divider-horizontal "></div>
        <div className="flex items-center justify-center md:justify-start gap-5">
          <div className="mr-2">{iconTwo}</div>
          <div>
            <div className="text-black text-2xl font-semibold uppercase leading-normal">
              {headingTwo}
            </div>
            <div className="text-neutral-700 text-sm font-medium leading-relaxed">
              {subHeadingTwo}
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex items-center gap-5 justify-center md:justify-start">
          <div className="mr-2">{iconThree}</div>
          <div>
            <div className="text-black text-2xl font-semibold uppercase leading-normal">
              {headingThree}
            </div>
            <div className="text-neutral-700 text-sm font-medium leading-relaxed">
              {subHeadingThree}
            </div>
          </div>
        </div>
        <div className="divider lg:divider-horizontal"></div>
        <div className="flex items-center gap-5 justify-center md:justify-start">
          <div className="mr-2">{iconFour}</div>
          <div>
            <div className="text-black text-2xl font-semibold uppercase leading-normal">
              {headingFour}
            </div>
            <div className="text-neutral-700 text-sm font-medium leading-relaxed">
              {subHeadingFour}
            </div>
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
