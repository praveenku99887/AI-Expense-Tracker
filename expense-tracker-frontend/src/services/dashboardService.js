import api from "./api";

const getToken = () => localStorage.getItem("token");

// Dashboard Summary
export const getDashboardSummary = async () => {

    const response = await api.get("/dashboard/summary", {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};


// Category Report
export const getCategoryReport = async (
    type,
    date = null,
    week = null,
    month = null,
    year = null
) => {

    let url = `/dashboard/category?type=${type}`;

    if (date) {
        url += `&date=${date}`;
    }

    if (week) {
        url += `&week=${week}`;
    }

    if (month) {
        url += `&month=${month}`;
    }

    if (year) {
        url += `&year=${year}`;
    }

    const response = await api.get(url, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });

    return response.data;
};