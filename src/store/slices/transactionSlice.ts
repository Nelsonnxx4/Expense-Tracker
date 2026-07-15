import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactionAmount: number | string;
}

const initialState: TransactionState = {
  transactionAmount: 0,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransactionAmount: (state, action: PayloadAction<number | string>) => {
      state.transactionAmount = action.payload;
    },
  },
});

export const { setTransactionAmount } = transactionSlice.actions;
export default transactionSlice.reducer;
