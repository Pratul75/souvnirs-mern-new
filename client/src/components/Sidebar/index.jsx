import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const isExpanded = useSelector((x) => x.appConfig.sidebarExpanded);

  return (
    <div
      className={`w-16 bg-blue-500 h-screen ${
        isExpanded ? "lg:w-64" : "lg:w-16"
      } transition-all duration-500`}
    >
      {/* Collapsed State */}
      <div className={`p-4 ${isExpanded ? "hidden" : "block"}`}>
        <button
          className="text-white text-xl focus:outline-none"
          // onClick={toggleSidebar}
        >
          <AiOutlineBars />
        </button>
      </div>

      {/* Expanded State */}
      <div className={`p-4 ${isExpanded ? "block" : "hidden"}`}>
        <button
          className="text-white text-xl focus:outline-none"
          // onClick={toggleSidebar}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="mt-4">
          {/* Add your expanded sidebar content here */}
          <p className="text-white">Expanded Content</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
