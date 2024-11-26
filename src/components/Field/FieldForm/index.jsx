import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FieldTimeRules from "../FieldTimeRule"; // Import mới
import { useConfirm } from "../../ConfirmProvider";

const FieldForm = () => {
  //confirm modal
  const [dataNguoiDungSport, setDataNguoiDungSport] = useState(null);
  const { showConfirmMessage } = useConfirm();
  const navigate = useNavigate();
  const { fieldId } = useParams(); // Dùng để kiểm tra nếu đang edit
  const [fieldData, setFieldData] = useState({
    fieldName: "",
    capacity: "",
    pricePerHour: "",
    fieldTypeId: "",
    fieldAddress: "",
    userId: 1,
    status: "AVAILABLE",
    fieldImageUrls: [],
  });
  const [fieldTypes, setFieldTypes] = useState([]);

  useEffect(() => {
    fetchFieldTypes();
    if (fieldId) fetchFieldData(fieldId); // Nếu có ID, fetch dữ liệu để edit
    // Lấy dữ liệu từ localStorage
    const storedData = localStorage.getItem("dataNguoiDungSport");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDataNguoiDungSport(parsedData);
      } catch (error) {
        console.error(
          "Failed to parse dataNguoiDungSport from localStorage:",
          error
        );
      }
    }
  }, [fieldId]);
  console.log(dataNguoiDungSport);
  console.log(fieldData);
  const fetchFieldTypes = async () => {
    try {
      const response = await crudService.read("fieldType");
      setFieldTypes(response);
    } catch (error) {
      console.error("Error fetching field types:", error);
    }
  };

  const fetchFieldData = async (id) => {
    try {
      const response = await crudService.read("fields", id);
      setFieldData((prevState) => ({
        ...prevState,
        // Cập nhật các giá trị nếu có `fieldId`
        fieldName: response.fieldName,
        capacity: response.capacity,
        pricePerHour: response.pricePerHour,
        fieldTypeId: response.fieldType.fieldTypeId,
        fieldAddress: response.fieldAddress,
        fieldImageUrls: response.fieldImageList,
        status: response.status,
      }));
    } catch (error) {
      console.error("Error fetching field data:", error);
      toast.error("Failed to fetch field data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(fieldData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      // Kiểm tra dữ liệu trong formData
      console.log(fieldData);

      if (fieldId) {
        const confirmMessage = `Bạn có chắc chắn muốn cập nhật field có id: ${fieldId} không?`;
        const confirmed = await showConfirmMessage(confirmMessage);
        if (confirmed) {
          await crudService.update("fields", fieldId, fieldData);
          toast.success("Field updated successfully!");
        }
      } else {
        await crudService.create("fields", fieldData);
        toast.success("Field created successfully!");
      }
      navigate("/admin/san");
    } catch (error) {
      console.error("Error submitting field data:", error);
      toast.error("Error submitting field data.");
    }
  };

  return (
    <div className="field-form-container">
      <h2>{fieldId ? "Edit Field" : "Add New Field"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFieldName">
          <Form.Label>Tên sân</Form.Label>
          <Form.Control
            type="text"
            value={fieldData.fieldName}
            onChange={(e) =>
              setFieldData({ ...fieldData, fieldName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formCapacity">
          <Form.Label>Sức chứa</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.capacity}
            onChange={(e) =>
              setFieldData({ ...fieldData, capacity: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPricePerHour">
          <Form.Label>Giá/giờ</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.pricePerHour}
            onChange={(e) =>
              setFieldData({ ...fieldData, pricePerHour: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formFieldTypeId">
          <Form.Label>Loại sân</Form.Label>
          <Form.Control
            as="select"
            value={fieldData.fieldTypeId}
            onChange={(e) =>
              setFieldData({ ...fieldData, fieldTypeId: e.target.value })
            }
          >
            <option value="">Select Field Type</option>
            {fieldTypes.map((type) => (
              <option key={type.id} value={type.fieldTypeId}>
                {type.fieldTypeName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formFieldAddress">
          <Form.Label>Địa chỉ sân</Form.Label>
          <Form.Control
            type="text"
            value={fieldData.fieldAddress}
            onChange={(e) =>
              setFieldData({ ...fieldData, fieldAddress: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Control
            as="select"
            value={fieldData.status}
            onChange={(e) =>
              setFieldData({ ...fieldData, status: e.target.value })
            }
          >
            <option value="AVAILABLE">Active</option>
            <option value="CLOSED">Inactive</option>
          </Form.Control>
        </Form.Group>

        <div className="field-form-actions mt-3">
          <Button type="submit">{fieldId ? "Sửa" : "Tạo"} Sân</Button>
          <Link className="ms-3" to="/admin/san">
            <Button variant="secondary">Thoát</Button>
          </Link>
        </div>
      </Form>

      {/* Include Field Time Rules */}
      <div className="mt-3">
        {fieldId && <FieldTimeRules fieldId={fieldId} />}
      </div>
    </div>
  );
};

export default FieldForm;
