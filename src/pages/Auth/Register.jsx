import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { register } from "../../services/authServices"; // Đường dẫn đến authService
import "./login.css"; // Nếu có CSS riêng cho register, có thể dùng chung với login.css

import BackgroundImage from "../../assets/images/background.jpg"; // Nền giống login
import Logo from "../../assets/images/logo.png"; // Logo giống login

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const [show, setShow] = useState(false); // Hiển thị cảnh báo nếu thất bại
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const result = await register({ username, email, fullname, password, phone });
    if (!result) {
      setShow(true); // Hiển thị cảnh báo nếu đăng ký thất bại
    } else {
      console.log("Đăng ký thành công!");
    }
    setLoading(false);
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
        <div className="h4 mb-2 text-center">Đăng ký</div>

        {/* Alert */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Đăng ký thất bại.
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

        {/* Email */}
        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        {/* Fullname */}
        <Form.Group className="mb-2" controlId="fullname">
          <Form.Label>Họ tên</Form.Label>
          <Form.Control
            type="text"
            value={fullname}
            placeholder="Họ tên"
            onChange={(e) => setFullname(e.target.value)}
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

        {/* Phone */}
        <Form.Group className="mb-2" controlId="phone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Đăng ký
          </Button>
        ) : (
          <Button className="w-100" variant="primary" disabled>
            Đang đăng ký...
          </Button>
        )}
      </Form>

      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Tuan Kiet | &copy;2024
      </div>
    </div>
  );
};

export default Register;
