import { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animation";
const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInVariants}
      className="mt-4 rounded-xl border-[1px] border-base-100 bg-base-200 shadow-xl"
    >
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2  hover:text-gray-700 cursor-pointer ${
              activeTab === index
                ? "text-blue-500  border-b-2 border-blue-500 py-4"
                : ""
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`p-4 bg-base-100 rounded-b-xl ${
              activeTab === index
                ? "bg-base-100 transition-opacity duration-500"
                : "hidden"
            }`}
            style={{
              opacity: activeTab === index ? 1 : 0,
              width: activeTab === index ? "100%" : "0",
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// tabs props
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;
