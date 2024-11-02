// src/components/CouponTable.js
import React from 'react';

const CouponTable = ({ coupons, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Code</th>
                    <th>Discount</th>
                    <th>User ID</th>
                    <th>Expiration Date</th> {/* Thêm tiêu đề cho ngày hết hạn */}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coupons && coupons.length > 0 ? (
                    coupons.map((coupon) => (
                        <tr key={coupon.id}>
                            <td>{coupon.id}</td>
                            <td>{coupon.code}</td>
                            <td>{coupon.discount}</td>
                            <td>{coupon.user}</td>
                            <td>{new Date(coupon.expirationDate).toLocaleDateString()}</td> {/* Hiển thị ngày hết hạn */}
                            <td>
                                <button onClick={() => onEdit(coupon.couponId)}>Edit</button>
                                <button onClick={() => onDelete(coupon.couponId)}>Delete</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6">No coupons available</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default CouponTable;
