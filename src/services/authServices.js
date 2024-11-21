const API_URL = 'http://localhost:8080/auth';
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "./myProfileService";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
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
      localStorage.removeItem('dataNguoiDung'); // Clear token
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
    onSuccess: async (credentialResponse) => {
      try {
        const googleAccessToken = credentialResponse?.access_token;
        if (!googleAccessToken) {
          console.error("No Google token received!");
          alert("Failed to retrieve Google token. Please try again.");
          return;
        }

        const response = await fetch(`http://localhost:8080/auth/google/${googleAccessToken}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("Google login response:", data);

        if (response.ok) {
          console.log("Login successful!");
          const accessToken = data.data.trim();
          localStorage.setItem("accessToken", accessToken);

          // Fetch user profile
          const myProfile = await getMyProfile(accessToken);
          localStorage.setItem("dataNguoiDung", JSON.stringify(myProfile.data.data));

          navigate("/home");
        } else {
          console.error("Login failed:", data.message);
          alert("Login failed: " + data.message);
        }
      } catch (error) {
        console.error("Error during Google login:", error);
        alert("An error occurred during login. Please try again.");
      }
    },
    onError: () => {
      console.error("Login Failed");
      alert("Google login failed. Please try again.");
    },
  });
};