import React, { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader";
import { Link } from "react-router-dom";

const Field = () => {
  const [fields, setFields] = useState([]);
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

  const handleEditField = (field) => {
    setIsEditing(true);
    setFieldData(field);
    setShowModal(true);
  };

  const handleDeleteField = async (fieldId) => {
    try {
      await crudService.delete("fields", fieldId);
      toast.success("Field deleted successfully.");
      fetchFields();
    } catch (error) {
      toast.error("Error deleting field.");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      Object.entries(fieldData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((image) => formData.append("images", image));
        } else {
          formData.append(key, value);
        }
      });

      if (isEditing) {
        await crudService.updateWithFile("fields", fieldData.fieldId, formData);
        toast.success("Field updated successfully.");
      } else {
        await crudService.createWithFile("fields", formData);
        toast.success("Field added successfully.");
      }
      fetchFields();
      setShowModal(false);
    } catch (error) {
      toast.error("Error saving field.");
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

  return (
    <div>
      <Button as={Link} to="/fields/create" variant="primary">
        Add New Field
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            {[
              "fieldCode",
              "fieldName",
              "fieldType",
              "capacity",
              "pricePerHour",
              "status",
            ].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIcon(key)}
              </th>
            ))}
            <th>Images</th>
            <th>Actions</th>
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
              <td>{field.status === "ACTIVE" ? "Active" : "Inactive"}</td>
              <td>Images Placeholder</td>
              <td>
                <Button
                  onClick={() => handleEditField(field)}
                  variant="warning"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDeleteField(field.fieldId)}
                  variant="danger"
                >
                  Delete
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
