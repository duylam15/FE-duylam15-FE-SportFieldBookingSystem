import React, { useState, useEffect } from "react";
import crudService from "../../../services/crudService";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useConfirm } from "../../ConfirmProvider";

const URL_NAME = `fieldType`;

const FieldType = () => {
  //confirm modal
  const { showConfirmMessage } = useConfirm();
  //data
  const [fieldTypes, setFieldTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState({
    fieldTypeName: "",
    fieldTypeDesc: "",
  });

  // Lấy danh sách FieldType từ server
  useEffect(() => {
    fetchFieldTypes();
  }, []);

  const fetchFieldTypes = async () => {
    const data = await crudService.read(URL_NAME);
    setFieldTypes(data);
  };

  // Mở modal để thêm hoặc chỉnh sửa
  const openModal = (fieldType = { fieldTypeName: "", fieldTypeDesc: "" }) => {
    setCurrentFieldType(fieldType);
    setIsEditing(!!fieldType.fieldTypeId);
    setShowModal(true);
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentFieldType({ fieldTypeName: "", fieldTypeDesc: "" });
  };

  // Xử lý lưu FieldType mới hoặc chỉnh sửa
  const handleSave = async () => {
    const confirmMessage = isEditing
      ? `Bạn có chắc chắn muốn cập nhật loại id: ${currentFieldType.fieldTypeId} này không?`
      : `Bạn có chắc chắn muốn thêm loại sân này không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    if (confirmed) {
      try {
        if (isEditing) {
          await crudService.update(
            URL_NAME,
            currentFieldType.fieldTypeId,
            currentFieldType
          );
        } else {
          await crudService.create(URL_NAME, currentFieldType);
        }
        closeModal();
        fetchFieldTypes();
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi lưu loại sân!");
      }
    }
  };

  // Xử lý xóa FieldType
  const handleDelete = async (id) => {
    const confirmMessage = `Bạn có chắc chắn muốn xóa field type id: ${id} này không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    if (confirmed) {
      await crudService.delete(URL_NAME, id);
    }

    fetchFieldTypes();
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý Loại Sân</h2>
      <Button variant="primary" onClick={() => openModal()}>
        Thêm Loại Sân
      </Button>

      {/* Bảng hiển thị danh sách FieldType */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Loại Sân</th>
            <th>Mô Tả</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {fieldTypes.map((fieldType) => (
            <tr key={fieldType.fieldTypeId}>
              <td>{fieldType.fieldTypeId}</td>
              <td>{fieldType.fieldTypeName}</td>
              <td>{fieldType.fieldTypeDescription}</td>
              <td>
                <Button variant="warning" onClick={() => openModal(fieldType)}>
                  Sửa
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(fieldType.fieldTypeId)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm/Sửa FieldType */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Chỉnh Sửa Loại Sân" : "Thêm Loại Sân"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên Loại Sân</Form.Label>
              <Form.Control
                type="text"
                value={currentFieldType.fieldTypeName}
                onChange={(e) =>
                  setCurrentFieldType({
                    ...currentFieldType,
                    fieldTypeName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentFieldType.fieldTypeDescription}
                onChange={(e) =>
                  setCurrentFieldType({
                    ...currentFieldType,
                    fieldTypeDescription: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {isEditing ? "Cập Nhật" : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FieldType;
