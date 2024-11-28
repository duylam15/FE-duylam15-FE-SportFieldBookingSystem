// src/components/Coupon.js
import React, { useEffect, useState } from 'react';
import { getAllCoupons, getCouponById, createCoupon, updateCoupon, deleteCoupon } from '../../services/couponService';
import CouponTable from './CouponTable';
import CouponModal from './CouponModal';

const Coupon = () => {
    const [coupons, setCoupons] = useState([]);
    const [formValues, setFormValues] = useState({ code: '', discount: '', user: '', expirationDate:'' });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCouponId, setSelectedCouponId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await getAllCoupons();
            setCoupons(response.data.data);
        } catch (error) {
            console.error('Error fetching coupons:', error);
        }
    };

    const handleOpenAddModal = () => {
        setFormValues({ code: '', discountValue: '', user: '' });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleOpenEditModal = async (id) => {
        try {
            const response = await getCouponById(id);
            setFormValues(response.data.data);
            setSelectedCouponId(id);
            setIsEditing(true);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching coupon:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormValues({ code: '', discount: '', user: '' });
    };

    const handleSubmit = async () => {
        if (isEditing) {
            await updateCoupon(selectedCouponId, formValues);
        } else {
            await createCoupon(formValues);
        }
        fetchCoupons();
        handleCloseModal();
    };

    const handleDeleteCoupon = async (id) => {
        try {
            await deleteCoupon(id);
            fetchCoupons();
        } catch (error) {
            console.error('Error deleting coupon:', error);
        }
    };

    return (
        <div>
            <h1>Coupon Management</h1>
            <button onClick={handleOpenAddModal}>Add Coupon</button>
            <CouponTable coupons={coupons} onEdit={handleOpenEditModal} onDelete={handleDeleteCoupon} />
            <CouponModal
                show={showModal}
                handleClose={handleCloseModal}
                formValues={formValues}
                setFormValues={setFormValues}
                onSubmit={handleSubmit}
                isEditing={isEditing}
            />
        </div>
    );
};

export default Coupon;
