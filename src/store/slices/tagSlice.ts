import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TagState {
  isTagOpen: boolean;
  isLoading: boolean;
}

const initialState: TagState = {
  isTagOpen: false,
  isLoading: true,
};

const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    openTagList: (state) => {
      state.isTagOpen = true;
    },
    closeTagList: (state) => {
      state.isTagOpen = false;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { openTagList, closeTagList, setIsLoading } = tagSlice.actions;
export default tagSlice.reducer;
