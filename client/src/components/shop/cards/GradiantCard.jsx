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
      <div className="inset-0 absolute flex flex-row md:flex-row items-center justify-center px-4">
        <div className="flex flex-col">
          <div className="">
            <h5 className="text-white md:text-base font-medium ">{title}</h5>
            <h1
              className="text-white textvar bodyParser = require('body-parser');
            app.use(bodyParser.json());
            
            app.delete('/products/:id', function(req, res) {
              const { id } = req.params;
              res.send(`Delete record with id ${id}`);
            }); md:text-3xl font-normal"
            >
              {heading}
            </h1>
            <h1 className="text-white md:text-3xl font-semibold">
              {subheading}
            </h1>
          </div>
          <div className="w-full flex justify-start mt-4">
            <Link
              to={link}
              className={`md:mt-4 text-white btn btn-xs md:btn-md outline-none border-none hover:shadow-lg hover:shadow-[#${btnColorCode}]`}
              style={btnStyle}
            >
              Shop Now{" "}
              <BsArrowRightShort className="text-2xl hidden md:block" />
            </Link>
          </div>
        </div>
        <div className="flex justify-end md:block">
          <img className="md:flex w-3/4 md:w-full" src={image} alt="image" />
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
