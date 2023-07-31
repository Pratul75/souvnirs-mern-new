import PropTypes from "prop-types";
import HeaderBanner from "../../assets/images/HeaderBanner.png";
import { headerVariant } from "../../animation";
import { motion } from "framer-motion";
const Header = ({ heading, subheading, image }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={headerVariant}
      className="relative w-screen "
    >
      <div className="w-screen h-auto">
        <img
          className="w-full h-auto object-cover"
          src={HeaderBanner}
          alt="header-banner"
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center px-8 text-black">
        <div className="ml-8">
          <h1 className="text-2xl md:text-4xl mb-4 text-white">{heading}</h1>
          <p className="hidden md:block text-white text-2xl font-thin w-[60%] my-4">
            {subheading}
          </p>
        </div>
        {image && (
          <img
            className="relative right-0 top-2 h-full my-10"
            src={image}
            alt="header image"
          />
        )}
      </div>
    </motion.div>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  image: PropTypes.string,
};

export default Header;
