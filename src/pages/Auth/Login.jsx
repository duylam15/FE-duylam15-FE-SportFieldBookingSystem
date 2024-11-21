import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login, useGoogleLoginHandler } from "../../services/authServices";
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import "./login.css";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import { clientId } from "../../utils/thongTinChung";
import { getMyProfile } from "../../services/myProfileService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [messError, setMessError] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await login(username, password);
    console.log("LOC TÉT LOGIN: ", result);
    if(result.statusCode == 888) {
      setShow(true); // Show error message if login fails
      setMessError("Tài khoản này được đăng ký bằng Google. Vui lòng sử dụng \"Đăng nhập bằng Google\".")
    }
    if(result.statusCode == 401) {
      setShow(true); // Show error message if login fails
      setMessError("Sai email hoặc mật khẩu")
    }
    if(result.statusCode == 200) {
      setShow(false)
      navigate("/home"); // Navigate to the home page after successful login
      localStorage.setItem("accessToken", result.data)
    }
    setLoading(false);
  };

  const handleLoginGoogle = useGoogleLoginHandler()

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

        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Nhớ tài khoản" />
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
