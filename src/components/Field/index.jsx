import React, { useState, useEffect } from "react";
import axios from "axios";
import crudService from "../../services/crudService";
import { Table, Button, Form, Modal } from "react-bootstrap";

const Field = () => {
  const [fields, setFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await crudService.read("fields"); // URL backend của bạn
      setFields(response);
    } catch (error) {
      console.error("Error fetching fields:", error);
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
      if (isEditing) {
        await crudService.update("fields", id, fieldData);
      } else {
        await crudService.create("fields", fieldData);
      }
      fetchFields();
      setShowModal(false);
    } catch (error) {
      console.error("Error submitting field data:", error);
    }
  };

  return (
    <div>
      <Button variant="primary" onClick={handleAddField}>
        Add New Field
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Field Code</th>
            <th>Field Name</th>
            <th>Capacity</th>
            <th>Price per Hour</th>
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
              <Form.Label>Field Type ID</Form.Label>
              <Form.Control
                type="number"
                value={fieldData.fieldTypeId}
                onChange={(e) =>
                  setFieldData({ ...fieldData, fieldTypeId: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="formLocationId">
              <Form.Label>Location ID</Form.Label>
              <Form.Control
                type="number"
                value={fieldData.locationId}
                onChange={(e) =>
                  setFieldData({ ...fieldData, locationId: e.target.value })
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
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </Form.Control>
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
