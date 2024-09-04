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
  },
  reducers: {
    // Define synchronous reducers here if needed
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

export default coursesSlice.reducer;
