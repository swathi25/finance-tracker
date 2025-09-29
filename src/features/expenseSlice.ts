import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Expense } from "../types/expense";

interface ExpenseState {
  items: Expense[];
}

const initialState: ExpenseState = {
  items: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.items.push(action.payload);
    },
    deleteExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((exp) => exp.id !== action.payload);
    },
  },
});

export const { setExpenses, addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
