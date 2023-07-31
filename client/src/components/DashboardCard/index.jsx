import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeInVariants } from "../../animation";

const DashboardCard = ({ number, subheading, iconSvg, iconColor }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="w-full  flex justify-between items-center p-4 rounded-xl bg-base-100 border-[1px] border-base-300"
    >
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl lg:text-3xl">{number}</h2>
        <p className="text-xs md:text-sm">{subheading}</p>
      </div>

      <div
        className={`w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex justify-center items-center rounded-xl ${iconColor}`}
      >
        {iconSvg}
      </div>
    </motion.div>
  );
};

DashboardCard.propTypes = {
  number: PropTypes.number,
  subheading: PropTypes.string.isRequired,
  iconSvg: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
};

export default DashboardCard;
