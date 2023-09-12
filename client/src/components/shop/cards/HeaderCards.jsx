import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
const HeaderCards = ({
  mainHeading,
  mainHeadingTwo,
  mainSubHeading,
  mainImage,
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
          className="col-span-3 md:col-span-2 row-span-2 h-auto relative"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={mainImage}
            alt=""
          />
          <div className="inset-0 absolute w-full flex flex-col md:flex-row items-center justify-around px-4">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-white text-2xl md:text-6xl font-bold md:leading-[72px]">
                {mainHeading}
              </h2>
              <h3 className="text-white text-2xl md:text-6xl font-bold md:leading-[72px]">
                {mainHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal leading-[33.75px]">
                {mainSubHeading}
              </h6>

              <div className="btn mt-4 ">
                <span className="font-semibold">Shop Now</span>{" "}
                <BsArrowRight className="text-lg font-bold" />
              </div>
            </div>
            <div className="">
              <img src={productImgOne} alt="" />
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
            src={mainImage}
            alt=""
          />
          <div className="inset-0 absolute w-full flex items-center justify-around px-4">
            <div>
              <h2 className="text-white text-lg md:text-xl font-bold">
                {mainHeading}
              </h2>
              <h3 className="text-white text-lg md:text-xl font-bold">
                {mainHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal my-2">
                {mainSubHeading}
              </h6>

              <button className="btn">
                <span className="font-semibold text-black">Shop Now</span>{" "}
                <BsArrowRight className="text-xl text-black" />
              </button>
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
                {mainHeading}
              </h2>
              <h3 className="text-white text-lg md:text-xl font-bold">
                {mainHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal my-2">
                {mainSubHeading}
              </h6>

              <button className="btn">
                <span className="font-semibold text-black">Shop Now</span>
                <BsArrowRight className="text-xl text-black" />
              </button>
            </div>
            <div>
              <img src={productImageTwo} alt="" />
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
