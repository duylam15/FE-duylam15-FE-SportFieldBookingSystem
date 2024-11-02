// src/services/couponService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // replace with your backend base URL

export const getAllCoupons = () => axios.get(`${API_URL}/listCoupons`);
export const getCouponById = (id) => axios.get(`${API_URL}/coupon/${id}`);
export const createCoupon = (coupon) => axios.post(`${API_URL}/coupon`, coupon);
export const updateCoupon = (id, coupon) => axios.put(`${API_URL}/coupon/${id}`, coupon);
export const deleteCoupon = (id) => axios.delete(`${API_URL}/deleteCoupon/${id}`);
