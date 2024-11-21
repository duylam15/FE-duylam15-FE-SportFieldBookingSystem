import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import crudService from "../../services/crudService";
import { toast } from "react-toastify";

const FieldOrder = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Để điều hướng giữa các trang
  const { fieldName, dataBooking } = location.state || {};

  const googleMapsUrl = dataBooking.fieldAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        dataBooking.fieldAddress
      )}`
    : "#";
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState(dataBooking.selectedEvents || []);

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
  }, [dataBooking, navigate]);

  const handleSubmit = () => {
    const booking = {
      userId: dataBooking.userId, // ID người dùng
      fieldId: dataBooking.fieldId, // ID sân
      date: new Date().toISOString().split("T")[0], // Ngày hiện tại (YYYY-MM-DD)
      selectedEvents: dataBooking.selectedEvents.map((event) => ({
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
      booking: booking,
    };
    console.log(requestData);

    const rs = crudService.create("CustomerBooking", requestData);
    if (rs) {
      toast.success("Đặt sân thành công");
      console.log(rs);
    } else {
      toast.error("Đặt sân thất bại");
    }

    // setMessage("Thông tin đã được gửi thành công!");
  };

  // Hàm để xóa sự kiện và chuyển trang
  const handleDeleteEvent = (index) => {
    const updatedEvents = events.filter(
      (_, eventIndex) => eventIndex !== index
    );
    setEvents(updatedEvents);

    // Nếu có sự kiện nào còn lại, truyền lại dataBooking
    if (updatedEvents.length > 0) {
      dataBooking.selectedEvents = updatedEvents;
      // Truyền dataBooking khi điều hướng
    } else {
      toast.error("Không còn sự kiện nào.");
      navigate(`/booking/${dataBooking.fieldId}`, {
        state: { dataBooking: dataBooking },
      });
    }
    console.log(dataBooking);
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
      <Button className="col-1 m-3">Back</Button>
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
              <h2>Đặt lịch sân: {fieldName}</h2>
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
