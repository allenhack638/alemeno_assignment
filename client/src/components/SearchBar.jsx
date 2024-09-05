import React, { useState } from "react";

const SearchBarWithDropdown = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("All Courses");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="flex justify-start items-center space-x-4 w-full">
      <div className="form-control w-72">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <div className="form-control">
        <select
          className="select select-bordered"
          value={selectedOption}
          onChange={handleOptionChange}
        >
          <option value="All Courses">All Courses</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBarWithDropdown;
