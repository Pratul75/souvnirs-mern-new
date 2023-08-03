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
      className="relative"
    >
      <div className="w-full h-auto">
        <img
          className="w-full h-auto object-cover"
          src={HeaderBanner}
          alt="header-banner"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="ml-8">
            <h1 className="text-2xl md:text-2xl mb-4 text-white">{heading}</h1>
            <p className="hidden md:block text-white text-lg font-thin w-[60%] my-4 text-l">
              {subheading}
            </p>
          </div>
          {image && (
            <img className="hidden md:block" src={image} alt="header image" />
          )}
        </div>
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
