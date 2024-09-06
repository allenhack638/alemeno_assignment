import React from "react";
import { MdOutlineError } from "react-icons/md";

const CourseNotFound = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-gray-800 rounded-lg shadow-lg">
        <MdOutlineError size={80} className="text-gray-400" />
        <p className="text-2xl font-bold text-gray-100 text-center">
          {message || "Course not found. Please try again."}
        </p>
        <button
          className="mt-4 px-6 py-2 bg-gray-700 text-gray-100 rounded-lg shadow-md hover:bg-gray-600 transition-colors duration-300"
          onClick={() => window.location.reload()}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default CourseNotFound;
