import { BsArrowRightShort } from "react-icons/bs";
import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
const HalfWidthBannerCard = ({
  backgroundImageOne,
  backgroundImageTwo,
  productImageOne,
  productImageTwo,
  cardTitleOne,
  cardTitleTwo,
  headingOne,
  headingTwo,
  buttonHandlerOne,
  buttonHandlerTwo,
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-around gap-4 mt-5">
      <ScrollAnimationWrapper>
        <div className="flex-1 md:col-span-1 relative">
          <img className="rounded-xl w-full" src={backgroundImageOne} alt="" />
          <div className="inset-0 absolute flex justify-between items-center px-4 md:px-16">
            <div className="flex flex-col  justify-center">
              <h1 className="text-sm md:text-2xl">{headingOne}</h1>
              <h2 className=" text-sm md:text-[60px]  font-bold  md:leading-[60px]">
                {cardTitleOne.toUpperCase()}
              </h2>
            </div>
            <img
              className=" object-contain w-32 md:w-[70%]"
              style={{
                mixBlendMode: "multiply",
              }}
              src={productImageOne}
              alt=""
            />
          </div>
        </div>
      </ScrollAnimationWrapper>

      <ScrollAnimationWrapper>
        <div className="flex-1 md:col-span-1 relative">
          <img className="rounded-xl w-full" src={backgroundImageOne} alt="" />
          <div className="inset-0 absolute flex justify-between items-center px-4 md:px-16">
            <div className="flex flex-col  justify-center">
              <h1 className="text-sm md:text-2xl">{headingTwo}</h1>
              <h2 className=" text-sm md:text-[60px]  font-bold  md:leading-[60px]">
                {cardTitleOne.toUpperCase()}
              </h2>
            </div>
            <img
              className=" object-contain w-32 md:w-[70%]"
              style={{
                mixBlendMode: "multiply",
              }}
              src={productImageOne}
              alt=""
            />
          </div>
        </div>
      </ScrollAnimationWrapper>
    </div>
  );
};

HalfWidthBannerCard.propTypes = {
  backgroundImageOne: PropTypes.string.isRequired,
  backgroundImageTwo: PropTypes.string.isRequired,
  productImageOne: PropTypes.string.isRequired,
  productImageTwo: PropTypes.string.isRequired,
  cardTitleOne: PropTypes.string.isRequired,
  cardTitleTwo: PropTypes.string.isRequired,
  headingOne: PropTypes.string.isRequired,
  headingTwo: PropTypes.string.isRequired,
  buttonHandlerOne: PropTypes.func.isRequired,
  buttonHandlerTwo: PropTypes.func.isRequired,
};

export default HalfWidthBannerCard;
