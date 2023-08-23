import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ScrollAnimationWrapper";
const FullWidthBannerCard = ({
  imageOne,
  imageTwo,
  mainHeading,
  subHeading,
}) => {
  return (
    <ScrollAnimationWrapper>
      <div className="flex flex-col w-full justify-center mt-8">
        <div className=" py-10 bg-gradient-to-r from-[#7398FF] to-[#B3FEDD] p-6 flex justify-between items-center text-white rounded-xl px-16 mt-16">
          <div className="hidden md:block w-96 h-full">
            <img
              className="mr-12 w-full h-full object-contain"
              src={imageOne}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h3 className="font-medium text-xl md:text-6xl text-black text-center">
              {mainHeading}
            </h3>
            <h3 className="text-4xl md:text-6xl font-medium text-black text-center">
              {subHeading}
            </h3>
            <div>
              <button className="btn btn-lg bg-shopPrimaryColor text-white border-none outline-none ">
                Shop Now
              </button>
            </div>
          </div>
          <div className="hidden md:block w-80 h-full">
            <img
              className="w-full h-full object-contain"
              src={imageTwo}
              alt=""
            />
          </div>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

FullWidthBannerCard.propTypes = {
  imageOne: PropTypes.string.isRequired,
  imageTwo: PropTypes.string.isRequired,
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};

export default FullWidthBannerCard;
