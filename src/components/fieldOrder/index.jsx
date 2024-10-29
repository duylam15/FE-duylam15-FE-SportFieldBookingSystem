import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const FieldOrder = () => {
  const location = useLocation();
  const { selectedEvents, fieldAddress } = location.state || {};

  // Kiểm tra nếu fieldAddress không tồn tại
  const googleMapsUrl = fieldAddress 
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fieldAddress)}` 
    : '#'; // Nếu không có địa chỉ, đặt URL thành '#'

  // State để lưu thông tin người dùng
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState(''); // Thông báo sau khi gửi thông tin

  const handleSubmit = () => {
    // Xử lý thông tin người dùng
    console.log('Tên:', userName);
    console.log('Số điện thoại:', userPhone);
    console.log('Email:', userEmail);
    setMessage('Thông tin đã được gửi thành công!'); // Hiển thị thông báo
  };

  return (
    <Container fluid className="p-4" style={{ backgroundColor: 'white' }}>
      <Row>
        <Col md={6}>
          <h3>Thông tin người dùng</h3>
          <Form>
            <Form.Group controlId="formUserName">
              <Form.Label>Tên:</Form.Label>
              <Form.Control 
                type="text" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formUserPhone">
              <Form.Label>Số điện thoại:</Form.Label>
              <Form.Control 
                type="tel" 
                value={userPhone} 
                onChange={(e) => setUserPhone(e.target.value)} 
                required 
              />
            </Form.Group>

            <Form.Group controlId="formUserEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control 
                type="email" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
                required 
              />
            </Form.Group>

            <Button variant="primary" onClick={handleSubmit}>Gửi thông tin</Button>
            {message && <Alert variant="success" className="mt-3">{message}</Alert>}
          </Form>
        </Col>
        <Col md={6}>
          <h1>Thông Tin Đặt Lịch</h1>

          {selectedEvents && selectedEvents.length > 0 ? (
            <ul>
              {selectedEvents.map((event, index) => (
                <li key={index}>
                  {event.title} - {event.start.toString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có khung giờ nào được chọn.</p>
          )}

          <h2>Địa chỉ sân: {fieldAddress}</h2>
          <div>
            <h3>Đi đến địa chỉ:</h3>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              {fieldAddress}
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default FieldOrder;
