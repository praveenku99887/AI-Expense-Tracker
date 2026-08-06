import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import { deleteExpense } from "../services/expenseService";

function ExpenseTable({
  expenses,
  onDelete,
}) {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) return;

    try {

      await deleteExpense(id);

      alert("Expense deleted successfully!");

      if (onDelete) {
        onDelete();
      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to delete expense."
      );

    }

  };

  return (

    <Card
      sx={{
        mt: 4,
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
          Recent Expenses
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
        >

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <b>Date</b>
                </TableCell>

                <TableCell>
                  <b>Title</b>
                </TableCell>

                <TableCell>
                  <b>Description</b>
                </TableCell>

                <TableCell>
                  <b>Category</b>
                </TableCell>

                <TableCell align="right">
                  <b>Amount</b>
                </TableCell>

                <TableCell align="center">
                  <b>Action</b>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {expenses.length === 0 ? (

                <TableRow>

                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No expenses found.
                  </TableCell>

                </TableRow>

              ) : (

                expenses.map((expense) => (

                  <TableRow
                    key={expense.id}
                    hover
                  >

                    <TableCell>
                      {expense.expense_date}
                    </TableCell>

                    <TableCell>
                      {expense.title}
                    </TableCell>

                    <TableCell>
                      {expense.description}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={expense.category}
                        color="primary"
                        size="small"
                      />

                    </TableCell>

                    <TableCell align="right">

                      ₹ {expense.amount}

                    </TableCell>

                    <TableCell align="center">

                      <IconButton
                        color="primary"
                      >
                        <EditRoundedIcon />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() =>
                          handleDelete(expense.id)
                        }
                      >
                        <DeleteRoundedIcon />
                      </IconButton>

                    </TableCell>

                  </TableRow>

                ))

              )}

            </TableBody>

          </Table>

        </TableContainer>

      </CardContent>

    </Card>

  );

}

export default ExpenseTable;