import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../features/authSlice";
import { Button, Container, Typography, Box } from "@mui/material";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseSummary from "../components/ExpenseSummary";

const Dashboard: React.FC = () => {
  const { username } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Welcome, {username}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => dispatch(logout())}
        >
          Logout
        </Button>
      </Box>

      {/* Expense features */}
      <AddExpenseForm />
      <ExpenseList />
      <ExpenseSummary />
    </Container>
  );
};

export default Dashboard;
