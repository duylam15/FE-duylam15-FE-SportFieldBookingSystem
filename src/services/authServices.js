const API_URL = "http://localhost:8080/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "./myProfileService";
import { clientGithubId } from "../utils/thongTinChung";
import { useEffect } from "react";
import axios from "axios";

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return await response.json();
  } catch (error) {
    console.error("Đăng ký lỗi:", error);
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) return false;

    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ token }),
    });
    const responseData = await response.json();

    console.log("response: ", responseData);
    if (response.ok) {
      localStorage.removeItem("accessToken"); // Clear token
      localStorage.removeItem("dataNguoiDungSport"); // Clear data nguoi dung
      return true; // Logout successful
    }
    return false; // Logout failed
  } catch (error) {
    localStorage.removeItem("accessToken"); // Clear token
    localStorage.removeItem("dataNguoiDungSport"); // Clear data nguoi dung
    console.error("Đăng xuất lỗi:", error);
    return false;
  }
};

export const refreshToken = async () => {
  try {
    const response = await fetch(`${API_URL}/refresh_token`, {
      method: "POST",
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("accessToken", data.data); // update token
      const myProfile = await getMyProfile(data.data); // update data nguoi dung sau moi lan lam moi token
      localStorage.setItem(
        "dataNguoiDungSport",
        JSON.stringify(myProfile.data.data)
      );
      return true;
    }
    return false;
  } catch (error) {
    console.error("Làm mới token lỗi:", error);
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

        const response = await fetch(
          `http://localhost:8080/auth/google/${googleAccessToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log("Google login response:", data);

        if (response.ok) {
          console.log("Login successful!");
          const accessToken = data.data.trim();
          localStorage.setItem("accessToken", accessToken);

          // Fetch user profile
          const myProfile = await getMyProfile(accessToken);
          localStorage.setItem(
            "dataNguoiDungSport",
            JSON.stringify(myProfile.data.data)
          );

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

// export const useGitHubLoginHandler = () => {
//   const navigate = useNavigate();
//   const redirectUri = "http://localhost:5173/login";

//   const handleLogin = () => {
//     const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientGithubId}&redirect_uri=${encodeURIComponent(
//       redirectUri
//     )}&scope=user`;
//     window.location.href = githubAuthUrl; // Redirect đến GitHub
//   };

//   const urlParams = new URLSearchParams(window.location.search);
//   const code = urlParams.get("code");
//   console.log("Code git: ", code);

//   if (!code) {
//     console.error("No code found in URL");
//     return;
//   }
//   const handleFetchLoginGithub = async () => {
//     const response = await axios.post(
//       `http://localhost:8080/auth/github/${code}`
//     );
//     console.log(response);

//     if (response.ok) {
//       console.log("Login successful!");
//       const accessToken = response.data.data
//       localStorage.setItem("accessToken", accessToken);

//       // Fetch user profile
//       const myProfile = await getMyProfile(accessToken);
//       localStorage.setItem(
//         "dataNguoiDung",
//         JSON.stringify(myProfile.data.data)
//       );

//       navigate("/home");
//     } else {
//       console.error("Login failed:", response.data.message);
//       alert("Login failed: " + response.data.message);
//     }
//   };
//   handleFetchLoginGithub();

//   return handleLogin;
// };



export const useGitHubLoginHandler = () => {
  const navigate = useNavigate();
  const redirectUri = "http://localhost:5173/login";

  // Hàm để điều hướng người dùng đến GitHub
  const handleLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientGithubId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=user`;
    window.location.href = githubAuthUrl; // Redirect đến GitHub
  };

  useEffect(() => {
    // Kiểm tra `code` sau khi người dùng quay lại
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      console.log("GitHub code: ", code);

      const handleFetchLoginGithub = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/auth/github/${code}`
          );

          if (response.status === 200) {
            console.log("Login successful!");
            const accessToken = response.data.data;

            // Lưu accessToken
            localStorage.setItem("accessToken", accessToken);

            // Lấy thông tin người dùng
            const myProfile = await getMyProfile(accessToken);
            localStorage.setItem(
              "dataNguoiDung",
              JSON.stringify(myProfile.data.data)
            );

            navigate("/home"); // Điều hướng tới trang chủ
          } else {
            console.error("Login failed:", response.data.message);
            alert("Login failed: " + response.data.message);
          }
        } catch (error) {
          console.error("Error during GitHub login:", error.message);
          alert("An error occurred: " + error.message);
        }
      };

      handleFetchLoginGithub();
    }
  }, [navigate]);

  return handleLogin; // Trả về hàm để sử dụng
};