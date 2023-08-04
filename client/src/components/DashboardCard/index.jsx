import { motion } from "framer-motion";
import PropTypes from "prop-types";
import Card from "../Card";
const DashboardCard = ({
  number,
  subheading,
  iconSvg,
  iconColor,
  textColor,
}) => {
  return (
    <Card>
      <motion.div className="w-full flex justify-between items-center py-4 px-6">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">
            {number}+
          </h2>
          <p className={`text-xs md:text-sm ${textColor}`}>{subheading}</p>
        </div>

        <div
          className={` p-2 flex justify-center items-center rounded-xl ${iconColor}`}
        >
          {iconSvg}
        </div>
      </motion.div>
    </Card>
  );
};

DashboardCard.propTypes = {
  number: PropTypes.number,
  subheading: PropTypes.string.isRequired,
  iconSvg: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
};

export default DashboardCard;
