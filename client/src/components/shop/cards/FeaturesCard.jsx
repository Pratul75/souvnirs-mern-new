import { motion } from "framer-motion";
import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";

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
    <ScrollAnimationWrapper>
      <div className="bg-[#F0F2F5]  rounded-xl mt-5 px-8 shadow-lg p-8 ">
        <div className="flex-col md:flex-row flex gap-4  justify-center md:justify-between my-4">
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

          <div className="flex items-center justify-center md:justify-start gap-5 my-4">
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

          <div className="flex items-center gap-5 justify-center md:justify-start my-4">
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

          <div className="flex items-center gap-5 justify-center md:justify-start my-4">
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
    </ScrollAnimationWrapper>
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
