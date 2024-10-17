const API_URL = 'http://localhost:8080/auth'; // Địa chỉ API của bạn

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            credentials: 'include' // Để cho phép cookie (refreshToken) được gửi và nhận
        });
        if (response.ok) {
            const data = await response.json();
            // Lưu token từ phản hồi
            localStorage.setItem('accessToken', data.data); 
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
        const response = await fetch(`${API_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        return false;
    } catch (error) {
        console.error('Đăng ký lỗi:', error);
        return false;
    }
};

export const logout = async (token) => {
    try {
        const response = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token }), // Gửi token để đăng xuất
        });
        if (response.ok) {
            // Xóa token sau khi đăng xuất
            localStorage.removeItem('accessToken');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Đăng xuất lỗi:', error);
        return false;
    }
};

export const refreshToken = async () => {
    try {
        const response = await fetch(`${API_URL}/refresh_token`, {
            method: 'POST',
            credentials: 'include', // Để refreshToken từ cookie được gửi đi
        });
        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.data); // Cập nhật accessToken mới
            return data;
        }
        return false;
    } catch (error) {
        console.error('Làm mới token lỗi:', error);
        return false;
    }
};
