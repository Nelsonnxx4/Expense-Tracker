import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Tag } from "../../types/tag";

interface ConfirmState {
  confirmation: boolean;
  selected: Tag | null;
}

const initialState: ConfirmState = {
  confirmation: false,
  selected: null,
};

const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    setConfirmation: (state, action: PayloadAction<boolean>) => {
      state.confirmation = action.payload;
    },
    closeConfirmation: (state) => {
      state.confirmation = false;
    },
    setSelected: (state, action: PayloadAction<Tag | null>) => {
      state.selected = action.payload;
    },
  },
});

export const { setConfirmation, closeConfirmation, setSelected } =
  confirmSlice.actions;
export default confirmSlice.reducer;
