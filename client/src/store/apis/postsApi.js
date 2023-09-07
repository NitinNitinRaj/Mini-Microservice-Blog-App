import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  endpoints(builder) {
    return {
      fetchPosts: builder.query({
        providesTags: (result, error, args) => {
          return [{ type: "Posts" }];
        },
        query: () => {
          return { method: "GET", url: "/posts" };
        },
        transformResponse: (response) => {
          let data = [];
          for (let key in response) {
            data.push(response[key]);
          }
          return data;
        },
      }),
      addPost: builder.mutation({
        query: (title) => {
          return { method: "POST", url: "/posts", body: { title: title } };
        },
        invalidatesTags: (result, error, args) => {
          return [{ type: "Posts" }];
        },
      }),
    };
  },
});

export const { useFetchPostsQuery, useAddPostMutation } = postsApi;
export { postsApi };
