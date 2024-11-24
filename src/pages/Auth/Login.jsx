import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { login, useGitHubLoginHandler, useGoogleLoginHandler } from "../../services/authServices";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./login.css";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import { clientGithubId } from "../../utils/thongTinChung";
import { getMyProfile } from "../../services/myProfileService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [messError, setMessError] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await login(username, password);
    console.log("DN LOIX", result);
    if (result.message == "Không có tài khoản với email này") {
      setShow(true); // Show error message if login fails
      setMessError("Không có tài khoản với email này")
    }
    if (result.statusCode == 888) {
      setShow(true); // Show error message if login fails
      setMessError("Tài khoản này được đăng ký bằng Google. Vui lòng sử dụng \"Đăng nhập bằng Google\".")
    }
    if (result.statusCode == 777) {
      setShow(true); // Show error message if login fails
      setMessError("Tài khoản này được đăng ký bằng Github. Vui lòng sử dụng \"Đăng nhập bằng Github\".")
    }
    if (result.statusCode == 401) {
      setShow(true); // Show error message if login fails
      setMessError("Sai email hoặc mật khẩu")
    }
    if (result.statusCode == 200) {
      setShow(false)
      navigate("/home"); // Navigate to the home page after successful login
      localStorage.setItem("accessToken", result.data)
      // Fetch user profile
      const myProfile = await getMyProfile(result.data);
      localStorage.setItem(
        "dataNguoiDungSport",
        JSON.stringify(myProfile.data.data)
      );
    }
    // } else {
    //   const redirectTo = location.state?.from?.pathname || "/home"; // Trang đích mặc định
    //   navigate(redirectTo);
    //   // navigate("/home"); // Navigate to the home page after successful login
    // }
    setLoading(false);
  };

  const handleLoginGoogle = useGoogleLoginHandler()
  const handleLoginGithub = useGitHubLoginHandler()

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>

      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Đăng nhập</div>

        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            {messError}
          </Alert>
        ) : null}

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Tên email</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Nhập email"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Đăng nhập
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Đang đăng nhập...
          </Button>
        )}

        <div className="btn_login_google" onClick={handleLoginGoogle}>
          <div className="img_google">
            <span data-v-66f6a142="" class="klk-login-third-party-logo"><svg width="22" height="22" viewBox="0 0 22 22" fill="#000" xmlns="http://www.w3.org/2000/svg" size="24"><path d="M21.9945 10.8847C21.991 10.1724 21.9271 9.46151 21.8034 8.75885H11.2163V12.8405H17.2741C17.0136 14.148 16.2022 15.2991 15.0263 16.0294V18.6761H18.6453C20.8759 16.6434 22.0926 13.8128 21.9945 10.8847Z" fill="#4285F4"></path> <path d="M11.2163 21.259C13.9511 21.3342 16.6128 20.4177 18.6565 18.6973L15.0375 16.0506C13.8997 16.742 12.5683 17.0938 11.2163 17.0604C8.3467 17.016 5.82125 15.2588 4.92238 12.6811H1.20226V15.4129C3.10855 18.9907 6.98005 21.2509 11.2163 21.259Z" fill="#34A853"></path> <path d="M4.92238 12.6705C4.45465 11.3531 4.45465 9.92737 4.92238 8.61004V5.87829H1.20226C-0.400753 8.88691 -0.400753 12.4361 1.20226 15.4447L4.92238 12.6705Z" fill="#FBBC04"></path> <path d="M11.2163 4.25199C12.8164 4.23018 14.3619 4.80261 15.5208 5.8464L18.7239 2.81703C16.7027 0.992303 14.0105 -0.01777 11.2163 0.000236682C6.98005 0.00836809 3.10855 2.26855 1.20226 5.8464L4.92238 8.61004C5.82897 6.04074 8.35264 4.29328 11.2163 4.25199Z" fill="#EA4335"></path></svg></span>
          </div>
          <div className="text">
            <span>Google</span>
          </div>
        </div>


        <div className="btn_login_github" onClick={handleLoginGithub}>
          <div className="img_github">
            <span data-v-66f6a142="" class="klk-login-third-party-logo">
              <svg height="22" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="22" data-view-component="true" class="octicon octicon-mark-github">
                <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
              </svg>
            </span>
          </div>
          <div className="text">
            <span>Github</span>
          </div>
        </div>

        <div className="d-grid justify-content-end mt-2">
          <Link to="/forgot_password">
            <Button className="text-muted px-0" variant="link">
              Quên mật khẩu?
            </Button>
          </Link>

        </div>

        <div className="text-center mt-2">
          <span>Chưa có tài khoản? </span>
          <Link to="/register">Đăng ký</Link>
        </div>
      </Form>

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Tuan Kiet | &copy;2024
      </div>
    </div>
  );
};

export default Login;
