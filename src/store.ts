import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./features/expenseSlice";
import authReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
