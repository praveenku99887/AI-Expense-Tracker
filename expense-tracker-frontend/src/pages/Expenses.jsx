import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

import MainLayout from "../layouts/MainLayout";
import AddExpenseForm from "../components/AddExpenseForm";
import ExpenseTable from "../components/ExpenseTable";

import { getExpenses } from "../services/expenseService";

function Expenses() {

    const [expenses, setExpenses] = useState([]);

    const loadExpenses = async () => {

        try {

            const data = await getExpenses();

            setExpenses(data);

        } catch (error) {

            console.error(error);

        }

    };

    useEffect(() => {

        loadExpenses();

    }, []);

    return (

        <MainLayout>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={1}
            >
                💳 Expense Management
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                mb={4}
            >
                Add, manage and track all your expenses in one place.
            </Typography>

            {/* Add Expense Form */}

            <AddExpenseForm
                onExpenseAdded={loadExpenses}
            />

            {/* Expense Table */}

            <ExpenseTable
                expenses={expenses}
                onDelete={loadExpenses}
            />

        </MainLayout>

    );

}

export default Expenses;