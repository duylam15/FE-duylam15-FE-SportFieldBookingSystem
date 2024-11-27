import React, { useState, useEffect } from "react";
import BookingTable from "./BookingTable";
import BookingModal from "./BookingModal";
import { getAllBookings } from "../../services/bookingService";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [formValues, setFormValues] = useState({
    bookingCode: "",
    user: "",
    field: "",
    startTime: "",
    endTime: "",
    bookingDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getAllBookings();
      setBookings(response.data);
      console.log("response bokking: ", response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const handleOpenAddModal = () => {
    setFormValues({
      bookingCode: "",
      user: "",
      field: "",
      startTime: "",
      endTime: "",
      bookingDate: "",
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (booking) => {
    try {
      setFormValues(booking);
      setSelectedBookingId(booking.bookingId);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error setting up edit modal for booking:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormValues({
      bookingCode: "",
      user: "",
      field: "",
      startTime: "",
      endTime: "",
      bookingDate: "",
    });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await bookingService.updateBooking(selectedBookingId, formValues);
      } else {
        await bookingService.createBooking(formValues);
      }
      fetchBookings();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await bookingService.deleteBooking(id);
      fetchBookings();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };
  console.log(bookings);

  return (
    <div>
      <h1>Booking Management</h1>
      {/* <button onClick={handleOpenAddModal}>Add Booking</button> */}
      <BookingTable
        bookings={bookings}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteBooking}
      />
      <BookingModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        formValues={formValues}
        setFormValues={setFormValues}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Booking;
