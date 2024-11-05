import React from 'react';
import { Button, Container } from 'react-bootstrap';
import BookingCalendar from '../../components/BookingCalendar';

function BookingPage() {
  const handleBooking = (selectedSlots) => {
    console.log("Danh sách các slot đã chọn:", selectedSlots);
    alert("Đặt lịch thành công!");
  };

  return (
    <Container fluid>
      <div className='row'> 
        <Button className='col-1 m-3'>Back</Button>
        <h2 className='col text-center'>Lịch đặt sân</h2>
      </div>
      <BookingCalendar onBooking={handleBooking} />
    </Container>
  );
}

export default BookingPage;
