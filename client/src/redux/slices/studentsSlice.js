import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await fetch("/api/students");
    return response.json();
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    allStudents: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Define synchronous reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.allStudents = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default studentsSlice.reducer;
