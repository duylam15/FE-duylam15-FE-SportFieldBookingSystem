import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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

const FieldOrder = () => {
  const location = useLocation();
  const { selectedEvents, fieldAddress, fieldName } = location.state || {};

  // Kiểm tra nếu fieldAddress không tồn tại
  const googleMapsUrl = fieldAddress
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        fieldAddress
      )}`
    : "#"; // Nếu không có địa chỉ, đặt URL thành '#'

  // State để lưu thông tin người dùng
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState(""); // Thông báo sau khi gửi thông tin

  const handleSubmit = () => {
    // Xử lý thông tin người dùng
    console.log("Tên:", userName);
    console.log("Số điện thoại:", userPhone);
    console.log("Email:", userEmail);
    setMessage("Thông tin đã được gửi thành công!");
    navigate("/ordermodel", {
      state: { selectedEvents, fieldAddress, fieldName },
    });
    // Hiển thị thông báo
  };

  // Hàm để xóa sự kiện
  const handleDeleteEvent = (index) => {
    // Xóa sự kiện khỏi danh sách
    const updatedEvents = selectedEvents.filter(
      (_, eventIndex) => eventIndex !== index
    );
    setSelectedEvents(updatedEvents);
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
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
              {selectedEvents && selectedEvents.length > 0 ? (
                <div>
                  <h4 className="mb-3">Danh sách sự kiện đã chọn</h4>
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
                      {selectedEvents.map((event, index) => (
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
              <p>{fieldAddress}</p>
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
