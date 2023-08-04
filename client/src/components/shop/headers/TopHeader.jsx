import PropTypes from "prop-types";
import { IoIosArrowDown } from "react-icons/io";

const TopHeader = ({ heading, language, currency }) => {
  return (
    <div className="bg-[#F0F0F0] px-[85px] py-[14px] flex justify-between items-center">
      <h5>{heading}</h5>
      <div className="flex gap-4">
        <h6 className="flex items-center gap-4 text-sm font-medium">
          {language}
          <span className="cursor-pointer">
            <IoIosArrowDown />
          </span>{" "}
        </h6>
        |
        <h6 className="flex items-center gap-4 text-sm font-medium">
          {currency}
          <span className="cursor-pointer">
            <IoIosArrowDown />
          </span>{" "}
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
