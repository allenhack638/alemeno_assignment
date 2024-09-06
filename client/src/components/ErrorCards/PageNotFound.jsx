import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className=" flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-6xl font-bold text-gray-100 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-100 mb-6">
          Oops! Page Not Found.
        </p>
        <Link
          to="/"
          className="text-gray-300 underline hover:text-gray-100 transition duration-200"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
