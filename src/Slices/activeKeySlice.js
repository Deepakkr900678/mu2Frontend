import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activekey: "pending",
};

const activeKeySlice = createSlice({
  name: "activeKey",
  initialState,
  reducers: {
    setActiveKey: (state, action) => {
      state.activekey = action.payload;
    },
    clearActiveKey: (state) => {
      state.activekey = "";
    },
  },
});

export default activeKeySlice.reducer;
export const { setActiveKey, clearActiveKey } = activeKeySlice.actions;
