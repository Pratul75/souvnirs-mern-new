import PropTypes from "prop-types";
import HeaderBanner from "../../assets/images/HeaderBanner.png";

const Header = ({ heading, subheading, image }) => {
  return (
    <div className="w-full relative">
      <img
        className="w-full h-auto object-cover"
        src={HeaderBanner}
        alt="header-banner"
      />
      <div className="  absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 text-black">
        <div className="ml-8">
          <h1 className="text-4xl font-bold mb-4 text-white">{heading}</h1>
          <p className="text-xl text-white w-3/4 mt-4">{subheading}</p>
        </div>
        <img
          className="absolute right-10 top-0"
          src={image}
          alt="header sub image"
        />
      </div>
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Header;
