import api from "./api";

const getToken = () => {
    return localStorage.getItem("token");
};

// ===========================
// Get All Expenses
// ===========================

export const getExpenses = async () => {

    const response = await api.get("/expenses/", {

        headers: {
            Authorization: `Bearer ${getToken()}`
        }

    });

    return response.data;
};

// ===========================
// Add Expense
// ===========================

export const addExpense = async (expense) => {

    const response = await api.post(
        "/expenses/",
        expense,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

// ===========================
// Delete Expense
// ===========================

export const deleteExpense = async (id) => {

    const response = await api.delete(
        `/expenses/${id}`,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};

// ===========================
// Update Expense
// ===========================

export const updateExpense = async (
    id,
    expense
) => {

    const response = await api.put(
        `/expenses/${id}`,
        expense,
        {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};