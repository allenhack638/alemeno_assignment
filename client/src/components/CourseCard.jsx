import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl m-4">
      <figure>
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-48 object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {course.name}
          <div className="badge badge-secondary">{course.likes} Likes</div>
        </h2>
        <p>{course.description}</p>
        <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
        <p className="text-sm text-gray-500">
          Enrolled Students: {course.enrolledStudents.length}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Like</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
