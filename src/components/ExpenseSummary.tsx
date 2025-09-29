import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Paper, Typography, Box } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#a020f0"];

const ExpenseSummary: React.FC = () => {
  const expenses = useSelector((state: RootState) => state.expenses.items);

  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((exp) => {
      map[exp.category] = (map[exp.category] || 0) + exp.amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const monthData = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach((exp) => {
      const month = new Date(exp.date).toLocaleString("default", {
        month: "short",
      });
      map[month] = (map[month] || 0) + exp.amount;
    });
    return Object.entries(map).map(([month, value]) => ({ month, value }));
  }, [expenses]);

  if (!expenses.length) {
    return (
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6">No expenses to summarize</Typography>
      </Paper>
    );
  }

  return (
    <Box sx={{ display: "grid", gap: 3, mt: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Expenses by Category
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Expenses by Month
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default ExpenseSummary;
