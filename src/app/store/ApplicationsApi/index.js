import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const ApplicationsApi = createApi({
  reducerPath: "Applications",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65e24dcba8583365b318198a.mockapi.io/",
  }),
  endpoints(builder) {
    return {
      fetchApplications: builder.query({
        query: () => {
          return {
            url: "students",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
    };
  },
});

export { ApplicationsApi };
export const { useFetchApplicationsQuery } = ApplicationsApi;
