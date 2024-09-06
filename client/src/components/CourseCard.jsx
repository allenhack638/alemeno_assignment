import React, { useCallback, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

import { useSelector, useDispatch } from "react-redux";
import { likeCourse, unlikeCourse } from "../redux/slices/coursesSlice";
import CourseThumbnail from "./CourseThumbnail";

const CourseCard = ({ course, socket, isConnected }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const likedCourses = useSelector((state) => state.courses.likedCourses);

  const isLiked = likedCourses.includes(course._id);

  const handleLikeCourse = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isConnected) return;

      const actionType = isLiked ? "removeLike" : "like";

      socket.emit("updateLikesCount", {
        type: actionType,
        courseId: course._id,
      });

      if (isLiked) {
        dispatch(unlikeCourse(course._id));
      } else {
        dispatch(likeCourse(course._id));
      }
    },
    [isConnected, isLiked, course._id, socket, dispatch]
  );

  const handleSeeMore = () => {
    navigate(`/course/${course._id}`);
  };

  return (
    <div className="card bg-base-100 shadow-[0_0px_15px_rgba(255,255,255,0.2)] m-0 hover:shadow-[0_0px_15px_rgba(255,255,255,0.4)] transition-all duration-200">
      <Link
        to={`/course/${course._id}`}
        className="no-underline h-full flex flex-col justify-between"
      >
        <CourseThumbnail
          thumbnail={course.thumbnail}
          altText={course.name}
          fullWidth={true}
        />

        <div className="card-body py-4 px-5">
          <h2 className="card-title">{course.name}</h2>
          <p>{course.description}</p>
          <p className=" text-gray-500">{course.instructor}</p>
          <div className="card-actions justify-between">
            <button
              onClick={handleLikeCourse}
              className="btn btn-ghost text-red-500 focus:outline-none"
              type="button"
            >
              {isLiked ? <FaHeart size={24} /> : <FaRegHeart size={24} />}
              {course.likes}
            </button>

            <button className="btn btn-primary" onClick={handleSeeMore}>
              See More
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
