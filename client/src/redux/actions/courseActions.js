import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../globalVariables";

// Async thunk to fetch courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/courses?page=1&limit=5`);
      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);
