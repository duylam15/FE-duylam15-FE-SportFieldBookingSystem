import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Row, Col, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/authServices"; // Import the logout function from your service
import { refreshToken } from "../../services/authServices";
import "./home.css";
import BackgroundImage from "../../assets/images/background.jpg";
import Logo from "../../assets/images/logo.png";
import { getUsernameFromToken } from "../../utils/jwtHelper";
import axios from "axios"
import { notification } from "antd";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import ChatBox from '../../components/ChatBox/ChatBox';
import HeaderUser from "../../components/HeaderUser";
import FooterUser from "../../components/FooterUser";

const Home = () => {
	const [fieldTypes, setFieldTypes] = useState([]); // Danh sách loại sân
	const [selectedFieldType, setSelectedFieldType] = useState("");
	const [fieldName, setFieldName] = useState("");
	const [region, setRegion] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
	const navigate = useNavigate();
	const [email, setEmail] = useState(null);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const statusCode = searchParams.get("statusCode");
		const message = searchParams.get("message");

		if (statusCode === "200") {
			toast.success(message || "Thanh toán thành công!");
			navigate("/");
		} else if (statusCode === "400") {
			toast.error(message || "Thanh toán thất bại!");
			navigate("/");
		}
	}, [searchParams]);
	useEffect(() => {
		// Giả sử access token được lưu trong localStorage
		const token = localStorage.getItem('accessToken');

		// Lấy ra username từ token
		const emailFromToken = getUsernameFromToken(token);

		// Cập nhật state với username
		setEmail(emailFromToken);
	}, []);

	// Fetch danh sách loại sân từ API
	useEffect(() => {
		const fetchFieldTypes = async () => {
			try {
				const response = await fetch("http://localhost:8080/api/fieldType"); // Thay API_URL_TO_GET_FIELD_TYPES bằng URL API của bạn
				const data = await response.json();
				console.log(data)
				setFieldTypes(data);
			} catch (error) {
				console.error("Error fetching field types:", error);
			}
		};
		fetchFieldTypes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log("Loại sân:", selectedFieldType, "Tên sân:", fieldName, "Khu vực:", region);
		// http://localhost:8080/api/fields/search?loai=1&ten=sân&diaChi=1
		//const url = `http://localhost:8080/api/fields/search?loai=${selectedFieldType}&ten=${fieldName}&diaChi=${region}`;
		const url = `	http://localhost:8080/api/fields/search/admin?fieldName=${fieldName}&fieldTypeId=${selectedFieldType}&minCapacity=&maxCapacity=&fieldAddress=${region}&page=0&size=5`
		try {
			const res = await axios.get(url);
			console.log("res", res.data.data.content)
			navigate(`/fieldList`, {
				state: {
					listField: res.data.data.content,
				},
			});
		} catch (error) {
			notification.error({
				message: 'Không tìm thấy sân',
				description: `Vui lòng nhập lại thông tin.`,
				duration: 3,
			});
		}
	};

	// Check if user is logged in by checking token in localStorage
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	// Handle search
	const handleSearch = (e) => {
		e.preventDefault();
		// Xử lý logic tìm kiếm ở đây (sử dụng selectedFieldType, fieldName, region)
		console.log("Loại sân:", selectedFieldType, "Tên sân:", fieldName, "Khu vực:", region);
	};

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


	return (
		<div>
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
							<Form className="mt-3" onSubmit={handleSubmit}>
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
												<option key={index} value={fieldType.fieldTypeId}>
													{fieldType.fieldTypeName}
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

				{/* Row 2: Three Columns with Images, Titles, and Text */}
				<Container fluid className="home__row-2">
					<Row className="py-5 text-center">
						{/* Column 1 */}
						<Col xs={12} md={4} className="border-end1">
							<img
								src="/src/assets/images/imgrow21.png"
								alt="Description 1"
								className="img-fluid mb-3"
							/>
							<h3>Tìm kiếm vị trí sân</h3>
							<p>
								Dữ liệu sân đấu dồi dào, liên tục cập nhật, giúp bạn dễ dàng tìm kiếm theo khu vực mong muốn
							</p>
						</Col>

						{/* Column 2 */}
						<Col xs={12} md={4} className="border-end1">
							<img
								src="/src/assets/images/imgrow22.png"
								alt="Description 2"
								className="img-fluid mb-3"
							/>
							<h3>Đặt lịch online</h3>
							<p>
								Không cần đến trực tiếp, không cần gọi điện đặt lịch, bạn hoàn toàn có thể đặt sân ở bất kì đâu có internet
							</p>
						</Col>

						{/* Column 3 */}
						<Col xs={12} md={4}>
							<img
								src="/src/assets/images/imgrow23.png"
								alt="Description 3"
								className="img-fluid mb-3"
							/>
							<h3>Tìm đối, bắt cặp đấu</h3>
							<p>
								Tìm kiếm, giao lưu các đội thi đấu thể thao, kết nối, xây dựng cộng đồng thể thao sôi nổi, mạnh mẽ
							</p>
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
									width: '155.8px',
								}}
							/>

						</Col>

						{/* Column 2: Form */}
						<Col sm={7} className="custom-column">
							<Form>
								<Row>
									{/* Column for Name */}
									<Col xs={12} md={2} className="mb-3">
										<Form.Group controlId="formName">
											<Form.Control type="text" placeholder="Nhập họ tên" />
										</Form.Group>
									</Col>

									{/* Column for Phone Number */}
									<Col xs={12} md={2} className="mb-3">
										<Form.Group controlId="formPhone">
											<Form.Control type="text" placeholder="Nhập số điện thoại" />
										</Form.Group>
									</Col>

									{/* Column for Email */}
									<Col xs={12} md={2} className="mb-3">
										<Form.Group controlId="formEmail">
											<Form.Control type="email" placeholder="Nhập email" />
										</Form.Group>
									</Col>

									{/* Column for Submit Button */}
									<Col xs={12} md={2} className="mb-3">
										<Button variant="primary" type="submit" className="w-100">
											Gửi
										</Button>
									</Col>
								</Row>
							</Form>
						</Col>
					</Row>
				</Container>

				<ChatBox />
			</div>
		</div>
	);
};

export default Home;