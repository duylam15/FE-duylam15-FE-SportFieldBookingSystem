import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './FieldDetails.scss'; // Import CSS file

function FieldDetails() {
	const { id } = useParams(); // Lấy id từ URL
	const [field, setField] = useState(null);
	const [currentImage, setCurrentImage] = useState(0); // Trạng thái hình ảnh hiện tại

	// Fetch field details from API
	useEffect(() => {
		axios
			.get(`http://localhost:3005/fieldList/${id}`)
			.then((response) => {
				setField(response.data);
			})
			.catch((error) => console.error(error));
	}, [id]);

	// Hàm tự động thay đổi hình ảnh sau 3 giây
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentImage((prev) => (prev + 1) % field.images.length);
		}, 5000); // Thay đổi sau mỗi 3 giây
		return () => clearInterval(timer); // Dọn dẹp timer khi component unmount
	}, [field]);

	if (!field) {
		return <div>Loading...</div>;
	}

	const handleImageClick = (index) => {
		setCurrentImage(index);
	};

	return (
		<div className="field-details">
			<div className="field-details__container">
				<div className="field-details__images">
					{/* Hình ảnh lớn */}
					<img
						src={field.images[currentImage]}
						alt="Hình lớn"
						className="field-details__large-image"
					/>
					{/* Danh sách hình ảnh nhỏ */}
					<div className="field-details__small-images">
						{field.images.map((image, index) => (
							<img
								key={index}
								src={image}
								alt={`Hình nhỏ ${index + 1}`}
								className="field-details__small-image"
								onClick={() => handleImageClick(index)}
							/>
						))}
					</div>
				</div>
				<div className="field-details__info">
					<h1 className="field-details__title">{field.fieldName}</h1>
					<p className="field-details__location">Vị trí: {field.location}</p>
					<p className="field-details__price">Giá mỗi giờ: <span>{field.pricePerHour} VND</span></p>
					<p className="field-details__owner">Tên chủ sân: {field.ownerName}</p>
					<p className="field-details__phone">SĐT: {field.ownerPhone}</p>
					<button className="field-details__book-button">Đặt sân</button>
				</div>
			</div>
		</div>
	);
}

export default FieldDetails;
