import axios from 'axios';
import { getMyProfile } from '../services/myProfileService';

// Tạo một instance của Axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // Thay bằng base URL của bạn
  withCredentials: true, // Để gửi cookie (bao gồm refresh token)
});

// Interceptor cho các request
axiosInstance.interceptors.request.use(
  config => {
    // console.log('[Request Interceptor] - Original Config:', config);

    const token = localStorage.getItem('accessToken'); // Lấy access token từ localStorage
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token; // Gắn access token vào header
      // console.log('[Request Interceptor] - Access Token Added:', token);
    }
    return config;
  },
  error => {
    console.error('[Request Interceptor] - Error:', error);
    return Promise.reject(error);
  }
);

// Interceptor cho các response
axiosInstance.interceptors.response.use(
  response => {
    // console.log('[Response Interceptor] - Response:', response);
    return response;
  },
  async error => {
    // console.error('[Response Interceptor] - Error:', error);

    const originalRequest = error.config;
    // console.log('[Response Interceptor] - Original Request:', originalRequest);

    if (error.response?.status === 403 && !originalRequest._retry) {
      // console.log('[Response Interceptor] - 403 Error: Attempting to refresh token...');
      originalRequest._retry = true; // Đánh dấu rằng yêu cầu này đã retry một lần

      try {
        // Gửi yêu cầu refresh token để lấy token mới
        const res = await axiosInstance.post('/auth/refresh_token');
        // console.log('[Response Interceptor] - Refresh Token Response:', res);

        // Lưu lại access token mới vào localStorage
        const newAccessToken = res.data.data; // res.data.data chứa access token mới
        localStorage.setItem('accessToken', newAccessToken);
        // console.log('[Response Interceptor] - New Access Token Saved:', newAccessToken);

        const myProfile = await getMyProfile(localStorage.getItem("accessToken"));
        localStorage.setItem(
          "dataNguoiDungSport",
          JSON.stringify(myProfile.data.data)
        );

        // Gắn lại access token mới vào header và thực hiện lại yêu cầu ban đầu
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        // console.log('[Response Interceptor] - Retrying Original Request with New Token:', originalRequest);

        // Thực hiện lại yêu cầu ban đầu với dữ liệu đi kèm (nếu có)
        return axiosInstance({
          ...originalRequest,
          data: originalRequest.data // Đảm bảo dữ liệu gốc vẫn được gửi lại
        });
      } catch (refreshError) {
        // Nếu refresh token cũng thất bại
        // console.error('[Response Interceptor] - Refresh Token Failed:', refreshError);

        // Điều hướng người dùng về trang đăng nhập hoặc thực hiện hành động khác
        window.location.href = '/login';
      }
    }

    // Nếu không phải lỗi 403 hoặc yêu cầu đã retry, trả về lỗi như bình thường
    // console.error('[Response Interceptor] - Request Failed, Returning Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;