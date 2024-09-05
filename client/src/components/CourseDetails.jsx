import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../globalVariables";
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

const CourseDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [course, setCourse] = useState(null);

  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails();
  }, [id]);

  return (
    <div>
      <Navbar />
      {!course ? (
        <div>Loading...</div>
      ) : (
        <div className="container mx-auto mt-6 flex flex-col items-center justify-center gap-8 p-0 rounded-lg max-w-7xl px-4 pb-12">
          <div className="flex flex-col gap-2 w-full">
            <h2 className="text-3xl font-bold bg-clip-text text-white rounded-lg transform transition">
              {course.name}
            </h2>
            <p className="text-xl text-white leading-relaxed tracking-wide">
              {course.description}
            </p>
          </div>

          <div className="flex gap-2 w-full items-center">
            <p className="text-lg font-bold text-white transition p-0 m-0">
              Instructor -
            </p>
            <p className="text-lg text-white font-bold m-0 p-0">
              {course.instructor}
            </p>
          </div>

          <div className="flex gap-2 w-full items-center">
            <p className="text-lg font-bold text-white transition p-0 m-0">
              Enrollment Status -
            </p>
            <p className="text-lg text-white font-bold m-0 p-0">
              {course.enrollmentStatus}
            </p>
          </div>

          <div className="flex gap-2 w-full">
            <div className="flex items-center gap-1">
              <span className="text-xm font-bold text-white">
                {course.rating}
              </span>
              <div className="rating">
                {[...Array(5)].map((_, index) => (
                  <input
                    key={index}
                    type="radio"
                    name="rating"
                    className="mask mask-star-2 bg-yellow-400 scale-75"
                    checked={index + 1 <= course.rating}
                    readOnly
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xm text-white">{course.reviews}</span>
              <span className="text-xm text-white">reviews</span>
            </div>
          </div>

          <div className="flex justify-center w-full">
            <button
              className="btn btn-primary flex items-center gap-2 px-4 py-2 m-auto ml-0 rounded-xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white font-bold transform transition duration-300 hover:scale-105 hover:from-purple-500 hover:to-red-600 disabled:bg-gradient-to-r disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:text-slate-100"
              disabled={course.enrollmentStatus === "Full"}
              onClick={() => {
                if (
                  enrolledCourses.some(
                    (enrolledCourse) => enrolledCourse.course_id === course._id
                  )
                ) {
                  dispatch(removeCourse(course._id));
                } else {
                  dispatch(enrollCourse(course._id));
                }
              }}
            >
              {enrolledCourses.some(
                (enrolledCourse) => enrolledCourse.course_id === course._id
              ) ? (
                <>
                  <FaCartPlus className="w-6 h-6" />
                  De-enroll
                </>
              ) : (
                <>
                  <FaCartPlus className="w-6 h-6" />
                  Enroll Now
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
              <MdOutlinePlayCircle size={25} />
              <span>{course.duration} of HD Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp size={25} />
              <span>{course.location} </span>
            </div>
            <div className="flex items-center gap-2">
              <MdAccessTimeFilled size={25} />
              <span>{course.schedule} </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <DiRequirejs size={25} />
                <span>Prerequisites</span>
              </div>
              <ul className="flex flex-col gap-2 pl-12 list-disc list-inside">
                {course.prerequisites.map((prerequisite) => (
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
            <Accordion syllabus={course.syllabus} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;
