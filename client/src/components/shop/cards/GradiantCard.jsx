import PropTypes from "prop-types";
import { BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";

const GradiantCard = ({
  background,
  image,
  title,
  heading,
  subheading,
  link,
  btnColorCode,
}) => {
  const btnStyle = {
    backgroundColor: `#${btnColorCode}`,
  };

  return (
    <div className="relative col-span-3 md:col-span-1">
      <img
        className="object-cover w-full h-full rounded-xl"
        src={background}
        alt="gradiant-background-image"
      />
      <div className="inset-0 absolute flex items-center justify-between px-16">
        <div className="flex flex-col">
          <div className="">
            <h5 className="text-white text-base font-medium leading-tight">
              {title}
            </h5>
            <h1 className="text-white text-3xl font-semibold leading-[39px]">
              {heading}
            </h1>
            <h1 className="text-white text-3xl font-semibold leading-[39px]">
              {subheading}
            </h1>
          </div>
          <div className="w-full flex justify-start mt-4">
            <Link
              to={link}
              className={`mt-4 text-white btn outline-none border-none hover:shadow-lg hover:shadow-[#${btnColorCode}]`}
              style={btnStyle}
            >
              Shop Now <BsArrowRightShort className="text-2xl" />
            </Link>
          </div>
        </div>
        <div>
          <img src={image} alt="image" />
        </div>
      </div>
    </div>
  );
};

GradiantCard.propTypes = {
  image: PropTypes.string,
  background: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  subheading: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  btnColorCode: PropTypes.string.isRequired,
};

export default GradiantCard;
