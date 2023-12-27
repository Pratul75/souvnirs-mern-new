import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { fadeInVariants } from "../../../animation";
import { useSelector } from "react-redux";
const Card = ({ children }) => {
  const darkMode = useSelector((x) => x.appConfig.darkMode);

  return (
    <motion.div
      variants={fadeInVariants}
      animate="animate"
      initial="initial"
      className={` ${
        darkMode ? "bg-cardDarker" : "bg-cardLight"
      } shadow-xl rounded-xl`}
    >
      {children}
    </motion.div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
