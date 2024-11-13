// components/BookingCalendar.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Alert, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import crudService from "../../services/crudService";

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const { fieldId } = useParams();
  const navigate = useNavigate();
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // State để lưu thông báo lỗi
  const [fieldAddress, setFieldAddress] = useState("");
  const [fieldPrice, setFieldPrice] = useState(0);
  const [fieldName, setFieldName] = useState("");

  useEffect(() => {
    const fetchFieldDetails = async () => {
      try {
        const field = await crudService.read(`fields`, fieldId);
        if (field != null) {
          const timeSlotToEvents = field.timeSlotList.map((slot) => {
            // Tạo đối tượng Date từ date và startTime/endTime
            const startDate = new Date(`${slot.date}T${slot.startTime}`);
            const endDate = new Date(`${slot.date}T${slot.endTime}`);

            return {
              title: `Available from ${slot.startTime} to ${slot.endTime}`,
              start: startDate,
              end: endDate,
              allDay: false, // Xác định đây không phải là sự kiện cả ngày
            };
          });
          setEvents(timeSlotToEvents);
          setFieldPrice(field.pricePerHour); // Giá tiền theo giờ
          // setFieldAddress(field.location.locationNumber); // Địa chỉ của sân
          setFieldAddress("abc");
          setFieldName(field.fieldName);
          setErrorMessage(""); // Xóa thông báo lỗi nếu tìm thấy sân
        } else {
          setEvents([]); // Đặt danh sách sự kiện thành rỗng nếu không tìm thấy
          setErrorMessage("Không tìm thấy sân với ID đã cho."); // Thiết lập thông báo lỗi
        }
      } catch (error) {
        setErrorMessage("Đã có lỗi khi tải dữ liệu sân.");
      }
    };

    fetchFieldDetails();
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
    return sum + hours * fieldPrice;
  }, 0);

  // Hàm để lấy style cho các sự kiện
  const eventStyleGetter = (event) => {
    const isSelected = selectedEvents.some((e) => e.title === event.title);
    const backgroundColor = isSelected ? "lightblue" : "white"; // Màu nền
    const color = isSelected ? "black" : "black"; // Màu chữ

    return {
      style: {
        backgroundColor,
        color,
      },
    };
  };

  // Hàm xử lý đặt lịch
  const handleBooking = () => {
    navigate("/orderpage", {
      state: { selectedEvents, fieldAddress, fieldName },
    }); // Điều hướng đến trang FieldOrder và truyền dữ liệu
  };

  return (
    <Container fluid className="bg-light p-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}{" "}
      {/* Hiển thị thông báo lỗi */}
      <h2>Sân {fieldName}</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{
                  height: "calc(100vh - 250px)",
                  backgroundColor: "white",
                  overflowY: "hidden",
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
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Chi Tiết Đặt Sân</h5>
              <p>Địa chỉ sân: {fieldAddress}</p>
              <p>Giá tiền: {fieldPrice.toLocaleString()} đ / giờ</p>
              <p>Đã chọn {selectedEvents.length} khung giờ</p>
              <p>Tổng tiền: {totalAmount.toLocaleString()} đ</p>

              {selectedEvents.length > 0 ? (
                <Button variant="primary" onClick={handleBooking}>
                  Đặt lịch
                </Button>
              ) : (
                <Button variant="secondary" disabled>
                  Chọn khung giờ
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookingCalendar;
