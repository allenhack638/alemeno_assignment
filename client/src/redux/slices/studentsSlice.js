import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    enrollCourse: (state, action) => {
      const course_id = action.payload;
      const date = new Date().toISOString();
      const id = Date.now().toString();

      const existingCourse = state.enrolledCourses.find(
        (course) => course.course_id === course_id
      );

      if (!existingCourse) {
        state.enrolledCourses.push({
          id,
          course_id,
          enrolledDate: date,
          courseCompleted: false,
        });
      }
    },

    toggleCompletion: (state, action) => {
      const course_id = action.payload;
      const course = state.enrolledCourses.find(
        (course) => course.course_id === course_id
      );
      if (course) {
        course.courseCompleted = !course.courseCompleted;
      }
    },

    removeCourse: (state, action) => {
      const course_id = action.payload;
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
