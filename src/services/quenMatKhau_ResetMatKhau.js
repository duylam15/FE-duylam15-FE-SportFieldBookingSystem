import axios from "../utils/axiosInstance";
const API = 'http://localhost:8080/'

export const forgotPassword = async (data) => {
    return axios.post(`${API}auth/forgot_password`, data); // Đường dẫn `/auth/...`
};

export const resetPassword = async (data) => {
    return axios.post(`${API}auth/reset_password`, data); // Dấu phẩy thừa đã được xóa
};