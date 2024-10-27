// api.js
import axios from 'axios';

// Tạo một instance của Axios
const api = axios.create({
  baseURL: 'http://localhost:8080', // URL của backend API
  withCredentials: true, // Cho phép gửi cookie (refresh token)
});

// Hàm để lấy refresh token
const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh_token');
    return response.data.data; // Access token mới trả về từ backend
  } catch (error) {
    throw error; // Nếu lỗi xảy ra, đẩy lỗi ra ngoài
  }
};

// Axios Interceptor để kiểm tra lỗi 401 và thực hiện refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kiểm tra xem lỗi có phải là 401 không và không phải là lỗi refresh token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là đã retry
      
      try {
        // Gọi API refresh token
        const newAccessToken = await refreshToken();

        // Cập nhật token mới vào request
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Gửi lại request với access token mới
        return api(originalRequest);
      } catch (refreshError) {
        // Nếu lỗi khi refresh token, chuyển hướng đến trang login
        console.error('Failed to refresh token', refreshError);
        alert("Đã hết phiên đăng nhập, vui lòng đăng nhập lại");
        window.location.href = '/login'; // Hoặc điều hướng theo nhu cầu
      }
    }

    // Trả lỗi ra ngoài nếu không xử lý được
    return Promise.reject(error);
  }
);

export default api;


// ví dụ về gọi api và check token
// import React, { useEffect, useState } from 'react';
// import api from './api'; // Import axios instance

// const ExampleComponent = () => {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     // Gọi API sử dụng instance đã cấu hình interceptor
//     api.get('/protected-route')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       {data ? (
//         <div>{JSON.stringify(data)}</div>
//       ) : (
//         <div>Loading...</div>
//       )}
//     </div>
//   );
// };

// export default ExampleComponent;