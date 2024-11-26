import React, { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "../ConfirmProvider";

const Field = () => {
  const [fields, setFields] = useState([]);
  //confirm modal
  const { showConfirmMessage } = useConfirm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchFields();
    fetchFieldTypes();
  }, []);

  const initialFieldData = () => ({
    fieldId: "",
    fieldCode: "",
    fieldName: "",
    fieldAddress: "",
    capacity: "",
    pricePerHour: "",
    fieldTypeId: "",
    locationId: "",
    status: "",
    images: [],
  });

  const fetchFields = async () => {
    try {
      const response = await crudService.read("fields");
      setFields(response);
    } catch (error) {
      toast.error("Error fetching fields.");
      console.error(error);
    }
  };

  const fetchFieldTypes = async () => {
    try {
      const response = await crudService.read("fieldType");
      setFieldTypes(response);
    } catch (error) {
      toast.error("Error fetching field types.");
      console.error(error);
    }
  };

  const handleAddField = () => {
    setIsEditing(false);
    setFieldData(initialFieldData());
    setShowModal(true);
  };

  const handleEditField = (fieldId) => {
    navigate(`/fields/edit/${fieldId}`);
  };

  const handleDeleteField = async (fieldId) => {
    try {
      const confirmMessage = `Bạn có chắc chắn muốn xóa field có id: ${fieldId} không?`;
      const confirmed = await showConfirmMessage(confirmMessage);
      if (confirmed) {
        await crudService.delete("fields", fieldId);
        toast.success("Field deleted successfully.");
      }
      fetchFields();
    } catch (error) {
      toast.error("Error deleting field.");
      console.error(error);
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedFields = [...fields].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });
    setFields(sortedFields);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? " 🔼" : " 🔽";
    }
    return " ↕";
  };

  const handleTimeRuleClick = (fieldId) => {
    {
      fieldId && <FieldTimeRules fieldId={fieldId} />;
    }
  };
  return (
    <div>
      <Link to="/admin/san/create">
        <Button variant="primary">Thêm mới</Button>
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            {[
              "Mã",
              "Tên sân",
              "fLoại sân",
              "Sức chứa",
              "Giá/giờ",
              "Địa chỉ",
              "Trạng thái",
            ].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIcon(key)}
              </th>
            ))}
            <th>Hình ảnh</th>
            <th>Quản lý thời gian đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.fieldId}>
              <td>{field.fieldCode}</td>
              <td>{field.fieldName}</td>
              <td>{field.fieldType.fieldTypeName}</td>
              <td>{field.capacity}</td>
              <td>{field.pricePerHour}</td>
              <td>{field.fieldAddress}</td>
              <td>{field.status === "ACTIVE" ? "Active" : "Inactive"}</td>
              <td>Images Placeholder</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleTimeRuleClick(field.fieldId)}
                >
                  Danh sách
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => handleEditField(field.fieldId)}
                  variant="warning"
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => handleDeleteField(field.fieldId)}
                  variant="danger"
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default Field;
