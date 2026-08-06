import api from "./api";


// ==============================
// LOGIN
// ==============================

export const loginUser = async (email, password) => {

    const response = await api.post("/login", {
        email,
        password,
    });

    return response.data;
};


// ==============================
// REGISTER
// ==============================

export const registerUser = async (user) => {

    const response = await api.post("/register", user);

    return response.data;
};


// ==============================
// LOGOUT
// ==============================

export const logoutUser = () => {

    localStorage.removeItem("token");

};


// ==============================
// GET TOKEN
// ==============================

export const getToken = () => {

    return localStorage.getItem("token");

};


// ==============================
// CHECK LOGIN
// ==============================

export const isAuthenticated = () => {

    return !!localStorage.getItem("token");

};