import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import { commentsApi } from "./apis/commentsApi";
import { postsApi } from "./apis/postsApi";
import { postFormReducer, setTitle } from "./slices/postFormSlice";
import { queryApi } from "./apis/queryApi";
const store = configureStore({
  reducer: {
    postForm: postFormReducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [queryApi.reducerPath]: queryApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare()
      .concat(commentsApi.middleware)
      .concat(postsApi.middleware)
      .concat(queryApi.middleware);
  },
});

setupListeners(store.dispatch);

export { useAddCommentsMutation } from "./apis/commentsApi";
export { useAddPostMutation } from "./apis/postsApi";
export { useFetchPostQuery } from "./apis/queryApi";
export { setTitle, store };
