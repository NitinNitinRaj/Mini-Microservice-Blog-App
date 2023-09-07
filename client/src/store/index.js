import { configureStore } from "@reduxjs/toolkit";
import { postFormReducer } from "./slices/postFormSlice";

import { setTitle } from "./slices/postFormSlice";
import { commentsApi } from "./apis/commentsApi";
import { postsApi } from "./apis/postsApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
const store = configureStore({
  reducer: {
    postForm: postFormReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware);
  },
});

setupListeners(store.dispatch);

export { store, setTitle };
export {
  useAddCommentsMutation,
  useFetchCommentsQuery,
} from "./apis/commentsApi";
export { useAddPostMutation, useFetchPostsQuery } from "./apis/postsApi";
