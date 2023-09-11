import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const queryApi = createApi({
  reducerPath: "query",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4002" }),
  endpoints(builder) {
    return {
      fetchPost: builder.query({
        query: () => {
          return {
            method: "GET",
            url: "/posts",
          };
        },
        transformResponse: (response) => Object.values(response),
      }),
    };
  },
});

export const { useFetchPostQuery } = queryApi;
export { queryApi };
