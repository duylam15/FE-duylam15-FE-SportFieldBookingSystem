const API_URL = 'http://localhost:8080';
import axios from "./apiService";


export const getMyProfile = (token) => {
    return axios.get(`${API_URL}/user/me`, {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	})
}

// Cập nhật mật khẩu
export const updatePassword = async (passwordData) => {
	// const token = localStorage.getItem('token');
	const response = await fetch(`${API_URL}/taikhoan/update_password`, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(passwordData),
	});
	return await response.json();
};