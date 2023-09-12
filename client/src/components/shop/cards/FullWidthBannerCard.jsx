import PropTypes from "prop-types";
import ScrollAnimationWrapper from "../../ui/ScrollAnimationWrapper";
const FullWidthBannerCard = ({
  imageOne,
  imageTwo,
  mainHeading,
  subHeading,
}) => {
  return (
    <ScrollAnimationWrapper>
      <div className="flex flex-col w-full justify-start md:justify-center mt-5 ">
        <div className="  bg-gradient-to-r from-[#7398FF] to-[#B3FEDD]  text-white rounded-xl py-4">
          <div className="hidden md:block w-96 h-full">
            <img
              className="mr-12 w-full h-full object-contain"
              src={imageOne}
              alt=""
            />
          </div>
          <div className="">
            <div className="flex flex-col justify-center items-center">
              <h3 className=" text-lg md:text-6xl text-black">{mainHeading}</h3>
              <h3 className="text-lg md:text-6xl  text-black">{subHeading}</h3>
            </div>
            <div className="flex gap-2  justify-center">
              <button className="btn btn-sm md:btn-lg bg-shopPrimaryColor text-white border-none outline-none ">
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
