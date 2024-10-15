import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../Slices/apiSlice";
import authSliceReducer from "../Slices/authSlice";
import visibleSlice from "../Slices/visibleSlice";
import activeKeySlice from "../Slices/activeKeySlice";
import searchReducerSlice from "../Slices/searchSlice";
import refreshSlice from "../Slices/refreshSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    visible: visibleSlice,
    key: activeKeySlice,
    search: searchReducerSlice,
    refresh: refreshSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
