import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/course/${course._id}`); // Navigate to the course details page with course ID
  };

  return (
    <div className="card bg-base-100 shadow-[0_0px_15px_rgba(255,255,255,0.2)] m-0 hover:shadow-[0_0px_15px_rgba(255,255,255,0.4)] transition-all duration-200">
      <figure>
        <img src={course.thumbnail} alt={course.name} className="w-full " />
      </figure>
      <div className="card-body py-4 px-5">
        <h2 className="card-title">{course.name}</h2>
        <p>{course.description}</p>
        <div className="card-actions justify-between">
          <button
            onClick={() => {}}
            className="btn btn-ghost text-red-500 focus:outline-none"
          >
            {false ? <FaHeart size={24} /> : <FaRegHeart size={24} />}

            {course.likes}
          </button>

          <button className="btn btn-primary" onClick={handleSeeMore}>
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
