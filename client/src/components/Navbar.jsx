import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="navbar bg-base-100 shadow-[0_4px_10px_rgba(255,255,255,0.1)] sticky top-0 z-50">
      <div className="flex-1">
        <Link
          className="btn btn-ghost normal-case text-xl lg:flex hidden"
          to="/"
        >
          Edtech Platform
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex gap-4">
          <li>
            <Link
              to="/"
              className={`${
                isActive("/")
                  ? "text-primary font-bold bg-gray-600"
                  : "text-white"
              } hover:text-primary transition-colors duration-200`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard"
              className={`relative flex items-center ${
                isActive("/dashboard")
                  ? "text-primary font-bold bg-gray-600"
                  : "text-white"
              } hover:text-primary transition-colors duration-200`}
            >
              Courses Enrolled
              {enrolledCourses.length > 0 && (
                <div className="badge badge-primary text-stone-50">
                  {enrolledCourses.length}
                </div>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
