import { configureStore } from "@reduxjs/toolkit";
import starSeekerReducer from "../starSeekerSlice";

const store = configureStore({
  reducer: {
    starSeeker: starSeekerReducer,
  },
});

export default store;
