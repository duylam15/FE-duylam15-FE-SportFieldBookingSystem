import React, { useState, useEffect } from 'react';
import BookingTable from './BookingTable';
import BookingModal from './BookingModal';
import bookingService from '../../services/bookingService';

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = () => {
    bookingService.getAllBookings().then(data => setBookings(data));
  };

  const handleAddBooking = () => {
    setSelectedBooking(null);
    setIsModalOpen(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleDeleteBooking = (id) => {
    bookingService.deleteBooking(id).then(() => fetchBookings());
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchBookings();
  };

  const handleSaveBooking = (data) => {
    const savePromise = selectedBooking 
      ? bookingService.updateBooking(selectedBooking.bookingId, data)
      : bookingService.createBooking(data);
    savePromise.then(() => handleModalClose());
  };

  return (
    <div>
      <button onClick={handleAddBooking}>Add Booking</button>
      <BookingTable bookings={bookings} onEdit={handleEditBooking} onDelete={handleDeleteBooking} />
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveBooking} 
        booking={selectedBooking} 
      />
    </div>
  );
};

export default Booking;
