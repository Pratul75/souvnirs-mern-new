import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeInVariants } from "../../animation";
const Card = ({ children }) => {
  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      className="bg-base-100 shadow-lg rounded-xl h-full"
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
