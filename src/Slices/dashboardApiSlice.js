import { apiSlice } from "./apiSlice";
import { baseURL } from "../apis/web";

export const dashboardApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    underSuspension: builder.query({
      query: () => ({
        url: `${baseURL}/undersuspension`,
      }),
      keepUnusedDataFor: 5,
    }),
    averageLeaveDuration: builder.query({
      query: () => ({
        url: `${baseURL}/avgleaveduration`,
      }),
      keepUnusedDataFor: 5,
    }),
    currentAppliedLeaves: builder.query({
      query: (info) => ({
        url: `${baseURL}/currentapplieedleaves`,
        body: { ...info },
        method: "POST",
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    BlockWiseLeave: builder.query({
      query: (data) => ({
        url: `${baseURL}/blockwiseleave`,
        body: { ...data },
        method: "POST",
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    SchoolWiseData: builder.query({
      query: (data) => ({
        url: `${baseURL}/schoolwisedata`,
        body: { ...data },
        method: "POST",
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    ATypeWiseData: builder.query({
      query: (data) => ({
        url: `${baseURL}/Atypewisedata`,
        body: { ...data },
        method: "POST",
      }),
      invalidatesTags: ["AppliedLeaves"],
    }),
    suspensionList: builder.query({
      query: () => ({
        url: baseURL + "/suspendedlist",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useUnderSuspensionQuery,
  useAverageLeaveDurationQuery,
  useCurrentAppliedLeavesQuery,
  useBlockWiseLeaveQuery,
  useSchoolWiseDataQuery,
  useATypeWiseDataQuery,
  useSuspensionListQuery,
} = dashboardApiSlice;
