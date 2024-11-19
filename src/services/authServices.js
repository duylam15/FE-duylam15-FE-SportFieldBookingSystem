const API_URL = 'http://localhost:8080/auth';
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.data); // Save accessToken
      return true; // Login successful
    }
    return false; // Login failed
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
      return true; // Registration successful
    }
    return false; // Registration failed
  } catch (error) {
    console.error('Đăng ký lỗi:', error);
    return false;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    const response = await fetch(`${API_URL}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token }),
    });
    const responseData = await response.json(); 

    console.log("response: ", responseData);
    if (response.ok) {
      localStorage.removeItem('accessToken'); // Clear token
      return true; // Logout successful
    }
    return false; // Logout failed
  } catch (error) {
    console.error('Đăng xuất lỗi:', error);
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_URL}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('accessToken', data.data); // Update token
      alert(data.data);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Làm mới token lỗi:', error);
    return false;
  }
};

export const useGoogleLoginHandler = () => {
  const navigate = useNavigate();

  return useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const googleAccessToken = credentialResponse?.access_token;
      if (googleAccessToken) {
        fetch(`http://localhost:8080/auth/google/${googleAccessToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("data Google login:", data);
            if (data.statusCode === 200) {
              console.log("Đăng nhập thành công!");
              localStorage.setItem('accessToken', data.data); // Update token
              navigate("/home");
            } else {
              alert("Login failed: " + data.message);
            }
          })
          .catch((error) => {
            console.error("Error during Google login:", error);
            alert("Login error!");
          });
      } else {
        console.error("No Google token received!");
      }
    },
    onError: () => {
      console.log("Login Failed");
      alert("Login failed. Please try again.");
    },
  });
};