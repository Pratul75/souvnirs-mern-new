import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";

const TopHeader = ({ heading, language, currency }) => {
  return (
    <div className="bg-[#F0F0F0] px-4 md:px-16 py-2 md:py-4 flex justify-between items-center">
      <div className="marquee-container flex flex-1">
        <h5 className="hidden md:flex md:w-full marquee-content gradient-text">
          {heading}
        </h5>
      </div>
      <div className="flex justify-end gap-4">
        <h6 className="flex justify-end items-center gap-4 text-sm font-medium">
          {language}
          <span className="cursor-pointer">
            <IoIosArrowDown />
          </span>
        </h6>
        |
        <h6 className="flex items-center gap-4 text-sm font-medium">
          {currency}
          <span className="cursor-pointer">
            <IoIosArrowDown />
          </span>
        </h6>
      </div>
    </div>
  );
};

TopHeader.propTypes = {
  heading: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
};

export default TopHeader;
