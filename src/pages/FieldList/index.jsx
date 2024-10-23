import React, { useState, useEffect } from 'react';
import { Card, Pagination, Row, Col, Checkbox } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FieldList.scss';

const { Meta } = Card;

function FieldList() {
	const [data, setData] = useState([]);
	const [fieldTypes, setFieldTypes] = useState([]);
	const [selectedType, setSelectedType] = useState(null);
	const [locations, setLocations] = useState([]);
	const [selectedLocation, setSelectedLocation] = useState(null);
	const [priceRange, setPriceRange] = useState([]);
	const [selectedPrice, setSelectedPrice] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalItems, setTotalItems] = useState(0);
	const navigate = useNavigate();

	// Fetch data from API for fields
	useEffect(() => {
		axios
			.get(`http://localhost:3005/fieldList?_page=${currentPage}&_limit=${pageSize}`)
			.then((response) => {
				setData(response.data);
				setTotalItems(parseInt(response.headers['x-total-count'], 10));
			})
			.catch((error) => console.error(error));
	}, [currentPage, pageSize]);

	// Fetch field types and locations from API
	useEffect(() => {
		axios
			.get(`http://localhost:3005/fieldList`)
			.then((response) => {
				const types = [...new Set(response.data.map(field => field.type))];
				setFieldTypes(types);

				const locations = [...new Set(response.data.map(field => field.location))];
				setLocations(locations);

				const prices = [...new Set(response.data.map(field => field.pricePerHour))];
				setPriceRange(prices);
			})
			.catch((error) => console.error(error));
	}, []);

	// Handle page change
	const handlePageChange = (page, pageSize) => {
		setCurrentPage(page);
		setPageSize(pageSize);
	};

	// Handle click event on field
	const handleFieldClick = (id) => {
		navigate(`/fieldDetails/${id}`);
	};

	// Handle click event on field type
	const handleTypeClick = (type) => {
		setSelectedType(selectedType === type ? null : type);
		setCurrentPage(1);
	};

	// Handle click event on location
	const handleLocationClick = (location) => {
		setSelectedLocation(selectedLocation === location ? null : location);
		setCurrentPage(1);
	};

	// Handle click event on price
	const handlePriceClick = (price) => {
		setSelectedPrice(selectedPrice === price ? null : price);
		setCurrentPage(1);
	};

	// Filter data based on selected type, location, and price
	const filteredData = data.filter(field => {
		const typeMatch = selectedType ? field.type === selectedType : true;
		const locationMatch = selectedLocation ? field.location === selectedLocation : true;
		const priceMatch = selectedPrice ? field.pricePerHour <= selectedPrice : true;

		return typeMatch && locationMatch && priceMatch;
	});

	return (
		<>
			<div className="fieldList">
				<div className="container">
					<div className="fieldList__inner">
						{/* Bảng loại sân */}
						<div className="fieldList__left">
							<h3>Loại sân</h3>
							<div className='fieldList__left--type'>
								<div>
									<Checkbox
										checked={!selectedType}
										onChange={() => {
											setSelectedType(null);
											setCurrentPage(1);
										}}
									>
										Tất cả
									</Checkbox>
								</div>
								{fieldTypes.map((type, index) => (
									<div key={index}>
										<Checkbox
											checked={selectedType === type}
											onChange={() => handleTypeClick(type)}
										>
											{type}
										</Checkbox>
									</div>
								))}
							</div>

							{/* Bộ lọc vị trí */}
							<h3>Vị trí</h3>
							<div className='fieldList__left--location'>
								<div>
									<Checkbox
										checked={!selectedLocation}
										onChange={() => {
											setSelectedLocation(null);
											setCurrentPage(1);
										}}
									>
										Tất cả
									</Checkbox>
								</div>
								{locations.map((location, index) => (
									<div key={index}>
										<Checkbox
											checked={selectedLocation === location}
											onChange={() => handleLocationClick(location)}
										>
											{location}
										</Checkbox>
									</div>
								))}
							</div>

							{/* Bộ lọc giá tiền */}
							<h3>Giá tiền</h3>
							<div className='fieldList__left--price'>
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
								{priceRange.map((price, index) => (
									<div key={index}>
										<Checkbox
											checked={selectedPrice === price}
											onChange={() => handlePriceClick(price)}
										>
											≤ {price} VND
										</Checkbox>
									</div>
								))}
							</div>
						</div>

						{/* Danh sách sân */}
						<div className="fieldList__right">
							<h1 className="fieldList__right--heading">Danh sách sân</h1>
							<Row gutter={[16, 16]}>
								{filteredData.map((field) => (
									<Col key={field.id} xs={24} sm={12} md={8} lg={8}>
										<Card
											hoverable
											cover={<img alt={field.fieldName} src={field.images[0]} />}
											onClick={() => handleFieldClick(field.id)}
										>
											<Meta
												title={field.fieldName}
												description={`Giá: ${field.pricePerHour} VND`}
											/>
											<p>Vị trí: {field.location}</p>
											<p>Tên chủ sân: {field.ownerName}</p>
											<p>SĐT: {field.ownerPhone}</p>
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
		</>
	);
}

export default FieldList;
