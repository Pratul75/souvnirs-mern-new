import { motion } from "framer-motion";
import { fadeInFromRightVariant, fadeInVariants } from "../../../animation";
import PropTypes from "prop-types";
import { BsArrowRight } from "react-icons/bs";
// header card component is uesd to show the main headers of the landing page of shop
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
  secondaryImageTwo,
  productImgOne,
  productImageTwo,
  productImageThree,
}) => {
  return (
    <div>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mt-16 h-[650px]">
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-2 row-span-2 relative"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={mainImage}
            alt=""
          />
          <div className="inset-0 absolute w-full flex items-center justify-around px-4">
            <div>
              <h2 className="text-white text-2xl md:text-6xl font-bold md:leading-[72px]">
                {mainHeading}
              </h2>
              <h3 className="text-white text-2xl md:text-6xl font-bold md:leading-[72px]">
                {mainHeadingTwo}
              </h3>
              <h6 className="text-white marker:text-lg font-normal leading-[33.75px]">
                {mainSubHeading}
              </h6>

              <div className="w-40 h-[50px] px-5 py-px bg-white rounded-[5px] border border-white justify-center items-center gap-[6.18px] inline-flex mt-0 md:mt-10">
                <div className="text-center text-neutral-950 text-sm font-semibold uppercase leading-[48px] flex items-center gap-4">
                  <span className="font-semibold">Shop Now</span>{" "}
                  <BsArrowRight className="text-2xl" />
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <img src={productImgOne} alt="" />
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInFromRightVariant}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={secondaryImageOne}
            alt=""
          />
          <div className="inset-0 absolute flex justify-center items-center gap-8 md:px-6">
            <div>
              <h3 className="text-white text-base font-medium leading-tight">
                {tertioryHeadingOne}
              </h3>
              <div className="text-white text-3xl font-semibold leading-[39px]">
                {tertioryHeadingTwo}
              </div>
              <div className="text-white text-3xl font-semibold leading-[39px]">
                {tertiorySubHeading}
              </div>
              <div className="w-40 h-[50px] px-5 py-px bg-white rounded-[5px] border border-white justify-center items-center gap-[6.18px] inline-flex mt-10">
                <div className="text-center text-neutral-950 text-sm font-semibold uppercase leading-[48px] flex items-center gap-4">
                  <span className="font-semibold">Shop Now</span>{" "}
                  <BsArrowRight className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="hidden md:block md:w-80">
              <img src={productImageThree} alt="" />
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInFromRightVariant}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img
            className="object-cover w-full h-full rounded-xl"
            src={secondaryImageOne}
            alt=""
          />
          <div className="inset-0 absolute flex justify-center items-center gap-8 md:px-6">
            <div>
              <h3 className="text-white text-base font-medium leading-tight">
                {tertioryHeadingOne}
              </h3>
              <div className="text-white text-3xl font-semibold leading-[39px]">
                {tertioryHeadingTwo}
              </div>
              <div className="text-white text-3xl font-semibold leading-[39px]">
                {tertiorySubHeading}
              </div>
              <div className="w-40 h-[50px] px-5 py-px bg-white rounded-[5px] border border-white justify-center items-center gap-[6.18px] inline-flex mt-10">
                <div className="text-center text-neutral-950 text-sm font-semibold uppercase leading-[48px] flex items-center gap-4">
                  <span className="font-semibold">Shop Now</span>{" "}
                  <BsArrowRight className="text-2xl" />
                </div>
              </div>
            </div>
            <div className="hidden md:block md:w-80">
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
