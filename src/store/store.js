// store.js
"use clients"
import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "../slices/servicesSlice"; // The slice we’ll create
import contactedUserReducer from "../slices/contactedUserSlice"


const store = configureStore({
  reducer: {
    services: servicesReducer,
    contactedUser : contactedUserReducer,
  },
});

export default store;
