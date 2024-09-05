import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  toggleCompletion,
  updateCourseDetails,
} from "../redux/slices/studentsSlice";
import { API_BASE_URL } from "../globalVariables";
import useCourseFetcher from "../hooks/useCourseFetcher";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const { loading } = useCourseFetcher();
  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-10 p-0 rounded-lg max-w-7xl px-4 pb-10">
        {enrolledCourses.length === 0 ? (
          <div className="text-center">
            <p className="text-2xl font-bold mb-4">
              You have not enrolled for any course till now.
            </p>
            <Link to="/" className="text-blue-500 underline">
              Go to Home Page
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-10 w-full">
            <h1 className="text-2xl font-bold ">Enrolled Courses</h1>

            <div className="flex flex-col gap-10 w-full">
              {enrolledCourses.map((course) => {
                const {
                  course_id,
                  enrolledDate,
                  courseCompleted,
                  thumbnail,
                  name,
                  instructor,
                  duration,
                } = course;

                // Calculate the due date by adding duration to enrolledDate
                const enrolledDateObj = new Date(enrolledDate);
                const dueDate = new Date(
                  enrolledDateObj.setDate(
                    enrolledDateObj.getDate() + duration * 7
                  ) // assuming 'duration' is in weeks
                ).toLocaleDateString();

                return (
                  <div
                    key={course_id}
                    className="card card-side bg-base-100 shadow-[0_0px_15px_rgba(255,255,255,0.2)] flex items-center w-full"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{name}</h2>
                      <p>Instructor: {instructor}</p>
                      <p>Due Date: {dueDate}</p>
                      <p className="flex items-center">
                        Status:{" "}
                        <span
                          className={`ml-2 badge ${
                            courseCompleted ? "badge-success" : "badge-error"
                          }`}
                        >
                          {courseCompleted ? "Completed" : "In Progress"}
                        </span>
                      </p>

                      {/* Toggle Button */}
                      <div className="form-control mt-4 w-max">
                        <label className="cursor-pointer label flex items-center gap-2">
                          <span className="label-text">Mark as Completed</span>
                          <input
                            type="checkbox"
                            checked={courseCompleted}
                            className="toggle toggle-success"
                            onChange={() =>
                              dispatch(toggleCompletion(course_id))
                            }
                          />
                        </label>
                      </div>
                    </div>

                    <figure className="p-4">
                      <img
                        src={thumbnail}
                        alt={name}
                        className="w-52 h-52 object-cover rounded-md"
                      />
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
