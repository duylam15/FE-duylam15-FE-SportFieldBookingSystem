// components/BookingCalendar.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Container, Alert, Button } from 'react-bootstrap';
import { fields, fieldType } from '../../data';

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const [fieldAddress, setfieldAddress] = useState("");
  const [fieldPrice, setFieldPrice] = useState(0);

  useEffect(() => {
    const field = fields.find((f) => f.fieldId === parseInt(fieldId));
    if (field) {
      setEvents(field.timeSlotList);
      setFieldPrice(field.pricePerHour);
      setfieldAddress(field.location.street.streetName);
      setErrorMessage(""); // Xóa thông báo lỗi nếu tìm thấy sân
    } else {
      setEvents([]); // Đặt danh sách sự kiện thành rỗng nếu không tìm thấy
      setErrorMessage("Không tìm thấy sân với ID đã cho."); // Thiết lập thông báo lỗi
    }
}, [fieldId]);

const handleSelectEvent = (event) => {
  const isSelected = selectedEvents.some((e) => e.title === event.title);
  if (isSelected) {
    setSelectedEvents(selectedEvents.filter((e) => e.title !== event.title));
  } else {
    setSelectedEvents([...selectedEvents, event]);
  }
};

const totalAmount = selectedEvents.reduce((sum, event) => {
  const hours = (event.end - event.start) / (1000 * 60 * 60); // Tính số giờ từ start và end
  return sum + (hours * fieldPrice); 
}, 0);

 // Hàm để lấy style cho các sự kiện
const eventStyleGetter = (event) => {
  const isSelected = selectedEvents.some((e) => e.title === event.title);
  const backgroundColor = isSelected ? 'lightblue' : 'white'; // Màu nền
  const color = isSelected ? 'black' : 'black'; // Màu chữ

  return {
    style: {
      backgroundColor,
      color,
    },
  };
};

  // Hàm xử lý đặt lịch
const handleBooking = () => {
    navigate('/orderpage', { state: { selectedEvents , fieldAddress} }); // Điều hướng đến trang FieldOrder và truyền dữ liệu
};

return (
  <Container fluid className='bg-success p-1'>
    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Hiển thị thông báo lỗi */}

    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{
        height: 'calc(100vh - 200px)',
        backgroundColor: 'white',
        overflowY: 'hidden',
      }}
      defaultView="week"
      selectable
      onSelectEvent={handleSelectEvent}
      eventPropGetter={eventStyleGetter} // Gán hàm lấy style cho các sự kiện
      messages={{
        week: "Tuần",
        day: "Ngày",
        today: "Hôm nay",
        previous: "Trước",
      }}
    />
    <div className="text-center mt-3">
      <p>Đã chọn {selectedEvents.length} khung giờ</p>
      <div className='col'>
        <p>Tổng tiền: {totalAmount.toLocaleString()} đ</p>
        {selectedEvents.length > 0 && (
          <button className="btn btn-primary" onClick={handleBooking}>
           Đặt lịch
          </button>
        )}
      </div>
    </div>
  </Container>
);
};

export default BookingCalendar;
