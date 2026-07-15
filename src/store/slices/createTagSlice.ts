import { createSlice } from "@reduxjs/toolkit";

interface CreateTagState {
  openCreateTag: boolean;
}

const initialState: CreateTagState = {
  openCreateTag: false,
};

const createTagSlice = createSlice({
  name: "createTag",
  initialState,
  reducers: {
    openCreateTag: (state) => {
      state.openCreateTag = true;
    },
    closeCreateTag: (state) => {
      state.openCreateTag = false;
    },
  },
});

export const { openCreateTag, closeCreateTag } = createTagSlice.actions;
export default createTagSlice.reducer;
