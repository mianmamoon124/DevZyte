// servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../superbaseClient"; // Import the Supabase client

// Async thunk to fetch services
export const fetchServices = createAsyncThunk("services/fetchServices", async () => {
  try {
    const { data, error } = await supabase
      .from("services") // The name of your table in Supabase
      .select("*"); // Fetch all columns from the 'services' table

    if (error) {
      throw new Error(error.message);
    }
    return data; // Return the services data
  } catch (error) {
    throw new Error(error.message);
  }
});

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
