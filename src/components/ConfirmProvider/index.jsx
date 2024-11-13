import React, { useState, createContext, useContext } from "react";
import { Modal, Button } from "react-bootstrap";

// Context để truy cập `showConfirmMessage` trong toàn bộ ứng dụng
const ConfirmContext = createContext();

export const useConfirm = () => useContext(ConfirmContext);

export const ConfirmProvider = ({ children }) => {
  const [confirmData, setConfirmData] = useState(null);

  const showConfirmMessage = (message) => {
    return new Promise((resolve) => {
      setConfirmData({ message, resolve });
    });
  };

  const handleConfirm = (result) => {
    confirmData.resolve(result); // Trả về `true` hoặc `false` từ modal
    setConfirmData(null); // Đóng modal
  };

  return (
    <ConfirmContext.Provider value={{ showConfirmMessage }}>
      {children}

      {/* Hiển thị ConfirmModal khi có `confirmData` */}
      {confirmData && (
        <Modal show={true} onHide={() => handleConfirm(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận hành động</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{confirmData.message}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => handleConfirm(true)}>
              Xác nhận
            </Button>
            <Button variant="danger" onClick={() => handleConfirm(false)}>
              Hủy bỏ
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </ConfirmContext.Provider>
  );
};
