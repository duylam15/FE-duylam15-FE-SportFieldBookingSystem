import React from 'react';
import { Navbar, Nav, Button, Container, Row, Col, Form } from "react-bootstrap";
import './index.css'
const FooterUser = () => {
    return (
        <div>
            <Container fluid className="home__footer" style={{ color: "#333" }}>
					<Row className="py-3 text-center">
						{/* Column 1 */}
						<Col xs={12} md={4}>
							<h5>Liên hệ</h5>
							<ul className="list-unstyled">
								<li>Email: contact@yourwebsite.com</li>
								<li>Điện thoại: +84 123 456 789</li>
								<li>Địa chỉ: 123 Đường ABC, TP. HCM</li>
							</ul>
						</Col>

						{/* Column 2 */}
						<Col xs={12} md={4}>
							<h5>Thông tin</h5>
							<ul className="list-unstyled">
								<li>Giới thiệu</li>
								<li>Chính sách bảo mật</li>
								<li>Điều khoản dịch vụ</li>
							</ul>
						</Col>

						{/* Column 3 */}
						<Col xs={12} md={4}>
							<h5>Kết nối với chúng tôi</h5>
							<ul className="list-unstyled">
								<li>Facebook</li>
								<li>Instagram</li>
								<li>Twitter</li>
							</ul>
						</Col>
					</Row>

					<Row className="text-center">
						<Col>
							<p>&copy; 2024 Your Website. All rights reserved.</p>
						</Col>
					</Row>
				</Container>
        </div>
    );
};

export default FooterUser;