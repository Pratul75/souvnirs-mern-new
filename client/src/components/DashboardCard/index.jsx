import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeInVariants } from "../../animation";
const DashboardCard = ({ number, subheading, iconSvg, iconColor }) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="w-full flex justify-between items-center p-4 rounded-xl bg-base-100 shadow-xl"
    >
      <div>
        <h2 className="text-2xl">{number}</h2>
        <p>{subheading}</p>
      </div>

      <div
        className={` w-12 h-12 flex justify-center items-center rounded-xl  ${iconColor}`}
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
