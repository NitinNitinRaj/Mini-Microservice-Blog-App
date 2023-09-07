import { createSlice } from "@reduxjs/toolkit";

const postFormSlice = createSlice({
  name: "postForm",
  initialState: { title: "" },
  reducers: {
    setTitle(state, action) {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = postFormSlice.actions;
export const postFormReducer = postFormSlice.reducer;
