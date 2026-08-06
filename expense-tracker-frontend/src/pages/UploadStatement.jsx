import { useState } from "react";

import MainLayout from "../layouts/MainLayout";
import UploadCard from "../components/UploadCard";

import {
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

function UploadStatement() {

  const [result, setResult] = useState(null);

  return (

    <MainLayout>

      <Typography
        variant="h4"
        fontWeight="bold"
      >
        📂 Upload Bank Statement
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Upload your CSV file and let AI categorize your expenses automatically.
      </Typography>

      <UploadCard onUploadSuccess={setResult} />

      {result && (

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
              ✅ Upload Summary
            </Typography>

            <Grid container spacing={2} mb={3}>

              <Grid item xs={12} md={3}>
                <b>File</b><br />
                {result.filename}
              </Grid>

              <Grid item xs={12} md={3}>
                <b>Uploaded</b><br />
                {result.uploaded_rows}
              </Grid>

              <Grid item xs={12} md={3}>
                <b>Stored</b><br />
                {result.stored_rows}
              </Grid>

              <Grid item xs={12} md={3}>
                <b>Skipped</b><br />
                {result.skipped_rows}
              </Grid>

            </Grid>

            <Typography
              variant="h6"
              mb={2}
            >
              Expense Preview
            </Typography>

            <TableContainer component={Paper}>

              <Table>

                <TableHead>

                  <TableRow>

                    <TableCell><b>Date</b></TableCell>

                    <TableCell><b>Title</b></TableCell>

                    <TableCell><b>Description</b></TableCell>

                    <TableCell><b>Category</b></TableCell>

                    <TableCell align="right"><b>Amount</b></TableCell>

                  </TableRow>

                </TableHead>

                <TableBody>

                  {result.expenses.map((expense, index) => (

                    <TableRow key={index}>

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

                    </TableRow>

                  ))}

                </TableBody>

              </Table>

            </TableContainer>

          </CardContent>

        </Card>

      )}

    </MainLayout>

  );

}

export default UploadStatement;