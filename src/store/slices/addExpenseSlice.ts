import { createSlice } from "@reduxjs/toolkit";

interface AddExpenseState {
  popupAddExpense: boolean;
}

const initialState: AddExpenseState = {
  popupAddExpense: false,
};

const addExpenseSlice = createSlice({
  name: "addExpense",
  initialState,
  reducers: {
    openPopup: (state) => {
      state.popupAddExpense = true;
    },
    closePopup: (state) => {
      state.popupAddExpense = false;
    },
  },
});

export const { openPopup, closePopup } = addExpenseSlice.actions;
export default addExpenseSlice.reducer;
