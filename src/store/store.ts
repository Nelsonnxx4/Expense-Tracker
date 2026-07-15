import { configureStore } from "@reduxjs/toolkit";
import darkModeReducer from "./slices/darkModeSlice";
import addExpenseReducer from "./slices/addExpenseSlice";
import tagReducer from "./slices/tagSlice";
import createTagReducer from "./slices/createTagSlice";
import confirmReducer from "./slices/confirmSlice";
import transactionReducer from "./slices/transactionSlice";

export const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    addExpense: addExpenseReducer,
    tag: tagReducer,
    createTag: createTagReducer,
    confirm: confirmReducer,
    transaction: transactionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
