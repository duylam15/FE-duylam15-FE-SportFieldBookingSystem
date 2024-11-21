import React, { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

const Field = () => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [fieldTypes, setFieldTypes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [fieldData, setFieldData] = useState({
    fieldId: "",
    fieldCode: "",
    fieldName: "",
    capacity: "",
    pricePerHour: "",
    fieldTypeId: "",
    fieldTypeName: "",
    locationId: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    fetchFields();
    fetchFieldTypes();
    fetchLocations();
  }, []);
  const fetchFieldTypes = async () => {
    try {
      const response = await crudService.read("fieldType");
      setFieldTypes(response);
    } catch (error) {
      console.error("Error fetching field types:", error);
    }
  };
  const fetchFields = async () => {
    try {
      const response = await crudService.read("fields"); // URL backend của bạn
      setFields(response);
    } catch (error) {
      console.error("Error fetching fields:", error);
    }
  };
  const fetchLocations = async () => {
    try {
      const response = await crudService.read("locations");
      setLocations(response);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleAddField = () => {
    setIsEditing(false);
    setShowModal(true);
    setFieldData({
      fieldCode: "",
      fieldName: "",
      capacity: "",
      pricePerHour: "",
      fieldTypeId: "",
      locationId: "",
      status: "",
    });
  };

  const handleEditField = (field) => {
    setIsEditing(true);
    setShowModal(true);
    setFieldData(field);
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await crudService.delete("fields", fieldId);
      fetchFields();
    } catch (error) {
      console.error("Error deleting field:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(fieldData).forEach(([key, value]) => {
        if (key === "fieldType" && typeof value === "object") {
          formData.append(key, value.fieldTypeId); // Hoặc value.name
          console.log(`${key}, ${value.fieldTypeId}`);
        } else {
          formData.append(key, value);
          console.log(`${key}, ${value}`);
        }
      });
      console.log(formData);
      if (isEditing) {
        await crudService.updateWithFile("fields", fieldData.fieldId, formData);
      } else {
        await crudService.createWithFile("fields", formData);
      }
      fetchFields();
      setShowModal(false);
      toast.success("Field saved successfully!");
    } catch (error) {
      console.error("Error submitting field data:", error);
      toast.error("Error submitting field data.");
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

  return (
    <div>
      <Button variant="primary" onClick={handleAddField}>
        Add New Field
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => handleSort("fieldCode")}>
              Field Code {getSortIcon("fieldCode")}
            </th>
            <th onClick={() => handleSort("fieldName")}>
              Field Name {getSortIcon("fieldName")}
            </th>
            <th onClick={() => handleSort("capacity")}>
              Capacity {getSortIcon("capacity")}
            </th>
            <th onClick={() => handleSort("pricePerHour")}>
              Price per Hour {getSortIcon("pricePerHour")}
            </th>
            <th onClick={() => handleSort("status")}>
              Status {getSortIcon("status")}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.fieldId}>
              <td>{field.fieldCode}</td>
              <td>{field.fieldName}</td>
              <td>{field.capacity}</td>
              <td>{field.pricePerHour}</td>
              <td>{field.status === "ACTIVE" ? "Active" : "Inactive"}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditField(field)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteField(field.fieldId)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Edit Field" : "Add New Field"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFieldCode">
              <Form.Label>Field Code</Form.Label>
              <Form.Control
                type="text"
                value={fieldData.fieldCode}
                onChange={(e) =>
                  setFieldData({ ...fieldData, fieldCode: e.target.value })
                }
              />
            </Form.Group>

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
                  <option key={type.id} value={type.id}>
                    {type.fieldTypeName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formLocationId">
              <Form.Label>Location</Form.Label>
              <Form.Control
                as="select"
                value={fieldData.locationId}
                onChange={(e) =>
                  setFieldData({ ...fieldData, locationId: e.target.value })
                }
              >
                <option value="">Select Location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </Form.Control>
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formImageUpload">
              <Form.Label>Upload Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) =>
                  setFieldData({ ...fieldData, image: e.target.files[0] })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditing ? "Save Changes" : "Add Field"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Field;
