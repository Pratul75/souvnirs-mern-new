import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const HeaderCards = ({
  mainHeading,
  mainHeadingTwo,
  mainSubHeading,
  mainImage,
  secondaryHeadingOne,
  secondaryHeadingTwo,
  secondarySubHeadingOne,
  tertioryHeadingOne,
  tertioryHeadingTwo,
  tertiorySubHeading,
  secondaryImageOne,
  productImgOne,
  productImageTwo,
  productImageThree,
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-4 h-full md:h-auto">
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-2 row-span-2 h-[80vh] md:h-auto relative"
        >
          <img className="w-full h-full rounded-xl " src={mainImage} alt="" />
          <div className="inset-0 absolute w-full flex flex-col md:flex-row items-center justify-around px-4">
            <div className="flex flex-col items-center md:items-start justify-center w-96">
              <h2 className="text-white text-2xl md:text-5xl font-bold">
                {mainHeading}
              </h2>
              <h3 className="text-white text-2xl md:text-4xl font-bold">
                {mainHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal leading-[33.75px]">
                {mainSubHeading}
              </h6>
              <Link to={"/productInfo/5e76ef16"} className="btn mt-4 ">
                <span className="font-semibold">Shop Now</span>{" "}
                <BsArrowRight className="text-lg font-bold" />
              </Link>
            </div>
            <div className="">
              <img
                src={productImgOne}
                className=" md:absolute md:right-10 top-10 h-3/4"
                alt=""
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-1 relative h-[30vh]"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={secondaryImageOne}
            alt=""
          />
          <div className="inset-0 absolute w-full flex items-center justify-around px-4">
            <div>
              <h2 className="text-white text-lg md:text-xl font-bold">
                {secondaryHeadingOne}
              </h2>
              <h3 className="text-white text-lg md:text-xl font-bold">
                {secondaryHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal my-2">
                {secondarySubHeadingOne}
              </h6>

              <Link
                to={`/collection/Electronics%20Accessories`}
                className="btn"
              >
                <span className="font-semibold text-black">Shop Now</span>{" "}
                <BsArrowRight className="text-xl text-black" />
              </Link>
            </div>
            <div>
              <img src={productImageTwo} alt="" />
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-2 relative h-[30vh]"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={mainImage}
            alt=""
          />
          <div className="inset-0 absolute w-full flex items-center justify-around px-4">
            <div>
              <h2 className="text-white text-lg md:text-xl font-bold">
                {tertioryHeadingOne}
              </h2>
              <h3 className="text-white text-lg md:text-xl font-bold">
                {tertioryHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal my-2">
                {tertiorySubHeading}
              </h6>

              <Link to={"/productInfo/15b3dae3"} className="btn">
                <span className="font-semibold text-black">Shop Now</span>
                <BsArrowRight className="text-xl text-black" />
              </Link>
            </div>
            <div>
              <img src={productImageThree} alt="" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

HeaderCards.propTypes = {
  mainHeading: PropTypes.string.isRequired,
  mainHeadingTwo: PropTypes.string.isRequired,
  mainSubHeading: PropTypes.string.isRequired,
  mainImage: PropTypes.string.isRequired,
  secondaryHeadingOne: PropTypes.string.isRequired,
  secondaryHeadingTwo: PropTypes.string.isRequired,
  secondarySubHeadingOne: PropTypes.string.isRequired,
  tertioryHeadingOne: PropTypes.string.isRequired,
  tertioryHeadingTwo: PropTypes.string.isRequired,
  tertiorySubHeading: PropTypes.string.isRequired,
  secondaryImageOne: PropTypes.string.isRequired,
  secondaryImageTwo: PropTypes.string.isRequired,
  productImgOne: PropTypes.string.isRequired,
  productImageTwo: PropTypes.string.isRequired,
  productImageThree: PropTypes.string.isRequired,
};

export default HeaderCards;
