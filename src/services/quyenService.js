import axios from "./apiService"

const REST_API_BASE_URL = 'http://localhost:8080';

export const getAllQuyen = (page = 0, size = 2) => {
    return axios.get(`${REST_API_BASE_URL}/role`, {
        params: { page, size }
    });
};


export const searchQuyen = async (tenQuyen, page = 0, size = 2) => {
    try {
        // Gọi API với tham số tìm kiếm và phân trang
        const response = await axios.get(`${REST_API_BASE_URL}/role/search`, {
            params: {
                name: tenQuyen,
                page,
                size
            }
        });
        console.log("search ~ ", response);
        return response
    } catch (error) {
        console.error("Error fetching search quyen:", error);
    }
};

export const getAllChucNang = () => {
    return axios.get(`${REST_API_BASE_URL}/permission`)
}

export const getChiTietQuyenTheoId = (idQuyen) => {
    return axios.get(`${REST_API_BASE_URL}/role/${idQuyen}`)
}

export const themQuyen = (data) => {
    return axios.post(`${REST_API_BASE_URL}/role/create`, data)
}

export const suaQuyen = (data) => {
    return axios.post(`${REST_API_BASE_URL}/role/update`, data)
}
