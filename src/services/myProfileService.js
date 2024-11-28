const API_URL = 'http://localhost:8080';
import axios from "../utils/axiosInstance";


export const getMyProfile = (token) => {
    return axios.get(`${API_URL}/user/me`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
}

// Cập nhật mật khẩu, // phai nho duoc mat khau cu
export const updatePassword = async (passwordData) => {
	return axios.put(`${API_URL}/user/update_password`, passwordData)
};