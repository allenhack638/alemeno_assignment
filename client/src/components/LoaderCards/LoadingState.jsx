import React from "react";

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <svg
          className="animate-spin h-12 w-12 text-purple-500 mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"
          ></path>
        </svg>
        <p className="mt-4 text-lg font-semibold text-white">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingState;
