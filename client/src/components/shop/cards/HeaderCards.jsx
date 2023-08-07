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
            <h1 className="text-5xl text-white font-bold">{mainHeading}</h1>
            <h2 className="text-5xl text-white font-bold">{mainHeadingTwo}</h2>
            <p className="text-sm text-white font-semibold">{mainSubHeading}</p>
            <button className="btn bg-white text-black text-bold   gap-4">
              Shop now
              <IoMdArrowForward className="text-2xl" />
            </button>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img className="object-cover w-full" src={secondaryImageOne} alt="" />
          <div className="inset-0 absolute p-4 flex flex-col gap-2  items-start justify-center mx-16">
            <h1 className="text-lg text-white">{secondaryHeadingOne}</h1>
            <h2 className="text-2xl text-white font-bold">
              {secondaryHeadingTwo}
            </h2>
            <p className="text-2xl text-white font-semibold">
              {secondarySubHeadingOne}
            </p>
            <button className="btn btn-sm bg-white text-black text-bold   gap-4">
              Shop now
              <IoMdArrowForward className="text-2xl" />
            </button>
          </div>
        </motion.div>
        <motion.div
          animate="animate"
          initial="initial"
          variants={fadeInVariants}
          className="col-span-3 md:col-span-1 row-span-1 relative"
        >
          <img className="object-cover w-full" src={secondaryImageTwo} alt="" />
          <div className="inset-0 absolute p-4 flex flex-col gap-2  items-start justify-center mx-16">
            <h1 className="text-lg text-white">{tertioryHeadingOne}</h1>
            <h2 className="text-2xl text-white font-bold">
              {tertioryHeadingTwo}
            </h2>
            <p className="text-2xl text-white font-semibold">
              {tertiorySubHeading}
            </p>
            <button className="btn btn-sm bg-white text-black text-bold   gap-4">
              Shop now
              <IoMdArrowForward className="text-2xl" />
            </button>
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
};

export default HeaderCards;
