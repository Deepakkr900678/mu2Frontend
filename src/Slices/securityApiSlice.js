import { apiSlice } from "./apiSlice";
import { baseURL } from "../apis/web";

export const securityApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchSecurities: builder.query({
      query: ({ keyword, page }) => ({
        url: baseURL + "/gateinout/all",
        params: { keyword, page },
      }),
      keepUnusedDataFor: 0,
    }),
    fetchSecuritiesDayWise: builder.query({
      query: () => ({
        url: baseURL + "/gateinout/Atype",
      }),
      keepUnusedDataFor: 5,
    }),
    checkInOrOutUser: builder.mutation({
      query: ({ device, htno }) => ({
        url: baseURL + `/gateinout/${device}/${htno}`,
        params: { device, htno },
        method: "POST",
      }),
      invalidatesTags: ["Security"],
    }),
  }),
});

export const {
  useCheckInOrOutUserMutation,
  useFetchSecuritiesQuery,
  useFetchSecuritiesDayWiseQuery,
} = securityApiSlice;
