import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const commentsApi = createApi({
  reducerPath: "comments",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4001" }),
  endpoints(builder) {
    return {
      addComments: builder.mutation({
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

export const { useAddCommentsMutation } = commentsApi;
export { commentsApi };
