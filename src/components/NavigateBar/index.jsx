import React from 'react'
import { Navbar, Nav, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.png";

export default function NavigateBar() {
	const navigate = useNavigate();

	return (
		<Navbar bg="light" expand="lg" sticky="top">
			<Container>
				<Navbar.Brand onClick={() => navigate(`/`)}>
					<img src={Logo} alt="logo" width="50" height="50" />
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto" style={{ gap: "10px" }}>
						<div onClick={() => navigate(`/`)}>Trang chủ</div>
						<div onClick={() => navigate(`/fieldList`)}>Danh sách sân</div>
					</Nav>
					<Link to="/login">
						<Button variant="outline-primary" className="me-2">
							Đăng nhập
						</Button>
					</Link>
					<Link to="/register">
						<Button variant="primary">Đăng ký</Button>
					</Link>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}
