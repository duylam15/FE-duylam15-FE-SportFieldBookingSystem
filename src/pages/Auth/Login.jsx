import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom
import { login } from "../../services/authServices"; // Đường dẫn đến authService
import "./login.css";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await login(username, password);
    if (!result) {
      setShow(true);
    } else {
      console.log("Đăng nhập thành công!");
    }
    setLoading(false);
  };

  const handlePassword = () => {
    console.log("Forgot password clicked");
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>

      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Đăng nhập</div>

        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Sai tên đăng nhập hoặc mật khẩu.
          </Alert>
        ) : null}

        {/* Username */}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Tên đăng nhập</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {/* Remember Me */}
        <Form.Group className="mb-2" controlId="checkbox">
          <Form.Check type="checkbox" label="Nhớ tài khoản" />
        </Form.Group>

        {/* Submit Button */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Đăng nhập
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Đang đăng nhập...
          </Button>
        )}

        {/* Forgot Password */}
        <div className="d-grid justify-content-end mt-2">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Quên mật khẩu?
          </Button>
        </div>

        {/* Link to Register */}
        <div className="text-center mt-2">
          <span>Chưa có tài khoản? </span>
          <Link to="/register">Đăng ký</Link> {/* Thêm link đến trang đăng ký */}
        </div>
      </Form>

      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Tuan Kiet | &copy;2024
      </div>
    </div>
  );
};

export default Login;
