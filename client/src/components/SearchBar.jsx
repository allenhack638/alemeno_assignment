import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const SearchBarWithDropdown = ({ setFilteredCourses }) => {
  const courses = useSelector((state) => state.courses.courses);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    let updatedCourses = [...courses];

    // Apply search term filtering (matching course name or instructor name)
    if (searchTerm) {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Update the filtered courses in the local state
    setFilteredCourses(updatedCourses);
  }, [searchTerm, courses]);

  return (
    <div className="flex justify-start items-center space-x-4 w-full">
      <div className="form-control w-full max-w-xl">
        <input
          type="text"
          placeholder="Search by course or instructor name..."
          className="input input-bordered w-full"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    </div>
  );
};

export default SearchBarWithDropdown;
