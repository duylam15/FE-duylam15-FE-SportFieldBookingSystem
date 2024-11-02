import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getAllBookings = () => axios.get(`${API_BASE_URL}/listBookings`).then(res => res.data);
export const getBookingByCode = (code) => axios.get(`${API_BASE_URL}/booking/${code}`).then(res => res.data);
export const createBooking = (data) => axios.post(`${API_BASE_URL}/booking`, data).then(res => res.data);
export const updateBooking = (id, data) => axios.put(`${API_BASE_URL}/booking/${id}`, data).then(res => res.data);
export const deleteBooking = (id) => axios.delete(`${API_BASE_URL}/booking/${id}`).then(res => res.data);