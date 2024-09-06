import React from "react";

const ProgressBar = ({ progress, width = "w-64", className }) => {
  return (
    <div
      className={`bg-gray-300 rounded-full ${width} h-2 relative flex items-baseline`}
    >
      <div
        className={`${className} h-2 rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
      {/* <span className="absolute right-0 top-0 transform translate-x-full ml-2 text-sm font-medium text-gray-700">
        {progress}%
      </span> */}
    </div>
  );
};

export default ProgressBar;
