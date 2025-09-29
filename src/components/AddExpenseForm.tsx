import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { addExpense } from "../features/expenseSlice";
import type { Expense } from "../types/expense";

import {
  Button,
  TextField,
  MenuItem,
  Box,
  Paper,
  Typography,
} from "@mui/material";

const categories = ["Food", "Transport", "Shopping", "Bills", "Other"];

const AddExpenseForm: React.FC = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date) return;

    const user = auth.currentUser;
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const newExpense: Expense = {
      id: uuidv4(),
      amount: parseFloat(amount),
      category,
      description,
      date,
    };

    try {
      // Save to Firestore under user/{uid}/expenses
      await addDoc(collection(db, "users", user.uid, "expenses"), newExpense);

      // Also update Redux
      dispatch(addExpense(newExpense));

      // Reset form
      setAmount("");
      setCategory("Food");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense: ", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add Expense
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "grid", gap: 2 }}
      >
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          required
        />
        <Button type="submit" variant="contained">
          Add Expense
        </Button>
      </Box>
    </Paper>
  );
};

export default AddExpenseForm;
