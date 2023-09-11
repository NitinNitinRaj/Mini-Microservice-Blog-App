import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints(builder) {
    return {
      addPost: builder.mutation({
        query: (title) => {
          return { method: "POST", url: "/posts", body: { title: title } };
        },
        transformResponse: (response) => Object.values(response),
      }),
    };
  },
});

export const { useAddPostMutation } = postsApi;
export { postsApi };
