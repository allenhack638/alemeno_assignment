import { createSlice } from "@reduxjs/toolkit";
import { fetchCourses } from "../actions/courseActions";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: true,
    currentPage: 1,
    totalPages: 1,
    error: null,
    likedCourses: [],
  },
  reducers: {
    likeCourse: (state, action) => {
      if (!state.likedCourses.includes(action.payload)) {
        state.likedCourses.push(action.payload);
      }
    },
    unlikeCourse: (state, action) => {
      state.likedCourses = state.likedCourses.filter(
        (id) => id !== action.payload
      );
    },
    updateLikeCount: (state, action) => {
      const { id, likes } = action.payload;
      const course = state.courses.find((c) => c._id === id);
      if (course) {
        course.likes = likes;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.courses;
        state.currentPage = action.payload.currentPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { likeCourse, unlikeCourse, updateLikeCount } =
  coursesSlice.actions;

export default coursesSlice.reducer;
