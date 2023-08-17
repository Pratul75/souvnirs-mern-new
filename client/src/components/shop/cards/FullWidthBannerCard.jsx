import PropTypes from "prop-types";

const FullWidthBannerCard = ({
  imageOne,
  imageTwo,
  mainHeading,
  subHeading,
}) => {
  return (
    <div className="banner py-10 bg-gradient-to-r from-[#7398FF] to-[#B3FEDD] p-6 flex justify-between items-center text-white mx-16 mt-4 rounded-xl h-[400px] px-8">
      <div>
        <img src={imageOne} alt="" />
      </div>
      <div className="flex justify-center flex-col items-center">
        <h3 className="font-medium text-[41.77px] text-black">{mainHeading}</h3>
        <h3 className="text-4xl text-black">{subHeading}</h3>
      </div>
      <div>
        <img src={imageTwo} alt="" />
      </div>
    </div>
  );
};

FullWidthBannerCard.propTypes = {
  imageOne: PropTypes.string.isRequired,
  imageTwo: PropTypes.string.isRequired,
  mainHeading: PropTypes.string.isRequired,
  subHeading: PropTypes.string.isRequired,
};

export default FullWidthBannerCard;
