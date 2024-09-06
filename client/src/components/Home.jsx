import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import CourseCard from "./CourseCard";
import SearchBarWithDropdown from "./SearchBar";
import LoadingState from "./LoaderCards/LoadingState";
import CourseNotFound from "./ErrorCards/CourseNotFound";

const Home = ({ socket, isConnected }) => {
  const { courses, loading } = useSelector((state) => state.courses);
  const [filteredCourses, setFilteredCourses] = useState(courses);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-10 p-0 rounded-lg max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center bg-clip-text p-2 text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-lg transform transition">
            Level Up Your Coding Skills
          </h2>

          <p className="text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-lg sm:text-xl lg:text-2xl leading-relaxed tracking-wide p-0 rounded-lg transform transition duration-500 m-0">
            Whether you want to excel in web development, mobile development, or
            strengthen your fundamental software engineering skills, there is a
            course for you.
          </p>
        </div>

        <SearchBarWithDropdown setFilteredCourses={setFilteredCourses} />

        {/* Responsive grid layout */}
        {loading ? (
          <LoadingState />
        ) : filteredCourses.length === 0 ? (
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold">No courses found !!!</h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 py-5">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                socket={socket}
                isConnected={isConnected}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
