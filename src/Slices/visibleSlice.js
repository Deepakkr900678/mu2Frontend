import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
};

const visibleSlice = createSlice({
  name: "visible",
  initialState,
  reducers: {
    setVisible: (state, action) => {
      state.isVisible = action.payload;
    },
  },
});

export default visibleSlice.reducer;
export const { setVisible } = visibleSlice.actions;
