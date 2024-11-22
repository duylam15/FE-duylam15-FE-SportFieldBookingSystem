import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { forgotPassword } from "../../services/quenMatKhau_ResetMatKhau";

import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import "./login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setShowError(false);
    setShowSuccess(false);

    try {
      const result = await forgotPassword({ email });
      if (result.status === 200) {
        setShowSuccess(true);
        setErrorMessage("");
      } else {
        setShowError(true);
        setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau.");
      }
    } catch (error) {
        if(error.status == 404) {
            setShowError(true);
            setErrorMessage("Không tìm thấy tài khoản với email");
        }
        if(error.status == 400) {
            setShowError(true);
            setErrorMessage("Vui lòng đăng nhập bằng Google với tài khoản này");
        }
        else {
            setShowError(true);
            setErrorMessage("Có lỗi xảy ra, vui lòng thử lại sau");
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
        <div className="h4 mb-2 text-center title">Quên mật khẩu
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
            Email khôi phục mật khẩu đã được gửi thành công!
          </Alert>
        )}

        <Form.Group className="mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Nhập email của bạn"
            onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPassword;