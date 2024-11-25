import React from "react";
import { Form } from "react-bootstrap";
import './form_them_sua_san.css'
const FormThemSuaSan = ({ fieldData, setFieldData, fieldTypes }) => {
  return (
    <div className="container-top">
      <div className="left">
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
          <Form.Label>Số lượng người</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.capacity}
            onChange={(e) =>
              setFieldData({ ...fieldData, capacity: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formPricePerHour">
          <Form.Label>Giá trên 1 giờ</Form.Label>
          <Form.Control
            type="number"
            value={fieldData.pricePerHour}
            onChange={(e) =>
              setFieldData({ ...fieldData, pricePerHour: e.target.value })
            }
          />
        </Form.Group>
      </div>
      <div className="right">
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
          <Form.Label>Địa chỉ</Form.Label>
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
      </div>
    </div>
  );
};

export default FormThemSuaSan;