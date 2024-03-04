import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { UsersApi } from "./UsersApi";
import { ApplicationsApi } from "./ApplicationsApi";

const store = configureStore({
  reducer: {
    [UsersApi.reducerPath]: UsersApi.reducer,
    [ApplicationsApi.reducerPath]: ApplicationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(UsersApi.middleware)
      .concat(ApplicationsApi.middleware),
});

setupListeners(store.dispatch);

export default store;

export { useFetchUsersQuery, useAddUserMutation } from "./UsersApi";
export { useFetchApplicationsQuery } from "./ApplicationsApi";
