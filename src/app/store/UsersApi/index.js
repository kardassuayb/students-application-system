import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const UsersApi = createApi({
  reducerPath: "Users",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://65e24dcba8583365b318198a.mockapi.io/",
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        query: () => {
          return {
            url: "users",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          };
        },
      }),
      addUser: builder.mutation({
        query: (newUser) => {
          return {
            url: "users",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: newUser,
          };
        },
      }),
      updateUser: builder.mutation({
        query: ({ id, isLoggedIn }) => {
          return {
            url: `users/${id}`,
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: { isLoggedIn: isLoggedIn },
          };
        },
      }),
    };
  },
});

export { UsersApi };
export const { useFetchUsersQuery, useAddUserMutation, useUpdateUserMutation } =
  UsersApi;
