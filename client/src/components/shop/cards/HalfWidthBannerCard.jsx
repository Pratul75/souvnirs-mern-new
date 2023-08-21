import { BsArrowRightShort } from "react-icons/bs";
import PropTypes from "prop-types";
const HalfWidthBannerCard = ({
  backgroundImageOne,
  backgroundImageTwo,
  productImageOne,
  productImageTwo,
  cardTitleOne,
  cardTitleTwo,
  headingOne,
  headingTwo,
  buttonHandlerOne,
  buttonHandlerTwo,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-16">
      <div className="col-span-2 md:col-span-1 relative">
        <img
          className="object-cover rounded-xl w-full"
          src={backgroundImageOne}
          alt=""
        />
        <div className="inset-0 absolute flex justify-between items-center px-16">
          <div className="flex flex-col  justify-center">
            <h1 className="text-2xl">{headingOne}</h1>
            <h2 className="text-7xl  font-bold">
              {cardTitleOne.toUpperCase()}
            </h2>
            <button
              className="btn w-1/3 bg-orange-500 text-white mt-4"
              onClick={buttonHandlerOne}
            >
              Shop Now <BsArrowRightShort className="text-2xl" />
            </button>
          </div>
          <img
            className="mr-20"
            style={{
              mixBlendMode: "multiply",
            }}
            src={productImageOne}
            alt=""
          />
        </div>
      </div>
      <div className="col-span-2 md:col-span-1 relative">
        <img
          className="object-cover rounded-xl w-full"
          src={backgroundImageOne}
          alt=""
        />
        <div className="inset-0 absolute flex justify-between items-center px-16">
          <div className="flex flex-col  justify-center">
            <h1 className="text-2xl">{headingOne}</h1>
            <h2 className="text-6xl  font-bold">
              {cardTitleOne.toUpperCase()}
            </h2>
            <button
              className="btn w-1/3 bg-orange-500 text-white mt-4"
              onClick={buttonHandlerOne}
            >
              Shop Now <BsArrowRightShort className="text-2xl" />
            </button>
          </div>
          <img
            className="mr-20"
            style={{
              mixBlendMode: "multiply",
            }}
            src={productImageOne}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

HalfWidthBannerCard.propTypes = {
  backgroundImageOne: PropTypes.string.isRequired,
  backgroundImageTwo: PropTypes.string.isRequired,
  productImageOne: PropTypes.string.isRequired,
  productImageTwo: PropTypes.string.isRequired,
  cardTitleOne: PropTypes.string.isRequired,
  cardTitleTwo: PropTypes.string.isRequired,
  headingOne: PropTypes.string.isRequired,
  headingTwo: PropTypes.string.isRequired,
  buttonHandlerOne: PropTypes.func.isRequired,
  buttonHandlerTwo: PropTypes.func.isRequired,
};

export default HalfWidthBannerCard;
