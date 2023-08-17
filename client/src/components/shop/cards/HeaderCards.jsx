import { IoMdArrowForward } from "react-icons/io";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../../animation";
import PropTypes from "prop-types";

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
      <div className="grid grid-cols-3 grid-rows-2 gap-4 mx-16 mt-4">
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
          <div className="inset-0 absolute p-4 flex flex-col gap-4  items-start justify-center mx-16">
            <div className="w-full flex justify-around">
              <div className="flex flex-col gap-2 justify-center">
                <h1 className="sm:text-3xl md:text-5xl lg:text-8xl text-white font-bold">
                  {mainHeading}
                </h1>
                <h2 className="text-5xl text-white font-bold">
                  {mainHeadingTwo}
                </h2>
                <p className="text-sm text-white font-semibold">
                  {mainSubHeading}
                </p>
                <button className="btn bg-white text-black text-bold w-1/2 gap-4">
                  Shop now
                  <IoMdArrowForward className="text-2xl" />
                </button>
              </div>
              <div className="w-80">
                <img className="w-full" src={productImgOne} />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img className="object-cover w-full" src={secondaryImageOne} alt="" />
          <div className="inset-0 absolute p-4 flex flex-col gap-2  items-start justify-center mx-8">
            <div className="flex">
              <div className="flex flex-col justify-center">
                <h1 className="text-lg text-white">{secondaryHeadingOne}</h1>
                <h2 className="text-2xl text-white font-bold">
                  {secondaryHeadingTwo}
                </h2>
                <p className="text-2xl text-white font-semibold">
                  {secondarySubHeadingOne}
                </p>
                <button className="btn btn-sm bg-white text-black text-bold mt-2 gap-4">
                  Shop now
                  <IoMdArrowForward className="text-2xl" />
                </button>
              </div>
              <div>
                <img src={productImageTwo} alt="" />
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img className="object-cover w-full" src={secondaryImageTwo} alt="" />
          <div className="inset-0 absolute p-4 flex flex-col gap-2  items-start justify-center mx-4">
            <div className="flex">
              <div className="flex flex-col justify-center w-full">
                <h1 className="text-lg text-white">{tertioryHeadingOne}</h1>
                <h2 className="text-2xl text-white font-bold">
                  {tertioryHeadingTwo}
                </h2>
                <p className="text-2xl text-white font-semibold">
                  {tertiorySubHeading}
                </p>
                <button className="btn btn-sm bg-white text-black text-bold mt-2 gap-4">
                  Shop now
                  <IoMdArrowForward className="text-2xl" />
                </button>
              </div>
              <div>
                <img src={productImageThree} alt="" />
              </div>
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
