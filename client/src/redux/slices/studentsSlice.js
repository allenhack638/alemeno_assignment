import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  enrolledCourses: [], // Array to hold enrolled courses
};

// Create a slice for user management
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Action to enroll a course
    enrollCourse: (state, action) => {
      const course_id = action.payload;
      const date = new Date().toISOString();
      const id = Date.now().toString(); // Generate a unique id using timestamp

      // Check if the course is already enrolled
      const existingCourse = state.enrolledCourses.find(
        (course) => course.course_id === course_id
      );

      if (!existingCourse) {
        // Add the new course if it doesn't already exist
        state.enrolledCourses.push({
          id,
          course_id,
          enrolledDate: date,
          courseCompleted: false,
        });
      }
      // If the course already exists, you might want to handle it (e.g., update or ignore)
    },

    // Action to mark a course as completed
    toggleCompletion: (state, action) => {
      const course_id = action.payload;
      const course = state.enrolledCourses.find(
        (course) => course.course_id === course_id
      );
      if (course) {
        course.courseCompleted = !course.courseCompleted;
      }
    },

    // Action to remove an enrolled course
    removeCourse: (state, action) => {
      const course_id = action.payload;
      console.log(course_id);
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.course_id !== course_id
      );
    },

    updateCourseDetails: (state, action) => {
      const { course_id, details } = action.payload;

      const courseIndex = state.enrolledCourses.findIndex(
        (course) => course.course_id === course_id
      );

      if (courseIndex !== -1) {
        // Spread the new details directly into the course object
        state.enrolledCourses[courseIndex] = {
          ...state.enrolledCourses[courseIndex],
          ...details,
        };
      }
    },
  },
});

export const {
  enrollCourse,
  toggleCompletion,
  removeCourse,
  updateCourseDetails,
} = userSlice.actions;
export default userSlice.reducer;
