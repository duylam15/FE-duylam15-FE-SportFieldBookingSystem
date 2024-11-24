import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import crudService from "../../../services/crudService";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import FieldTimeRules from "../FieldTimeRule"; // Import mới

const FieldForm = () => {
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
  }, [fieldId]);

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
      setFieldData(response);
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
        await crudService.update("fields", fieldId, fieldData);
        toast.success("Field updated successfully!");
      } else {
        await crudService.create("fields", fieldData);
        toast.success("Field created successfully!");
      }
      navigate("/fields");
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
          <Form.Label>Field Name</Form.Label>
          <Form.Control
            type="text"
            value={fieldData.fieldName}
            onChange={(e) =>
              setFieldData({ ...fieldData, fieldName: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formCapacity">
          <Form.Label>Capacity</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.capacity}
            onChange={(e) =>
              setFieldData({ ...fieldData, capacity: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formPricePerHour">
          <Form.Label>Price per Hour</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.pricePerHour}
            onChange={(e) =>
              setFieldData({ ...fieldData, pricePerHour: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formFieldTypeId">
          <Form.Label>Field Type</Form.Label>
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
          <Form.Label>Field Address</Form.Label>
          <Form.Control
            type="text"
            value={fieldData.fieldAddress}
            onChange={(e) =>
              setFieldData({ ...fieldData, fieldAddress: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
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

        <div className="field-form-actions">
          <Button type="submit">{fieldId ? "Update" : "Create"} Field</Button>
          <Link to="/fields">
            <Button variant="secondary">Cancel</Button>
          </Link>
        </div>
      </Form>

      {/* Include Field Time Rules */}
      {fieldId && <FieldTimeRules fieldId={fieldId} />}
    </div>
  );
};

export default FieldForm;
