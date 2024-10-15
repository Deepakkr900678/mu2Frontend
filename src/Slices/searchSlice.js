import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    clearKeyword: (state) => {
      state.keyword = "";
    },
  },
});

export default searchSlice.reducer;
export const { setKeyword, clearKeyword } = searchSlice.actions;
