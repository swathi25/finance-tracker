import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { deleteExpense, setExpenses } from "../features/expenseSlice";
import { auth, db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  TableContainer,
  Paper,
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
    <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
      <Typography
        variant="h6"
        sx={{ p: 2, borderBottom: "1px solid #eee", fontWeight: "bold" }}
      >
        Your Expenses
      </Typography>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>
              <b>Amount</b>
            </TableCell>
            <TableCell>
              <b>Category</b>
            </TableCell>
            <TableCell>
              <b>Description</b>
            </TableCell>
            <TableCell>
              <b>Date</b>
            </TableCell>
            <TableCell align="center">
              <b>Action</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.length > 0 ? (
            expenses.map((exp, index) => (
              <TableRow
                key={exp.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#fafafa" : "white",
                  "&:hover": { backgroundColor: "#f1f8ff" },
                }}
              >
                <TableCell>₹{exp.amount}</TableCell>
                <TableCell>{exp.category}</TableCell>
                <TableCell>{exp.description}</TableCell>
                <TableCell>{exp.date}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleDelete(exp.id)}
                    color="error"
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                No expenses added yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpenseList;
