import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          Course Platform
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/dashboard" className="relative flex items-center">
              Enroll
              {enrolledCourses.length > 0 && (
                <span className="badge badge-primary absolute top-0 right-0 -translate-x-1/2 translate-y-1/2">
                  {enrolledCourses.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
