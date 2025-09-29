import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/authSlice";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
} from "@mui/material";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const Dashboard: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* ✅ Top Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Welcome {username || "User"}
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            onClick={() => dispatch(logout())}
            sx={{
              borderColor: "white",
              color: "white",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ✅ Main Content */}
      <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
        {/* Add Expense Form */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Add Expense
          </Typography>
          <AddExpenseForm />
        </Paper>

        {/* Expense List */}
        <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <ExpenseList />
        </Paper>

        {/* Expense Summary */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Expenses by Category
          </Typography>
          <ExpenseSummary />
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard;
