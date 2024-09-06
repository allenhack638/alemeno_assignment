import React from "react";
import { Link } from "react-router-dom";

const EmptyCourseList = () => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="text-center bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="text-2xl font-bold text-gray-100 mb-4">
          You have not enrolled in any course yet.
        </p>
        <Link
          to="/"
          className="text-gray-300 underline hover:text-gray-100 transition duration-200"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default EmptyCourseList;
