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
    <div className="flex flex-col md:flex-row md:justify-around gap-4 my-16">
      <ScrollAnimationWrapper>
        <div className="flex-1 md:col-span-1 relative">
          <img className="rounded-xl w-full" src={backgroundImageOne} alt="" />
          <div className="inset-0 absolute flex justify-between items-center px-16 ">
            <div className="flex flex-col  justify-center">
              <h1 className="md:text-2xl">{headingOne}</h1>
              <h2 className="md:text-[60px]  font-bold md:leading-[60px]">
                {cardTitleOne.toUpperCase()}
              </h2>
              <button
                className="btn w-2/3 bg-orange-500 text-white mt-4"
                onClick={buttonHandlerOne}
              >
                Shop Now <BsArrowRightShort className="md:text-2xl" />
              </button>
            </div>

            <img
              className=" object-contain"
              style={{
                mixBlendMode: "multiply",
                width: "70%",
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
          <div className="inset-0 absolute flex justify-between items-center px-16">
            <div className="flex flex-col  justify-center">
              <h1 className="text-2xl">{headingOne}</h1>
              <h2 className="md:text-[60px]  font-bold  md:leading-[60px]">
                {cardTitleOne.toUpperCase()}
              </h2>
              <button
                className="btn w-2/3 bg-orange-500 text-white mt-4 "
                onClick={buttonHandlerOne}
              >
                Shop Now <BsArrowRightShort className="text-2xl" />
              </button>
            </div>
            <img
              className=" object-contain"
              style={{
                mixBlendMode: "multiply",
                width: "70%",
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
