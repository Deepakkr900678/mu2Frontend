import { apiSlice } from "./apiSlice";
import { baseURL } from "../apis/web";
const studentAuthToken = localStorage.getItem("jwtToken") || "checking";
const wardenAuthToken = localStorage.getItem("jwtTokenAdmin") || "checking";

export const studentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // fetchStudent: builder.query({
    //   query: () => ({
    //     url: baseURL + "/profile",
    //     headers: {
    //       Authorization: `Bearer ${wardenAuthToken}`,
    //     },
    //   }),
    //   keepUnusedDataFor: 5,
    // }),
    fetchStudentById: builder.query({
      query: (studentId) => ({
        url: baseURL + `/profile/${studentId}`,
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    fetchStudentVaccinationStatus: builder.query({
      query: (htno) => ({
        url: baseURL + `/vaccination/${htno}`,
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    fetchStudentProfiles: builder.query({
      query: ({
        keyword,
        currentPage,
        aTypesForFilteration,
        seletedBatches,
        blocksForFilteration,
        suspend,
      }) => ({
        url: baseURL + `/allProfiles`,
        method: "POST",
        body: {
          filters: {
            A_TYPE: aTypesForFilteration,
            BATCH: seletedBatches,
            BLOCK: blocksForFilteration,
            SUSPEND: suspend,
          },
        },
        params: { keyword, currentPage },
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    updateStudentProfile: builder.mutation({
      query: ({ data }) => ({
        url: baseURL + "/updateProfile",
        body: { ...data },
        method: "PUT",
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
        },
      }),
      invalidatesTags: ["Student"],
    }),
    suspendUser: builder.mutation({
      query: ({ selectedRow, suspendedDate, suspensionType }) => ({
        url: baseURL + "/updatesuspension",
        body: { selectedRow, suspendedDate, suspensionType },
        method: "POST",
        headers: {
          Authorization: `Bearer ${wardenAuthToken}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Student"],
    }),
    myLeaves: builder.query({
      query: ({ htno }) => ({
        url: baseURL + "/student/myLeaves",
        params: { htno },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useFetchStudentQuery,
  useFetchStudentByIdQuery,
  useLazyFetchStudentVaccinationStatusQuery,
  useFetchStudentProfilesQuery,
  useUpdateStudentProfileMutation,
  useSuspendUserMutation,
  useMyLeavesQuery,
} = studentsApiSlice;
