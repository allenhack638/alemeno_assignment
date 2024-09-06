import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { FaCartPlus } from "react-icons/fa6";
import { MdOutlinePlayCircle } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { DiRequirejs } from "react-icons/di";
import { MdAccessTimeFilled } from "react-icons/md";
import { BiSolidSpreadsheet } from "react-icons/bi";
import Accordion from "./Accordion";
import { useDispatch, useSelector } from "react-redux";
import { enrollCourse, removeCourse } from "../redux/slices/studentsSlice";

import toast from "react-hot-toast";

import { FaMinusCircle, FaLock } from "react-icons/fa";
import LoadingState from "./LoaderCards/LoadingState";
import CourseNotFound from "./ErrorCards/CourseNotFound";
import CourseThumbnail from "./CourseThumbnail";
import useFetchCourseDetails from "../hooks/useFetchCourseDetails";
const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { course, error, loading } = useFetchCourseDetails(id); // use the custom hook

  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <CourseNotFound message={error} />;
  }

  return (
    <div>
      <Navbar />
      {course && (
        <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-8 p-0 rounded-lg max-w-7xl px-4 pb-12">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-3xl font-bold bg-clip-text text-white rounded-lg transform transition">
              {course?.name}{" "}
              <span
                className={`text-2xl ${
                  course?.enrollmentStatus === "Closed"
                    ? "text-slate-400"
                    : "text-slate-50"
                }`}
              >
                ({course?.enrollmentStatus})
              </span>
            </h2>
            <p className="text-xl text-white leading-relaxed tracking-wide">
              {course?.description}
            </p>
          </div>

          <CourseThumbnail thumbnail={course.thumbnail} altText={course.name} />

          <div className="flex gap-2 w-full items-center">
            <p className="text-lg font-bold text-white transition p-0 m-0">
              Instructor -
            </p>
            <p className="text-lg text-white font-bold m-0 p-0">
              {course?.instructor}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <span className="text-xm font-bold text-white">
                {course?.rating}
              </span>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400 scale-75"
                    checked={index + 1 <= course?.rating}
                    readOnly
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xm text-white">{course?.reviews}</span>
              <span className="text-xm text-white">reviews</span>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <button
              className={`btn btn-primary flex items-center gap-4 px-6 py-2 m-auto ml-0 rounded-xl bg-gradient-to-r 
    ${
      course?.enrollmentStatus === "Open"
        ? "from-purple-400 via-pink-500 to-red-500"
        : "from-gray-400 via-gray-500 to-gray-600"
    } 
    text-white font-bold transform transition duration-300 
    ${
      course?.enrollmentStatus === "Open"
        ? "hover:from-purple-500 hover:to-red-600"
        : "disabled:cursor-not-allowed disabled:opacity-700 disabled:text-black"
    }`}
              disabled={course?.enrollmentStatus === "Closed"}
              onClick={() => {
                if (
                  enrolledCourses.some(
                    (enrolledCourse) => enrolledCourse.course_id === course._id
                  )
                ) {
                  toast.success("Course De-enrolled");
                  dispatch(removeCourse(course._id));
                } else {
                  toast.success(`You have enrolled for ${course.name}`);
                  dispatch(enrollCourse(course._id));
                }
              }}
            >
              {course?.enrollmentStatus === "Closed" ? (
                <>
                  <FaLock size={20} />
                  Enrollment Closed
                </>
              ) : enrolledCourses.some(
                  (enrolledCourse) => enrolledCourse.course_id === course._id
                ) ? (
                <>
                  <FaMinusCircle size={20} />
                  De-enroll
                </>
              ) : (
                <>
                  <FaCartPlus size={20} />
                  Enroll Now
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <MdOutlinePlayCircle size={25} />
              <span>{course?.duration} of HD Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp size={25} />
              <span>{course?.location} </span>
            </div>
            <div className="flex items-center gap-2">
              <MdAccessTimeFilled size={25} />
              <span>{course?.schedule} </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <DiRequirejs size={25} />
                <span>Prerequisites</span>
              </div>
              <ul className="flex flex-col gap-2 pl-12 list-disc list-inside">
                {course?.prerequisites?.map((prerequisite) => (
                  <li key={prerequisite}>{prerequisite}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <BiSolidSpreadsheet size={25} />
              <span>Syllabus</span>
            </div>
            <Accordion syllabus={course?.syllabus} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
