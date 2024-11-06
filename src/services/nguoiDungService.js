import axios from "./apiService"

const REST_API_BASE_URL = 'http://localhost:8080';

export const searchNguoiDung = (page = 0, size = 2, username, phone, roleName) => {
    return axios.get(`${REST_API_BASE_URL}/user/search`, {
        params: { username, phone, roleName, page, size }
    });
};