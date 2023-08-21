import PropTypes from "prop-types";

const FullWidthBannerCard = ({
  imageOne,
  imageTwo,
  mainHeading,
  subHeading,
}) => {
  return (
    <div className="banner py-10 bg-gradient-to-r from-[#7398FF] to-[#B3FEDD] p-6 flex justify-between items-center text-white rounded-xl h-[400px] px-8 mt-16">
      <div>
        <img className="mr-12 w-96" src={imageOne} alt="" />
      </div>
      <div className="flex justify-center flex-col items-center">
        <h3 className="font-medium text-[41.77px] text-black">{mainHeading}</h3>
        <h3 className="text-4xl text-black">{subHeading}</h3>
      </div>
      <div>
        <img className="mt-7" src={imageTwo} alt="" />
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
