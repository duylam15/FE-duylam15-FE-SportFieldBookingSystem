import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import Map from "../../Field/Map";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
//THONG TIN BOOKING
import { useBooking } from "../../BookingContext";

const FieldOrder = () => {
  const navigate = useNavigate(); // Để điều hướng giữa các trang
  const { dataBooking } = useBooking();
  console.log(dataBooking);
  const googleMapsUrl = dataBooking?.fieldAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        dataBooking?.fieldAddress
      )}`
    : "#";
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState(dataBooking.selectedEvents || []);
  const [address, setAddress] = useState({
    longitude: 0,
    latitude: 0,
  });


  useEffect(() => {
    const handlePopState = () => {
      // Khi người dùng nhấn "Go Back", truyền `dataBooking` về
      if (dataBooking) {
        navigate(-1, { state: { dataBooking } });
      }
    };
    window.addEventListener("popstate", handlePopState);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [dataBooking, navigate, address]);

  const handleSubmit = async () => {
    const booking = {
      userId: dataBooking.userId, // ID người dùng
      fieldId: dataBooking.fieldId, // ID sân
      date: new Date().toISOString().split("T")[0], // Ngày hiện tại (YYYY-MM-DD)

      selectedEvents: dataBooking.selectedEvents.map((event) => ({
        id: event.id,
        start: new Date(event.start).toLocaleTimeString("en-GB"),
        end: new Date(event.end).toLocaleTimeString("en-GB"),
        totalPrice: event.totalPrice, // Tổng giá tiền
      })),
    };

    const requestData = {
      name: userName,
      phoneNumber: userPhone,
      email: userEmail,
      bookingDate: new Date().toISOString().split("T")[0],
      totalAmount: dataBooking.totalAmount,
      booking: booking,
    };
    console.log(requestData);
    // toast.success("oke");
    try {
      const totalAmount =
        dataBooking?.selectedEvents?.reduce(
          (sum, event) => sum + (event.totalPrice || 0),
          0
        ) || 0;

      // In ra tổng số tiền
      console.log("Tổng số tiền:", totalAmount);
      // Gửi request tạo URL thanh toán
      const paymentResponse = await crudService.getPaymentUrl(
        "payment/url",
        totalAmount
      );
      const rs = crudService.create("CustomerBooking", requestData);
      if (paymentResponse && paymentResponse.data) {
        // Chuyển đến trang thanh toán
        window.location.href = paymentResponse.data;
      } else {
        toast.error("Không thể tạo URL thanh toán!");
      }
    } catch (error) {
      toast.error("Lỗi khi tạo URL thanh toán: " + error.message);
    }

    // setMessage("Thông tin đã được gửi thành công!");
  };

  // Hàm để xóa sự kiện và chuyển trang
  const handleDeleteEvent = (index) => {
    // Lọc các sự kiện, loại bỏ sự kiện tại vị trí index
    const updatedEvents = events.filter(
      (_, eventIndex) => eventIndex !== index
    );

    // Cập nhật state với danh sách sự kiện mới
    setEvents(updatedEvents);

    // Tính toán lại tổng tiền dựa trên các sự kiện còn lại
    const totalAmount = updatedEvents.reduce((sum, event) => {
      const hours = (event.end - event.start) / (1000 * 60 * 60); // Tính số giờ
      return sum + hours * dataBooking.fieldPrice; // Cộng dồn giá
    }, 0);

    // Cập nhật giá trị trong dataBooking
    dataBooking.totalAmount = totalAmount;
    dataBooking.selectedEvents = updatedEvents;

    // Kiểm tra xem danh sách sự kiện có còn không
    if (updatedEvents.length > 0) {
      toast.success("Đã xóa sự kiện thành công.");
    } else {
      toast.error("Không còn sự kiện nào.");
      // Điều hướng trở lại trang booking nếu không còn sự kiện
      navigate(`/booking/${dataBooking.fieldId}`, { state: { dataBooking } });
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Button className="col-1 m-3" onClick={() => handleBack()}>
        Back
      </Button>
      <Row className="mb-4">
        <Col md={5}>
          <Card>
            <Card.Body>
              <h3 className="mb-4">Thông tin người dùng</h3>
              <Form>
                <Form.Group controlId="formUserName">
                  <Form.Label>Tên:</Form.Label>
                  <Form.Control
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    placeholder="Nhập tên của bạn"
                  />
                </Form.Group>

                <Form.Group controlId="formUserPhone">
                  <Form.Label>Số điện thoại:</Form.Label>
                  <Form.Control
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    required
                    placeholder="Nhập số điện thoại"
                  />
                </Form.Group>

                <Form.Group controlId="formUserEmail">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    placeholder="Nhập email"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  className="w-100 mt-3"
                >
                  Gửi thông tin
                </Button>
                {message && (
                  <Alert variant="success" className="mt-3 text-center">
                    {message}
                  </Alert>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <h2>Đặt lịch sân: {dataBooking.fieldName}</h2>
              {events && events.length > 0 ? (
                <div>
                  <h4 className="mb-3">Danh sách thời gian đã chọn</h4>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Start Time</th>
                        <th>End Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {events.map((event, index) => (
                        <tr key={index}>
                          <td>{event.title}</td>
                          <td>{new Date(event.start).toLocaleString()}</td>
                          <td>{new Date(event.end).toLocaleString()}</td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => handleDeleteEvent(index)}
                            >
                              Xóa
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div>
                    Tổng tiền {dataBooking.totalAmount.toLocaleString()} đ
                  </div>
                </div>
              ) : (
                <p>Không có khung giờ nào được chọn.</p>
              )}

              <h4 className="mt-4">Địa chỉ sân:</h4>
              <p>{dataBooking.fieldAddress}</p>
              <Button
                variant="link"
                href={googleMapsUrl}
                target="_blank"
                className="d-flex align-items-center"
              >
                <FaMapMarkerAlt /> Đi đến địa chỉ
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FieldOrder;
