import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-screen z-50 h-screen flex justify-center items-center bg-violet-300  bg-opacity-25">
      <span className="loading loading-ring w-24 h-24 "></span>
    </div>
  );
};

export default Loading;
