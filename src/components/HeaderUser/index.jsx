import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authServices";
import Logo from '../../assets/images/logo.png'
import { getUsernameFromToken } from "../../utils/jwtHelper";
const HeaderUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate()
    // Handle logout logic
    const handleLogout = async () => {
        const result = await logout(); // Gọi logout mà không cần truyền token (đã lưu trong localStorage)
        if (result) {
            setIsLoggedIn(false); // Cập nhật UI state
            navigate("/"); // Điều hướng đến trang chủ (hoặc trang login)
        } else {
            console.error("Đăng xuất thất bại.");
        }
    };
    useEffect(() => {
        // Giả sử access token được lưu trong localStorage
        const token = localStorage.getItem('accessToken');

        // Lấy ra username từ token
        const emailFromToken = getUsernameFromToken(token);

        console.log("emailFromToken : ", emailFromToken);

        // Cập nhật state với username
        setEmail(emailFromToken);
    }, []);

    // Check if user is logged in by checking token in localStorage
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <Navbar bg="light" expand="lg" sticky="top">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={Logo} alt="logo" width="50" height="50" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Home</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#pricing">Pricing</Nav.Link>
                        </Nav>
                        {/* Conditional rendering based on login status */}
                        {isLoggedIn ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                {email ? (
                                    <p style={{ marginRight: '10px', marginBottom: '0px' }}>Xin chào {email} !</p>
                                ) : (
                                    <p></p>
                                )}
                                 <Link to="/my_profile">
                                    <div className="block_thongtin">
                                        <div class="img_icon_person">
                                            <img src="/public/images/avatar.svg" alt="" />
                                        </div>
                                    </div>
                                </Link>
                                <Button variant="outline-danger" onClick={handleLogout}>
                                    Đăng xuất
                                </Button>
                               
                            </div>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outline-primary" className="me-2">
                                        Đăng nhập
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="primary">Đăng ký</Button>
                                </Link>
                            </>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default HeaderUser;