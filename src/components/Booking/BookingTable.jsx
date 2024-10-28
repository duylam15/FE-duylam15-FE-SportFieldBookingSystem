import React from 'react';

const BookingTable = ({ bookings, onEdit, onDelete }) => (
  <div>
    <h2>Booking List</h2>
    <table>
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Booking Code</th>
          <th>User</th>
          <th>Field</th>
          <th>Booking Date</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Status</th>
          <th>Total Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(booking => (
          <tr key={booking.bookingId}>
            <td>{booking.bookingId}</td>
            <td>{booking.bookingCode}</td>
            <td>{booking.user?.username}</td>
            <td>{booking.field?.name}</td>
            <td>{booking.bookingDate}</td>
            <td>{booking.startTime}</td>
            <td>{booking.endTime}</td>
            <td>{booking.status}</td>
            <td>{booking.totalPrice}</td>
            <td>
              <button onClick={() => onEdit(booking)}>Edit</button>
              <button onClick={() => onDelete(booking.bookingId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default BookingTable;
