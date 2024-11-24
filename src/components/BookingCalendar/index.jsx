// components/BookingCalendar.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Container, Alert, Button, Row, Col, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import crudService from "../../services/crudService";

const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  // Lấy dữ liệu từ state khi điều hướng
  const location = useLocation();
  const { fieldId } = useParams();
  const navigate = useNavigate();

  // Dữ liệu chính của booking
  const [dataBooking, setDataBooking] = useState(null);
  const [events, setEvents] = useState([]); // Dữ liệu sự kiện
  const [errorMessage, setErrorMessage] = useState(""); // Lỗi

  const now = new Date();
  const filteredEvents = events.filter((event) => new Date(event.start) >= now);

  useEffect(() => {
    const fetchFieldDetails = async () => {
      try {
        const field = await crudService.read(`fields`, fieldId);

        if (field) {
          const timeSlotToEvents = field.timeSlotList.map((slot) => {
            const startDate = new Date(`${slot.date}T${slot.startTime}`);
            const endDate = new Date(`${slot.date}T${slot.endTime}`);
            const durationInHours = (endDate - startDate) / (1000 * 60 * 60);
            const totalAmount = durationInHours * field.pricePerHour;

            return {
              id: slot.id,
              title: `${totalAmount.toLocaleString()} đ`,
              start: startDate,
              end: endDate,
              totalPrice: totalAmount,
              status: slot.status,
            };
          });

          setEvents(timeSlotToEvents);
          setErrorMessage("");

          if (!dataBooking) {
            const data = {
              userId: "1",
              fieldId: fieldId,
              fieldName: field.fieldName,
              fieldAddress: "Không có địa chỉ",
              date: new Date(),
              fieldPrice: field.pricePerHour,
              selectedEvents: [],
            };
            setDataBooking(data);
          }
        } else {
          setEvents([]);
          setErrorMessage("Không tìm thấy sân với ID đã cho.");
        }
      } catch (error) {
        setErrorMessage("Đã có lỗi khi tải dữ liệu sân.");
      }
    };

    fetchFieldDetails();
  }, [fieldId, dataBooking]);
  console.log(events);
  const handleSelectEvent = (event) => {
    if (event.status === "BOOKED" || event.status === "PENDING") {
      toast.error("Khung giờ này không khả dụng!");
      return;
    }
    const isSelected = dataBooking.selectedEvents.some(
      (e) => e.id === event.id
    );
    const updatedEvents = isSelected
      ? dataBooking.selectedEvents.filter((e) => e.id !== event.id)
      : [...dataBooking.selectedEvents, event];

    setDataBooking({ ...dataBooking, selectedEvents: updatedEvents });
  };

  const totalAmount =
    dataBooking?.selectedEvents?.reduce((sum, event) => {
      const hours = (event.end - event.start) / (1000 * 60 * 60);
      return sum + hours * dataBooking.fieldPrice;
    }, 0) || 0;

  const eventStyleGetter = (event) => {
    const isSelected = dataBooking.selectedEvents.some(
      (e) => e.id === event.id
    );

    // Xác định màu nền dựa trên trạng thái sự kiện
    const backgroundColor =
      event.status === "BOOKED" || event.status === "PENDING"
        ? "#e0e0e0" // Màu xám cho trạng thái không khả dụng
        : isSelected
        ? "lightblue" // Màu xanh nhạt nếu đã chọn
        : "white"; // Màu trắng cho trạng thái khả dụng

    return {
      style: {
        backgroundColor,
        color:
          event.status === "BOOKED" || event.status === "PENDING"
            ? "#6c757d"
            : "black", // Màu chữ xám cho trạng thái không khả dụng
        pointerEvents:
          event.status === "BOOKED" || event.status === "PENDING"
            ? "none" // Không cho phép chọn
            : "auto", // Cho phép chọn
      },
    };
  };

  const handleBooking = () => {
    navigate("/orderpage", {
      state: { dataBooking },
    });
  };

  const slotPropGetter = (date) => {
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(now.getDate() + 14);
    if (date < now || date > twoWeeksLater) {
      return {
        style: {
          backgroundColor: "#e0e0e0",
          pointerEvents: "none",
        },
      };
    }
    return {};
  };

  const handleSelectSlot = (slotInfo) => {
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(now.getDate() + 14);
    if (slotInfo.start < now || slotInfo.start > twoWeeksLater) {
      toast.error("Thời gian chọn không khả dụng!");
    }
  };

  return (
    <Container fluid className="bg-light p-4">
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <h2>Sân {dataBooking?.fieldName}</h2>
      <Row>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Calendar
                localizer={localizer}
                events={filteredEvents}
                startAccessor="start"
                endAccessor="end"
                min={new Date().setHours(8, 0, 0)}
                max={new Date().setHours(23, 30, 0)}
                style={{
                  height: "calc(100vh - 250px)",
                  backgroundColor: "white",
                  overflowY: "hidden",
                }}
                defaultView="week"
                selectable
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                slotPropGetter={slotPropGetter}
                onSelectSlot={handleSelectSlot}
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
              <p>Địa chỉ sân: {dataBooking?.fieldAddress}</p>
              <p>
                Giá tiền: {dataBooking?.fieldPrice?.toLocaleString()} đ / giờ
              </p>
              <p>
                Đã chọn {dataBooking?.selectedEvents?.length || 0} khung giờ
              </p>
              <p>Tổng tiền: {totalAmount.toLocaleString()} đ</p>

              {dataBooking?.selectedEvents?.length > 0 ? (
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
