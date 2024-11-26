import React, { useState } from 'react';
import axios from 'axios';
import './ChatBox.css'; // Thêm CSS cho khung chat

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // Quản lý trạng thái hiển thị khung chat

  // Hàm gửi tin nhắn đến API và nhận phản hồi
  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = {
      role: 'user',
      content: input
    };

    // Cập nhật trạng thái UI với tin nhắn của người dùng
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      // Gửi yêu cầu tới API backend
      const response = await axios.get('http://localhost:8080/api/prompt', {
        params: { prompt: input }
      });

      const aiMessage = {
        role: 'model',
        content: response.data.candidates[0].content.parts[0].text
      };

      // Cập nhật trạng thái UI với tin nhắn của AI
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      // Xóa ô nhập liệu sau khi gửi
      setInput('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chatbox-wrapper">
      {/* Nút hình tròn để mở khung chat */}
      {!isOpen && (
        <button className="chatbox-toggle" onClick={() => setIsOpen(true)}>
          💬
        </button>
      )}

      {/* Khung chat */}
      {isOpen && (
        <div className="chatbox-container">
          <div className="chatbox-header">
            <h4>Hỗ trợ</h4>
            <button className="chatbox-close" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>
          <div className="chatbox-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Nhập tin nhắn..."
            />
            <button onClick={sendMessage}>Gửi</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
