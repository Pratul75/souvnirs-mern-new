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
}) => {
  return (
    <div className="relative col-span-3 md:col-span-1">
      <img
        className="object-cover w-full h-full rounded-xl"
        src={background}
        alt="gradiant-background-image"
      />
      <div className="inset-0 absolute flex items-center justify-between px-8">
        <div className="">
          <div className="text-center">
            <h5 className="text-sm">{title}</h5>
            <h1 className="font-bold">{heading}</h1>
            <h1 className="font-bold">{subheading}</h1>
          </div>
          <Link to={link} className="btn mt-4 btn-sm">
            {" "}
            Buy Now <BsArrowRightShort />
          </Link>
        </div>
        <div>
          <img
            style={{
              mixBlendMode: "multiply",
            }}
            src={image}
            alt="image"
          />
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
};

export default GradiantCard;
