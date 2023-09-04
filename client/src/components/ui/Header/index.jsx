import PropTypes from "prop-types";
import HeaderBanner from "../../../assets/images/HeaderBanner.png";
import { headerVariant } from "../../../animation";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import DarkModeHeaderImage from "../../../assets/images/bannerDarkMode.png";

const Header = ({ heading, subheading, image }) => {
  const darkMode = useSelector((x) => x.appConfig.darkMode);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={headerVariant}
      className="relative"
    >
      <div className="w-full">
        <div className="m-4  md:m-0">
          <img
            className={`w-full h-72 object-cover rounded-xl ${
              darkMode ? "brightness-100" : ""
            } `}
            src={darkMode ? DarkModeHeaderImage : HeaderBanner}
            alt="header-banner"
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-between px-8 h-auto">
          <div className="ml-12">
            <h1
              className={`text-2xl md:text-4xl mb-4 font-bold ${
                darkMode ? "text-[#12183A]" : "text-white"
              }`}
            >
              {heading}
            </h1>
            <p
              className={` hidden md:block ${
                darkMode ? "text-[#12183A]" : "text-white"
              }  font-medium w-[60%] my-4 text-xs md:text-lg`}
            >
              {subheading}
            </p>
          </div>
          {image && (
            <img
              className="hidden md:block md:mr-14"
              src={image}
              alt="header image"
            />
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
