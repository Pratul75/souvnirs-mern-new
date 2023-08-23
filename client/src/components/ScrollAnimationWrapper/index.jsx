import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const ScrollAnimationWrapper = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.8, // Adjust this threshold as needed
  });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    transition: {
      duration: 1,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
