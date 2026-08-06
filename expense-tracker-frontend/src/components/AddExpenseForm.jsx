import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";

import { toast } from "react-toastify";

import { addExpense } from "../services/expenseService";

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Medical",
  "Entertainment",
  "Utilities",
  "Travel",
  "Education",
  "Other",
];

function AddExpenseForm({ onExpenseAdded }) {
  const [expense, setExpense] = useState({
    title: "",
    description: "",
    amount: "",
    category: "",
    expense_date: "",
  });

  const handleChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExpense(expense);

      toast.success("Expense Added Successfully");

      setExpense({
        title: "",
        description: "",
        amount: "",
        category: "",
        expense_date: "",
      });

      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (error) {

      toast.error(
        error.response?.data?.detail || "Unable to add expense"
      );

    }
  };

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <CardContent>

        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
        >
          ➕ Add New Expense
        </Typography>

        <form onSubmit={handleSubmit}>

          <Grid container spacing={3}>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={expense.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Amount"
                type="number"
                name="amount"
                value={expense.amount}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={expense.description}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={expense.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                  >
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Expense Date"
                name="expense_date"
                value={expense.expense_date}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
              >
                Add Expense
              </Button>
            </Grid>

          </Grid>

        </form>

      </CardContent>
    </Card>
  );
}

export default AddExpenseForm;