import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../apis/web";

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : "";
const MuAuthToken = userInfo.MuAuthToken;

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState();

    const MuToken = state?.auth?.userInfo?.MuAuthToken || MuAuthToken;
    if (MuToken) {
      headers.set("Authorization", `Bearer ${MuToken}`);
    } else {
      // if (
      //   state.auth.userInfo.TYPE === "Admin" ||
      //   state.auth.userInfo.TYPE === "Warden" ||
      //   state.auth.userInfo.TYPE === "Security"
      // ) {
      //   // navigate to "/admin-login"
      // } else {
      //   // navigate to '/login'
      // }
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["AppliedLeaves", "Student", "AdminOrWarden", "Security"],
  endpoints: (builder) => ({}),
});
