import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl" href="/">
          Course Platform
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 flex gap-2">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
