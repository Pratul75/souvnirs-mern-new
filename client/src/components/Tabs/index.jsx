import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { fadeInVariants } from "../../animation";
import Card from "../Card";

const Tabs = ({ tabs, enableBorder, hasCard }) => {
  const [activeTab, setActiveTab] = useState(0);

  return hasCard ? (
    <Card>
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInVariants}
        className={`mt-4 rounded-xl ${enableBorder ? "border-[1px] border-base-300" : ""
          } bg-base-100`}
      >
        <div className="flex">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-xs hover:text-gray-700 cursor-pointer ${activeTab === index ? "text-blue-500  border-b-2 border-blue-500 py-4" : ""
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border-[1px] border-t-base-300">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`p-4 bg-base-100 rounded-b-xl ${activeTab === index ? "bg-base-100 transition-opacity duration-500" : "hidden"
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
    </Card>
  ) : <motion.div
    initial="initial"
    animate="animate"
    variants={fadeInVariants}
    className={`mt-4 rounded-xl ${enableBorder ? "border-[1px] border-base-300" : ""
      } bg-base-100`}
  >
    <div className="flex">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`px-4 py-2 text-xs hover:text-gray-700 cursor-pointer ${activeTab === index ? "text-blue-500  border-b-2 border-blue-500 py-4" : ""
            }`}
          onClick={() => setActiveTab(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>

    <div className=" border-t-base-300">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`p-4 bg-base-100 rounded-b-xl ${activeTab === index ? "bg-base-100 transition-opacity duration-500" : "hidden"
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
  </motion.div>;
};

// tabs props
Tabs.propTypes = {
  enableBorder: PropTypes.bool,
  hasCard: PropTypes.bool,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;
