import axios from "./apiService"

const REST_API_BASE_URL = 'http://localhost:8080';

export const searchNguoiDung = (page = 0, size = 2, email, phone, roleName) => {
    return axios.get(`${REST_API_BASE_URL}/user/search`, {
        params: {email, phone, roleName, page, size }
    });
};

export const getThongTinNguoiDungById = (userId) => {
    return axios.get(`${REST_API_BASE_URL}/user/${userId}`)
}

export const capNhatThongTinNguoiDung = (userId, data) => {
    return axios.post(`${REST_API_BASE_URL}/user/update/${userId}`, data)
}

export const themNguoiDung = (data) => {
    return axios.post(`${REST_API_BASE_URL}/user/create`, data)
}