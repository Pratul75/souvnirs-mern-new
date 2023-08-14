import PropTypes from "prop-types";

const Banner = ({ bannerImage, text, navigation }) => {
  return (
    <div className="bg-base-200 w-full h-96 relative mt-8">
      <div>
        <div className="absolute top-1/2 left-1/4">
          <h1 className="text-2xl">{text}</h1>
          <p className="text-primary font-bold">{navigation}</p>
        </div>
        <img
          className="absolute right-44 w-96 bottom-0 "
          src={bannerImage}
          alt="bannerImage"
        />
      </div>
    </div>
  );
};

export default Banner;
