import { useState } from "react";
import PropTypes from "prop-types";
// dynamic tabs component

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="border-b h-full mt-4 rounded-xl border-[1px] border-gray-300">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-gray-500 hover:text-gray-700 cursor-pointer ${
              activeTab === index
                ? "text-gray-900 font-semibold border-b-2 border-teal-500"
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
            className={`p-4 border border-b-gray-200 rounded-b-xl ${
              activeTab === index
                ? "bg-base-200 transition-opacity duration-500"
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
    </div>
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
