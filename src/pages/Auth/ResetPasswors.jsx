import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authServices";
import "./login.css";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import { FaArrowLeft } from "react-icons/fa";

const ResetPassword = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const result = await login(username, password);
    if (!result) {
      setShow(true); // Show error message if login fails
    } else {
      console.log("Đăng nhập thành công!");
      navigate("/home"); // Navigate to the home page after successful login
    }
    setLoading(false);
  };

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
        <div className="h4 mb-2 text-center title">
            Tạo mật khẩu mới
            <Link to="/login"><div className="block_icon"><FaArrowLeft /></div></Link>
        </div>

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

        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={username}
            placeholder="Nhập mật khẩu"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu </Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="block_distance"></div>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Gửi
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Đang gửi...
          </Button>
        )}
        
      </Form>

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Tuan Kiet | &copy;2024
      </div>
    </div>
  );
};

export default ResetPassword;
