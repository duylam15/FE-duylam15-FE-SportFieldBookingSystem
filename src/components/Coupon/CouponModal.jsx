// src/components/CouponModal.js
import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CouponModal = ({ show, handleClose, formValues, setFormValues, onSubmit, isEditing }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Edit Coupon' : 'Add Coupon'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="code"
                            placeholder="Code"
                            value={formValues.code}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Discount</Form.Label>
                        <Form.Control
                            type="number"
                            name="discountValue"
                            placeholder="Discount"
                            value={formValues.discountValue}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>User ID</Form.Label>
                        <Form.Control
                            type="text"
                            name="user"
                            placeholder="User ID"
                            value={formValues.user}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="expirationDate"
                            value={formValues.expirationDate} // Thêm trường này
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={onSubmit}>
                    {isEditing ? 'Update Coupon' : 'Add Coupon'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CouponModal;
