import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './FieldDetails.scss'; // Import CSS file

function FieldDetails() {
	const { id } = useParams(); // Lấy id từ URL
	const [field, setField] = useState(null);
	const [userId, setUserId] = useState(1);
	const [user, setUser] = useState();
	const [currentImage, setCurrentImage] = useState(0); // Trạng thái hình ảnh hiện tại
	const location = useLocation();
	const navigate = useNavigate(); // Initialize navigate

	useEffect(() => {
		const fetchFieldTypes = async () => {
			try {
				const response = await fetch(`http://localhost:8080/api/fields/${id}`); // Thay API_URL_TO_GET_FIELD_TYPES bằng URL API của bạn
				const data = await response.json();
				console.log(data.userId);
				setUserId(data.userId);
				setField(data);
			} catch (error) {
				console.error("Error fetching field types:", error);
			}
		};
		fetchFieldTypes();
	}, [id]);

	useEffect(() => {
		const fetchFieldTypes = async () => {
			try {
				const response = await fetch(`http://localhost:8080/user/${userId}`); // Thay API_URL_TO_GET_FIELD_TYPES bằng URL API của bạn
				const data = await response.json();
				console.log("useruserId", data.data);
				setUser(data.data);
			} catch (error) {
				console.error("Error fetching field types:", error);
			}
		};
		fetchFieldTypes();
	}, [userId]); // Depend on userId instead of id

	console.log(field);
	console.log(user);

	// Handle booking button click
	const handleBookingClick = () => {
		navigate(`/booking/${id}`); // Navigate to /calendar/:fieldId
	};

	return (
		<div className="field-details">
			<div className="field-details__container">
			
				<div className="field-details__info">
					<h1 className="field-details__title">{field?.fieldName}</h1>
					<p className="field-details__location">Vị trí: {field?.location}</p>
					<p className="field-details__price">
						Giá mỗi giờ: <span>{field?.pricePerHour} VND</span>
					</p>
					<p className="field-details__owner">Tên chủ sân: {user?.fullName}</p>
					<p className="field-details__phone">SĐT: {user?.phone}</p>
					<button
						className="field-details__book-button"
						onClick={handleBookingClick} // Add click handler
					>
						Đặt sân
					</button>
				</div>
			</div>
		</div>
	);
}

export default FieldDetails;
