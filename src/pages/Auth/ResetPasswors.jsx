import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { resetPassword } from "../../services/quenMatKhau_ResetMatKhau";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import "./login.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    setShowSuccess(false);

    const urlParams = new URLSearchParams(window.location.search);
    const refreshPasswordToken = urlParams.get("token"); // Get token from URL

    if (!refreshPasswordToken) {
      setErrorMessage("Token không hợp lệ hoặc đã hết hạn.");
      setShowError(true);
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự.");
      setShowError(true);
      setLoading(false);
      return;
    }

    if (password !== rePassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp.");
      setShowError(true);
      setLoading(false);
      return;
    }

    const newPassword = password
    const reNewPassword = rePassword
    try {
      const result = await resetPassword({
        refreshPasswordToken,
        newPassword,
        reNewPassword,
      });

      if (result.status === 200) {
        setShowSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
      } else {
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại.");
        setShowError(true);
      }
    } catch (error) {
      if (error.status === 400) {
        setErrorMessage("Link yêu cầu gửi reset mật khẩu đã hết hạn, vui lòng lấy link mới.");
        setShowError(true);
      } else {
        setErrorMessage("Không thể đặt lại mật khẩu. Vui lòng thử lại.");
        setShowError(true);
      }
    } finally {
      setLoading(false);
    }
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

        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {errorMessage}
          </Alert>
        )}

        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)}
            dismissible
          >
            Mật khẩu đã được đặt lại thành công!
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="rePassword">
          <Form.Label>Nhập lại mật khẩu</Form.Label>
          <Form.Control
            type="password"
            value={rePassword}
            placeholder="Nhập lại mật khẩu"
            onChange={(e) => setRePassword(e.target.value)}
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