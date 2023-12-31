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
      <div className="flex flex-col w-full justify-start md:justify-center mt-5  ">
        <div className="  bg-gradient-to-r from-[#7398FF] to-[#B3FEDD]  text-white rounded-xl md:h-[450px] py-4 md:flex md:flex-col">
          <div className="hidden md:block   flex-1 w-96 h-1/2">
            <img
              className="mr-12 w-full h-1/2 object-contain"
              src={imageOne}
              alt=""
            />
          </div>
          <div className=" flex-1">
            <div className="flex flex-col justify-center md:justify-between items-center">
              <h3 className=" text-lg md:text-3xl text-black">{mainHeading}</h3>
              <h3 className="text-lg md:text-3xl  text-black">{subHeading}</h3>
            </div>
            <div className="flex gap-2 flex-1  justify-center">
              <button className="btn btn-sm md:btn-md bg-shopPrimaryColor text-white border-none outline-none ">
                Shop Now
              </button>
            </div>
          </div>
          <div className="hidden md:block w-80 h-1/2">
            <img
              className="w-full h-1/2 object-contain"
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
