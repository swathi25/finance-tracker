import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { deleteExpense, setExpenses } from "../features/expenseSlice";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpenseList: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchExpenses = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const q = collection(db, "users", user.uid, "expenses");
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as any[];
        dispatch(setExpenses(items));
      } catch (error) {
        console.error("Error fetching expenses: ", error);
      }
    };

    fetchExpenses();
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, "users", user.uid, "expenses", id));
      dispatch(deleteExpense(id));
    } catch (error) {
      console.error("Error deleting expense: ", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Expenses
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Date</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>₹{exp.amount}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell>{exp.date}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleDelete(exp.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ExpenseList;
