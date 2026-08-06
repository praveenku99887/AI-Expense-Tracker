import api from "./api";

const getToken = () => localStorage.getItem("token");

export const uploadCSV = async (file) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        "/upload/csv",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getToken()}`
            }
        }
    );

    return response.data;
};