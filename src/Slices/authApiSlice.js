import { apiSlice } from "./apiSlice";
import { baseURL } from "../apis/web";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    studentLogin: builder.mutation({
      query: (data) => ({
        url: baseURL + "/login",
        data: data,
        method: ["POST"],
      }),
      invalidatesTags: ["Student"],
    }),
    studentMsalLogin: builder.mutation({
      query: (emailId) => ({
        url: baseURL + "/login",
        body: emailId,
        method: ["POST"],
      }),
      invalidatesTags: ["Student"],
    }),
    AdminOrWardenMsalLogin: builder.mutation({
      query: (data) => ({
        url: baseURL + "/admin-login",
        body: { data: { ...data } },
        method: ["POST"],
      }),
      invalidatesTags: ["AdminOrWarden"],
    }),
  }),
});

export const {
  useStudentLoginMutation,
  useStudentMsalLoginMutation,
  useAdminOrWardenMsalLoginMutation,
} = authApiSlice;
