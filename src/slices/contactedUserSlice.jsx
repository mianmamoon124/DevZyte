// contactedUserSlice.js
"use client"
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../superbaseClient"; // Import the Supabase client

// Async thunk to fetch contacted users
export const fetchContactedUsers = createAsyncThunk(
  "contactedUser/fetchContactedUsers",
  async () => {
    try {
      const { data, error } = await supabase
        .from("contactedUser") // Name of your Supabase table
        .select("*"); // Fetch all columns from the 'contactedUser' table

      if (error) {
        throw new Error(error.message);
      }
      return data; // Return the contacted user data
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const contactedUserSlice = createSlice({
  name: "contactedUser",
  initialState: {
    users: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload; // Populate the state with fetched data
      })
      .addCase(fetchContactedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Capture any error message
      });
  },
});

export default contactedUserSlice.reducer;
