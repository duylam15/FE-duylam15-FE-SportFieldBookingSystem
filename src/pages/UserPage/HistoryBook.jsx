import React, { useEffect, useState } from "react";
import "./UserPage.scss";
import UserPageMenu from "../../components/UserPageMenu";
import { useFetchProfile } from "../../utils/useFetchProfile";
import axios from "../../utils/axiosInstance";

export default function HistoryBook() {
	const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
	const { profile, loading, error } = useFetchProfile(token); // Sử dụng custom hook
	const [bookings, setBookings] = useState([]); // State để lưu danh sách booking
	const [filteredBookings, setFilteredBookings] = useState([]); // State để lưu danh sách booking đã lọc

	// Lấy dữ liệu từ API
	useEffect(() => {
		async function fetchBookings() {
			try {
				const response = await axios.get("http://localhost:8080/listBookings");
				if (response.data.statusCode === 0) {
					setBookings(response.data.data); // Lưu toàn bộ bookings
				}
			} catch (err) {
				console.error("Error fetching bookings:", err);
			}
		}
		fetchBookings();
	}, []);

	// Lọc danh sách booking khi profile hoặc bookings thay đổi
	useEffect(() => {
		if (profile?.userId && bookings.length > 0) {
			const filtered = bookings.filter(booking => booking.user === profile.userId);
			setFilteredBookings(filtered); // Lưu danh sách đã lọc
		}
	}, [profile, bookings]);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error loading profile: {error.message}</p>;

	return (
		<div className="users-page">
			<div className="container">
				<div className="users-page__body">
					<div className="users-page__body--left">
						<UserPageMenu />
					</div>
					<div className="history--right">
						<h2>Lịch sử đặt sân</h2>
						{filteredBookings.length > 0 ? (
							<table className="booking-table">
								<thead>
									<tr>
										<th>Mã Booking</th>
										<th>Giờ bắt đầu</th>
										<th>Giờ kết thúc</th>
										<th>Giá</th>
									</tr>
								</thead>
								<tbody>
									{filteredBookings.map((booking) => (
										<tr key={booking.bookingId}>
											<td>{booking.bookingCode}</td>
											<td>{booking.startTime}</td>
											<td>{booking.endTime}</td>
											<td>{booking.totalPrice.toLocaleString()} VNĐ</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>Không có lịch sử đặt sân.</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
