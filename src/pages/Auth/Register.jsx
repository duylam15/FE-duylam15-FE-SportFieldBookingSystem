import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../services/authServices";
import "./login.css";
import { FaArrowLeft } from "react-icons/fa";
import { message } from "antd";


import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [messError, setMessError] = useState("");

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    // Kiểm tra email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Kiểm tra mật khẩu
    if (!password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== rePassword) {
      newErrors.rePassword = "Mật khẩu không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShow(false); // Reset thông báo lỗi

    // Kiểm tra xem form có hợp lệ không
    if (!validateForm()) return;

    setLoading(true);
    const result = await register({ email, password, rePassword });
    console.log("ANH NHO RA LA MINH BIET: ", result);
    console.log(result);
    if (result.statusCode == 400) {
      setMessError("Email đã tồn tại")
      setShow(true);
    }
    if (result.statusCode == 200) {
      // Thông báo thành công
      message.success("Đăng ký thành công! Bạn sẽ được chuyển hướng đến trang đăng nhập.", 2); // 2 giây
      navigate("/login");
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
          Đăng ký
          <Link to="/login"><div className="block_icon"><FaArrowLeft /></div></Link>
        </div>

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


        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Mật khẩu"
            onChange={(e) => setPassword(e.target.value)}
            required
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-2" controlId="rePassword">
          <Form.Label>Xác nhận mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={rePassword}
            placeholder="Xác nhận mật khẩu"
            onChange={(e) => setRePassword(e.target.value)}
            required
            isInvalid={!!errors.rePassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.rePassword}
          </Form.Control.Feedback>
        </Form.Group>

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

      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Tuan Kiet | &copy;2024
      </div>
    </div>
  );
};

export default Register;