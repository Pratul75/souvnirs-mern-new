import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
const FadeInDiv = ({ children }) => {
  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      {React.Children.map(children, (child) => (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeInVariants}
        >
          {child}
        </motion.div>
      ))}
    </>
  );
};

FadeInDiv.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInDiv;
