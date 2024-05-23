import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  statusProduct: {
    start: false,
  },
};

const actionSlice = createSlice({
  initialState,
  name: "action",
  reducers: {
    getStatusProductStart: (state) => {
      state.statusProduct.start = true;
    },
    getStatusProductSuccess: (state) => {
      state.statusProduct.start = false;
    },
  },
});

export const { getStatusProductStart, getStatusProductSuccess } = actionSlice.actions;
export default actionSlice.reducer;
