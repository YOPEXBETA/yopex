import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

export const { changeCategory } = globalSlice.actions;
export default globalSlice.reducer;
