const API_URL = 'http://localhost:8080/api/auth'; // Địa chỉ API của bạn

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        if (response.ok) {
            const data = await response.json();
            // Lưu token hoặc thông tin người dùng nếu cần thiết
            return data;
        }
        return false;
    } catch (error) {
        console.error('Đăng nhập lỗi:', error);
        return false;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            const data = await response.json();
            // Lưu token hoặc thông tin người dùng nếu cần thiết
            return data;
        }
        return false;
    } catch (error) {
        console.error('Đăng ký lỗi:', error);
        return false;
    }
};
