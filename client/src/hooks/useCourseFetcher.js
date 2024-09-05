import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCourseDetails } from "../redux/slices/studentsSlice";
import { API_BASE_URL } from "../globalVariables";

const useCourseFetcher = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(
    (state) => state.students.enrolledCourses
  );
  const [fetchedCourses, setFetchedCourses] = useState(new Set());

  const fetchCourseDetails = async (course_id) => {
    try {
      if (!loading) setLoading(true);

      const response = await fetch(`${API_BASE_URL}/courses/${course_id}`);
      const data = await response.json();

      dispatch(updateCourseDetails({ course_id, details: data }));
      setFetchedCourses((prev) => new Set(prev).add(course_id)); // Mark as fetched
    } catch (error) {
      console.error("Error fetching course details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    enrolledCourses.forEach((course) => {
      if (!fetchedCourses.has(course.course_id)) {
        fetchCourseDetails(course.course_id);
      }
    });
  }, [enrolledCourses, fetchedCourses]);

  return { fetchedCourses, loading };
};

export default useCourseFetcher;
