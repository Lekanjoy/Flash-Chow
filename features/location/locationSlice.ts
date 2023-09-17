import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: "",
  reducers: {
    clearLocation: (state) => {
      return "";
    },
    updateLocation: (state, action) => {
      return action.payload; 
    },
  },
});
export const { clearLocation, updateLocation } = locationSlice.actions;

export default locationSlice.reducer;