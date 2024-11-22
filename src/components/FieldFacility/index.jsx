import React, { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import { Button, Table, Modal, Form } from "react-bootstrap";

import { useConfirm } from "../ConfirmProvider";
import { toast } from "react-toastify";

const URL_NAME = `facilities`;

const FieldFacility = () => {
  //confirm modal
  const { showConfirmMessage } = useConfirm();
  //data
  const [fieldFacility, setFieldFacility] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFieldFac, setCurrentFieldFac] = useState({
    fieldFacilityName: "",
  });

  useEffect(() => {
    fetchFieldFacilities();
  }, []);

  const fetchFieldFacilities = async () => {
    const data = await crudService.read(URL_NAME);
    setFieldFacility(data);
  };
  const openModal = (fieldFacility = { fieldFacilityName: "" }) => {
    setCurrentFieldFac(fieldFacility);
    setIsEditing(!!fieldFacility.fieldFacilityId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentFieldFac({ fieldFacilityName: "" });
  };

  const handleSave = async () => {
    const confirmMessage = isEditing
      ? `Bạn có chắc chắn muốn cập nhật tiện ích id: ${currentFieldFac.fieldFacilityId} không?`
      : `Bạn chắc chắn muốn thêm tiện ích này không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    if (confirmed) {
      var rs;
      try {
        if (isEditing) {
          rs = await crudService.update(
            URL_NAME,
            currentFieldFac.fieldFacilityId,
            currentFieldFac
          );
        } else {
          rs = await crudService.create(URL_NAME, currentFieldFac);
        }
        if (rs != null) {
          toast.success("Thêm thành công.", "Thông báo");
        } else {
          toast.error("Thất bại!", "Thông báo");
        }
        closeModal();
        fetchFieldFacilities();
      } catch (error) {
        toast.error(`Đã xảy ra lỗi khi lưu tiện ích`);
      }
    }
  };

  const handleDelete = async (id) => {
    const confirmMessage = `Bạn có chắc chắn muốn xóa tiện ích id: ${id} không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    if (confirmed) {
      const rs = await crudService.delete(URL_NAME, id);
      if (rs != null) {
        toast.success(`Xóa tiện ích id : ${id} thành công`, `Thông báo`);
      } else {
        toast.error(`Có lỗi trong quá trình xóa!`, `Thông báo`);
      }
    }
    fetchFieldFacilities();
  };

  return (
    <div className="container mt-4">
      <h2>Quản lý tiện ích</h2>
      <Button variant="primary" onClick={() => openModal()}>
        Thêm tiện ích
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên tiện ích</th>
            <th>Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {fieldFacility.map((fieldFac) => (
            <tr key={fieldFac.fieldFacilityId}>
              <td>{fieldFac.fieldFacilityId}</td>
              <td>{fieldFac.fieldFacilityName}</td>
              <td>
                <Button variant="warning" onClick={() => openModal(fieldFac)}>
                  Sửa
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(fieldFac.fieldFacilityId)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? `Chỉnh sửa tiện ích` : `Thêm tiện ích`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên tiện ích</Form.Label>
              <Form.Control
                type="text"
                value={currentFieldFac.fieldFacilityName}
                onChange={(e) =>
                  setCurrentFieldFac({
                    ...currentFieldFac,
                    fieldFacilityName: e.target.value,
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
            {isEditing ? `Cập nhật` : `Lưu`}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FieldFacility;
