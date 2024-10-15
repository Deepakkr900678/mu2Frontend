import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refresh: false,
};

const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setRefresh: (state, action) => {
      state.refresh = action.payload;
    },
  },
});

export default refreshSlice.reducer;
export const { setRefresh } = refreshSlice.actions;
