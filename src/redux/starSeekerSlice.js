import { createSlice } from "@reduxjs/toolkit";

export const starSeekerSlice = createSlice({
  name: "starSeeker",
  initialState: {
    departures: [],
    fromLocation: "",
    toLocation: "",
  },
  reducers: {
    setDepartures: (state, action) => {
      state.departures = action.payload;
    },
    setFromLocation: (state, action) => {
      state.fromLocation = action.payload;
    },
    setToLocation: (state, action) => {
      state.toLocation = action.payload;
    },
  },
});

export const { setDepartures, setFromLocation, setToLocation } =
  starSeekerSlice.actions;

export default starSeekerSlice.reducer;
