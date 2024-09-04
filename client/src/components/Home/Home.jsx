import React from "react";

import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import CourseCard from "../CourseCard";

const Home = () => {
  const { courses } = useSelector((state) => state.courses);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Available Courses
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
