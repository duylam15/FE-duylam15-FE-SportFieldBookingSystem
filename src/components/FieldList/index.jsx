import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import FieldForm from "../Field/FieldForm";
import crudService from "../../services/crudService";

const FieldList = () => {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchFields = async () => {
    try {
      const response = await crudService.read("fields"); // API lấy danh sách sân
      setFields(response);
    } catch (error) {
      toast.error("Lỗi khi tải danh sách sân!");
    }
  };

  useEffect(() => {
    fetchFields();
  }, []);

  const handleDelete = async (fieldId) => {
    try {
      await axios.delete(`/api/fields/${fieldId}`);
      toast.success("Xóa sân thành công!");
      fetchFields();
    } catch (error) {
      toast.error("Lỗi khi xóa sân!");
    }
  };

  const handleEdit = (field) => {
    setSelectedField(field);
    setShowModal(true);
  };

  return (
    <div>
      <h2>Quản lý Sân</h2>
      <Button onClick={() => setShowModal(true)}>Thêm sân mới</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã sân</th>
            <th>Tên sân</th>
            <th>Loại sân</th>
            <th>Địa chỉ</th>
            <th>Giá/giờ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.fieldId}>
              <td>{index + 1}</td>
              <td>{field.fieldCode}</td>
              <td>{field.fieldName}</td>
              <td>{field.fieldType?.fieldTypeName}</td>
              <td>{field.fieldAddress}</td>
              <td>{field.pricePerHour}</td>
              <td>
                <Button onClick={() => handleEdit(field)}>Sửa</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(field.fieldId)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal thêm/sửa sân */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedField ? "Chỉnh sửa sân" : "Thêm sân mới"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FieldForm
            field={selectedField}
            onSuccess={() => {
              fetchFields();
              setShowModal(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FieldList;
