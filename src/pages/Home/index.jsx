import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";
import BackgroundImage from "../../assets/images/background.jpg";

const Home = () => {
	const [fieldTypes, setFieldTypes] = useState([]); // Danh sách loại sân
	const [selectedFieldType, setSelectedFieldType] = useState("");
	const [fieldName, setFieldName] = useState("");
	const [region, setRegion] = useState("");

	// Fetch danh sách loại sân từ API
	useEffect(() => {
		const fetchFieldTypes = async () => {
			try {
				const response = await fetch("API_URL_TO_GET_FIELD_TYPES"); // Thay API_URL_TO_GET_FIELD_TYPES bằng URL API của bạn
				const data = await response.json();
				setFieldTypes(data);
			} catch (error) {
				console.error("Error fetching field types:", error);
			}
		};
		fetchFieldTypes();
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		// Xử lý logic tìm kiếm ở đây (sử dụng selectedFieldType, fieldName, region)
		console.log("Loại sân:", selectedFieldType, "Tên sân:", fieldName, "Khu vực:", region);
	};

	const navigate = useNavigate()
	return (
		<div>
			{/* Navbar */}
		

			{/* Main Content */}
			<div className="home__content-wrapper">
				{/* Row 1: Background Image + Search Bar */}
				<div
					className="home__background"
					style={{ backgroundImage: `url(${BackgroundImage})` }}
				>
					<div className="home__overlay"></div>
					<Container className="home__search-container1">
						<h1 className="text-white text-center">Welcome to Our Website</h1>
						<div className="home__search-container">
							<Form className="mt-3" onSubmit={handleSearch}>
								<Row className="home__search-container no-gutters">
									{/* Cột 1: Dropdown loại sân */}
									<Col xs={12} md={3} className="form-group">
										<Form.Select
											value={selectedFieldType}
											onChange={(e) => setSelectedFieldType(e.target.value)}
											required
										>
											<option value="">Chọn loại sân</option>
											{fieldTypes.map((fieldType, index) => (
												<option key={index} value={fieldType.id}>
													{fieldType.name}
												</option>
											))}
										</Form.Select>
									</Col>

									{/* Cột 2: Input tên sân */}
									<Col xs={12} md={3} className="form-group">
										<Form.Control
											type="text"
											placeholder="Tên sân"
											value={fieldName}
											onChange={(e) => setFieldName(e.target.value)}
										/>
									</Col>

									{/* Cột 3: Input khu vực */}
									<Col xs={12} md={3} className="form-group">
										<Form.Control
											type="text"
											placeholder="Khu vực"
											value={region}
											onChange={(e) => setRegion(e.target.value)}
										/>
									</Col>

									{/* Cột 4: Nút tìm kiếm */}
									<Col xs={12} md={2} className="form-group">
										<Button variant="primary" type="submit" className="w-100">
											Tìm kiếm
										</Button>
									</Col>
								</Row>
							</Form>
						</div>
					</Container>
				</div>

				{/* Row 2: Placeholder for "ROW2" */}
				{/* Row 2: Three Columns with Images, Titles, and Text */}
				<Container fluid className="home__row-2">
					<Row className="py-5 text-center">
						{/* Column 1 */}
						<Col xs={12} md={4} className="border-end1">
							<img src="/src/assets/images/imgrow21.png" alt="Description 1" className="img-fluid mb-3" />
							<h3>Tìm kiếm vị trí sân</h3>
							<p>Dữ liệu sân đấu dồi dào, liên tục cập nhật, giúp bạn dễ dàng tìm kiếm theo khu vực mong muốn</p>
						</Col>

						{/* Column 2 */}
						<Col xs={12} md={4} className="border-end1">
							<img src="/src/assets/images/imgrow22.png" alt="Description 2" className="img-fluid mb-3" />
							<h3>Đặt lịch online</h3>
							<p>Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn toàn có thể đặt sân ở bất kì đâu có internet</p>
						</Col>

						{/* Column 3 */}
						<Col xs={12} md={4}>
							<img src="/src/assets/images/imgrow23.png" alt="Description 3" className="img-fluid mb-3" />
							<h3>Tìm đối, bắt cặp đấu</h3>
							<p>Tìm kiếm, giao lưu các đội thi đấu thể thao, kết nối, xây dựng cộng đồng thể thao sôi nổi, mạnh mẽ</p>
						</Col>
					</Row>
				</Container>



				{/* Row 3: Placeholder for "ROW3" */}
				<Container fluid className="home__row-3 bg-warning">
					<Row className="py-5 text-center custom-row-height">
						{/* Column 1: Text with overlapping image */}
						<Col sm={5} className="position-relative custom-column">
							<img
								src="/src/assets/images/person.png"
								alt="Mô tả hình ảnh"
								className="img-fluid position-absolute"
								style={{
									top: '-150px',
									zIndex: 2,
									left: '20%',
									width: '155.8px'
								}}
							/>
							<h5 className="offset-sm-7 col-sm-5 col-12">
								Đây là một đoạn text được căn dính bên lề phải, mô tả về điều gì đó liên quan đến trang web của bạn.
							</h5>
							{/* Overlapping image */}

						</Col>

						{/* Column 2: Form */}
						<Col sm={7} className="custom-column">
							<Form>
								<Row>
									{/* Column for Name */}
									<Col xs={12} md={3} className="mb-3">
										<Form.Group controlId="formName">
											<Form.Control type="text" placeholder="Nhập họ tên" />
										</Form.Group>
									</Col>

									{/* Column for Phone Number */}
									<Col xs={12} md={3} className="mb-3">
										<Form.Group controlId="formPhone">
											<Form.Control type="text" placeholder="Nhập số điện thoại" />
										</Form.Group>
									</Col>

									{/* Column for Email */}
									<Col xs={12} md={3} className="mb-3">
										<Form.Group controlId="formEmail">
											<Form.Control type="email" placeholder="Nhập email" />
										</Form.Group>
									</Col>

									{/* Column for Submit Button */}
									<Col xs={12} md={3} className="mb-3">
										<Button variant="primary" type="submit" className="w-100">
											Gửi
										</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</Container>


				{/* Row 4: Footer */}
				<Container fluid className="home__footer text-white">
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
		</div>
	);
};

export default Home;
