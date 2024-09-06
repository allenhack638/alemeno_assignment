import React from "react";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { toggleCompletion } from "../redux/slices/studentsSlice";
import useEnrolledCourseFetcher from "../hooks/useEnrolledCourseFetcher";
import ProgressBar from "./ProgressBar";
import { calculateEndDate } from "../functions";
import EmptyCourseList from "./ErrorCards/EmptyCourseList";

const UserDashboard = () => {
  const dispatch = useDispatch();
  useEnrolledCourseFetcher();

  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-10 p-0 rounded-lg max-w-7xl px-4 pb-10">
        {enrolledCourses.length === 0 ? (
          <EmptyCourseList />
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

                const dueDate = calculateEndDate(enrolledDate, duration);

                return (
                  <div
                    key={course_id}
                    className="card card-side bg-base-100 shadow-[0_0px_15px_rgba(255,255,255,0.2)] flex items-center w-full flex-col sm:flex-row"
                  >
                    <div className="card-body">
                      <h2 className="card-title text-white">{name}</h2>
                      <p>
                        <span className="font-bold">Instructor: </span>
                        {instructor}
                      </p>
                      <p>
                        <span className="font-bold">Due Date: </span>
                        {dueDate}
                      </p>
                      <p className="flex items-center">
                        <span className="font-bold">Status: </span>
                        <span
                          className={`ml-2 badge ${
                            courseCompleted ? "badge-success" : "badge-error"
                          }`}
                        >
                          {courseCompleted ? "Completed" : "In Progress"}
                        </span>
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="font-bold">Progress: </span>
                        <ProgressBar
                          progress={courseCompleted ? 100 : 8}
                          width="w-48"
                          className={`${
                            courseCompleted ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span
                          className={`${
                            courseCompleted ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {courseCompleted ? "100%" : "8%"}
                        </span>
                      </div>

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

                    <figure className="p-4 hidden md:block">
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
