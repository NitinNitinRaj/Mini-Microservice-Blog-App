import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001" }),
  endpoints(builder) {
    return {
      fetchComments: builder.query({
        providesTags: (result, error, postId) => {
          return [{ type: "comment", id: postId }];
        },
        query: (postId) => {
          return {
            method: "GET",
            url: `/posts/${postId}/comments`,
          };
        },
      }),
      addComments: builder.mutation({
        invalidatesTags: (result, error, comment) => {
          return [{ type: "comment", id: comment.postId }];
        },
        query: ({ postId, content }) => {
          return {
            method: "POST",
            url: `/posts/${postId}/comments`,
            body: { content },
          };
        },
      }),
    };
  },
});

export const { useFetchCommentsQuery, useAddCommentsMutation } = commentsApi;
export { commentsApi };
