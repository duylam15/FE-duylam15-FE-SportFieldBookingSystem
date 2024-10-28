import React, { useState, useEffect } from 'react';

const BookingModal = ({ isOpen, onClose, onSave, booking }) => {
  const [formData, setFormData] = useState({
    bookingCode: '',
    userId: '',
    fieldId: '',
    bookingDate: '',
    startTime: '',
    endTime: '',
    status: '',
    totalPrice: '',
  });

  useEffect(() => {
    if (booking) setFormData(booking);
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{booking ? 'Edit Booking' : 'Add Booking'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Booking Code:</label>
          <input name="bookingCode" value={formData.bookingCode} onChange={handleChange} />
          <label>User ID:</label>
          <input name="userId" value={formData.userId} onChange={handleChange} />
          <label>Field ID:</label>
          <input name="fieldId" value={formData.fieldId} onChange={handleChange} />
          <label>Booking Date:</label>
          <input name="bookingDate" type="date" value={formData.bookingDate} onChange={handleChange} />
          <label>Start Time:</label>
          <input name="startTime" type="time" value={formData.startTime} onChange={handleChange} />
          <label>End Time:</label>
          <input name="endTime" type="time" value={formData.endTime} onChange={handleChange} />
          <label>Status:</label>
          <input name="status" value={formData.status} onChange={handleChange} />
          <label>Total Price:</label>
          <input name="totalPrice" type="number" value={formData.totalPrice} onChange={handleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
