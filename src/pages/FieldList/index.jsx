import React, { useState, useEffect } from 'react';
import { Card, Pagination, Row, Col, Checkbox } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import './FieldList.scss';
import HeaderUser from '../../components/HeaderUser';
import FooterUser from '../../components/FooterUser';

const { Meta } = Card;

function FieldList() {
	const [fieldTypes, setFieldTypes] = useState([]);
	const [selectedType, setSelectedType] = useState(null);
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [priceRange, setPriceRange] = useState([]);
	const [selectedPrice, setSelectedPrice] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const location = useLocation();
	const navigate = useNavigate();

	// Lấy danh sách sân từ location.state
	const listField = location.state?.listField || [];
	const [data, setData] = useState(listField);
	console.log(listField)
	// Tổng số sân sau khi lọc
	const totalItems = data.length;

	// Lấy dữ liệu hiển thị sau khi phân trang
	const filteredData = data
		.filter((field) => {
			// Bộ lọc theo loại sân
			if (selectedType && field.fieldType?.fieldTypeName !== selectedType) return false;
			// Bộ lọc theo vị trí
			if (selectedLocation && field.location !== selectedLocation) return false;
			// Bộ lọc theo giá
			if (selectedPrice && field.pricePerHour > selectedPrice) return false;
			return true;
		})
		.slice((currentPage - 1) * pageSize, currentPage * pageSize);

	// Xử lý khi chọn loại sân
	const handleTypeClick = (type) => {
		setSelectedType(type === selectedType ? null : type);
		setCurrentPage(1);
	};

	// Xử lý khi chọn vị trí
	const handleLocationClick = (location) => {
		setSelectedLocation(location === selectedLocation ? null : location);
		setCurrentPage(1);
	};

	// Xử lý khi chọn giá tiền
	const handlePriceClick = (price) => {
		setSelectedPrice(price === selectedPrice ? null : price);
		setCurrentPage(1);
	};

	// Xử lý khi đổi trang
	const handlePageChange = (page, size) => {
		setCurrentPage(page);
		setPageSize(size);
	};

	const handleFieldDetails = (id) => {
		navigate(`/fieldDetails/${id}`, {
			state: {
				idSan: id
			},
		});
	}
	const truncateText = (text, maxWords) => {
		const words = text.split(' ');
		if (words.length > maxWords) {
			return words.slice(0, maxWords).join(' ') + '...';
		}
		return text;
	};


	console.log(filteredData)
	return (
		<div className="fieldList">
			<div className="container">
				<div className="fieldList__inner">
					{/* Bảng loại sân */}
					<div className="fieldList__left">
						{/* Bộ lọc giá tiền */}
						<h3>Giá tiền</h3>
						<div className="fieldList__left--price">
							<div>
								<Checkbox
									checked={!selectedPrice}
									onChange={() => {
										setSelectedPrice(null);
										setCurrentPage(1);
									}}
								>
									Tất cả
								</Checkbox>
							</div>
							{[...new Set(listField.map((field) => Math.ceil(field.pricePerHour / 100) * 100))].map(
								(price, index) => (
									<div key={index}>
										<Checkbox
											checked={selectedPrice === price}
											onChange={() => handlePriceClick(price)}
										>
											≤ {price} VND
										</Checkbox>
									</div>
								)
							)}
						</div>
					</div>

					{/* Danh sách sân */}
					<div className="fieldList__right">
						<h1 className="fieldList__right--heading">Danh sách sân</h1>
						<Row gutter={[16, 16]}>
							{filteredData.map((field) => (
								<Col key={field.fieldId} xs={24} sm={12} md={8} lg={6}>
									<Card
										className='card'
										hoverable
										cover={<img alt={field?.fieldImageList[0]} src={field?.fieldImageList[0]?.fieldImageURL || '/default.jpg'} />}
										onClick={() => handleFieldDetails(field.fieldId)}
									>
										<Meta
											title={field.fieldName}
											description={`Giá: ${field.pricePerHour} VND`}
										/>
										<p>Vị trí: {truncateText(field.fieldAddress, 5)}</p>
										<p>Loại sân: {field.fieldType?.fieldTypeName}</p>
										<p>Trạng thái: {field.status}</p>
									</Card>
								</Col>
							))}
						</Row>
						<div className="pagination-container">
							<Pagination
								current={currentPage}
								pageSize={pageSize}
								total={totalItems}
								onChange={handlePageChange}
								showSizeChanger
								pageSizeOptions={['5', '10', '20']}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FieldList;
