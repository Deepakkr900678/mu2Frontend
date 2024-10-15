import { apiSlice } from "./apiSlice";
import { baseURL } from "../apis/web";
const studentAuthToken = localStorage.getItem("jwtToken");
const wardenAuthToken = localStorage.getItem("jwtTokenAdmin") || "Checking";

export const appliedLeavesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchAppliedLeaves: builder.query({
      query: ({ keyword, page, selectedBlocks }) => ({
        url: baseURL + "/appliedleaves",
        params: { keyword, page, selectedBlocks },
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
        onError: (error) => {
          console.error("An error occurred:", error);
          // You can handle the error here, for example, by displaying a message or setting an error state
        },
      }),
      keepUnusedDataFor: 5,
    }),
    fetchApprovedLeaves: builder.query({
      query: () => ({
        url: baseURL + "/approvedleaves",
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    fetchPastApprovedLeaves: builder.query({
      query: ({ keyword, page }) => ({
        url: baseURL + "/pastleaves",
        params: { keyword, page },
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    updateAppliedLeave: builder.mutation({
      query: (data) => ({
        url: baseURL + "/updateleave",
        method: ["PUT"],
        body: data,
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
    }),
    applyLeave: builder.mutation({
      query: (userData) => ({
        url: baseURL + "/createpass",
        method: ["POST"],
        body: userData,
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    sendMail: builder.mutation({
      query: (mailData) => ({
        url: baseURL + "/mail",
        method: ["POST"],
        body: mailData,
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    getLatestLeave: builder.query({
      query: (keyword) => ({
        url: baseURL + "/pastleavesLatest",
        params: keyword,
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
  }),
});

export const {
  useFetchAppliedLeavesQuery,
  useFetchApprovedLeavesQuery,
  useFetchPastApprovedLeavesQuery,
  useApplyLeaveMutation,
  useUpdateAppliedLeaveMutation,
  useSendMailMutation,
  useGetLatestLeaveQuery,
} = appliedLeavesApiSlice;
