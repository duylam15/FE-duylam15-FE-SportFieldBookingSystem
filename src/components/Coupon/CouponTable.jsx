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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {coupons.map((coupon) => (
                    <tr key={coupon.id}>
                        <td>{coupon.id}</td>
                        <td>{coupon.code}</td>
                        <td>{coupon.discount}</td>
                        <td>{coupon.user}</td>
                        <td>
                            <button onClick={() => onEdit(coupon.id)}>Edit</button>
                            <button onClick={() => onDelete(coupon.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CouponTable;
