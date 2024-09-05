import React from "react";

import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import SearchBarWithDropdown from "./SearchBar";

const Home = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-10 p-0 rounded-lg max-w-7xl px-4">
        <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-center bg-clip-text p-2 text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg transform transition">
            Level Up Your Coding Skills
          </h2>

          <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-2xl leading-relaxed tracking-wide p-0 rounded-lg transform transition duration-500 m-0">
            Whether you want to excel in web development, mobile development, or
            strengthen your fundamental software engineering skills, there is a
            course for you.
          </p>
        </div>

        <SearchBarWithDropdown />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 py-5">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
