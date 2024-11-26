import React, { useState, useEffect } from "react";
import crudService from "../../services/crudService";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import ImageUploader from "../ImageUploader";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "../ConfirmProvider";
import IconLabelButtons from "../Admin/ColorButtons";
import './index'
import { PermissionAddButton, PermissionButton, PermissionEditButton } from "../Admin/Sidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { searchSan } from "../../services/sanService";
import TimeBtn from "../Admin/ColorButtons/TimeBtn";
import { UserOutlined, MailOutlined, FileSearchOutlined } from '@ant-design/icons';
import { Input, Select } from 'antd';
import './san.scss'

const Field = ({ size = 7 }) => {
  const [fields, setFields] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0)
  const [fieldSeachName, setFieldSeachName] = useState("")
  const [fieldTypeId, setFieldTypeId] = useState("")
  const [minCapicity, setMinCapicity] = useState("")
  const [maxCapicity, setMaxCapicity] = useState("");
  const { showConfirmMessage } = useConfirm();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [fieldTypes, setFieldTypes] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });


  // Fetch permissions based on current page and search term
  const fetchSan = async (fieldName, fieldTypeId, minCapicity, maxCapicity, page, size) => {
    try {

      const result = await searchSan(fieldName, fieldTypeId, minCapicity, maxCapicity, page - 1, size);
      console.log("TIM KIEM: ", result);
      if (result && result.data) {
        setFields(result.data.data.content);
        setTotalPages(result.data.data.totalPages);

        // Check if currentPage exceeds total pages and adjust if necessary
        if (page > result.data.data.totalPages) {
          setCurrentPage(result.data.data.totalPages);
        }
      } else {
        setFields([]);
        setTotalPages(0);
      }
    } catch (error) {
      console.error("Error fetching san:", error);
    }
  };

  // Fetch data when currentPage changes or when searchName changes
  useEffect(() => {
    // When searchName changes, reset to page 1
    if (fieldSeachName !== "") {
      setCurrentPage(1); // Reset to page 1 when searchName changes
    }
  }, [fieldSeachName]); // Only listen to searchName changes

  useEffect(() => {
    fetchSan(fieldSeachName, fieldTypeId, minCapicity, maxCapicity, currentPage, size); // Fetch with the current page
  }, [currentPage, fieldSeachName, fieldTypeId, minCapicity, maxCapicity]); // Fetch data when currentPage or searchName changes 
  useEffect(() => {
    const fetchFieldTypes = async () => {
      try {
        const response = await crudService.read("fieldType");
        setFieldTypes(response);
        console.log("Loaij san: ", response);
      } catch (error) {
        toast.error("Error fetching field types.");
        console.error(error);
      }
    };
    fetchFieldTypes();
  }, [])



  const handleEditField = (fieldId) => {
    navigate(`/admin/san/edit/${fieldId}`);
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
    <div className="page_san_admin">
      <h1 className="title_center_page">Danh sách sân</h1>
      <PermissionAddButton feature="Quản lí sân">
        <Link to="/admin/san/create">
          <IconLabelButtons></IconLabelButtons>
        </Link>
      </PermissionAddButton>

      <div className='timkiem'>
        <div className='block_input'>
          <label htmlFor="inputTenSan">Tên sân</label>
          <Input
            placeholder="Nhập tên sân"
            prefix={<FileSearchOutlined />}
            id='inputTenSan'
            value={fieldSeachName}
            onChange={(e) => setFieldSeachName(e.target.value)}
          />
        </div>
        <div className='block_input'>
          <label htmlFor="minCapicity">Sức chứa min</label>
          <Input
            placeholder="Nhập sức chứa min"
            prefix={<UserOutlined />}
            id='minCapicity'
            value={minCapicity}
            onChange={(e) => setMinCapicity(e.target.value)}
          />
        </div>

        <div className='block_input'>
          <label htmlFor="minCapicity">Sức chứa max</label>
          <Input
            placeholder="Nhập sức chứa max"
            prefix={<UserOutlined />}
            id='maxCapicity'
            value={maxCapicity}
            onChange={(e) => setMaxCapicity(e.target.value)}
          />
        </div>

        <div className='block_input'>
          <label>Loại sân</label>
          <div>
            <Select
              style={{ width: 200 }}
              onChange={(value) => setFieldTypeId(value)}
              value={fieldTypeId}
            >
              <Option value="">Chọn loại sân</Option>
              {fieldTypes.map((e) => (
                <Option key={e.fieldTypeId} value={e.fieldTypeId}>
                  {e.fieldTypeName}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {[
              "ID",
              "field Name",
              "field Type",
              "capacity",
              "pricePerHour",
              "status",
            ].map((key) => (
              <th key={key} onClick={() => handleSort(key)}>
                {key.charAt(0).toUpperCase() + key.slice(1)} {getSortIcon(key)}
              </th>
            ))}
            <th>Time Rules</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.fieldId}>
              <td>{field.fieldId}</td>
              <td>{field.fieldName}</td>
              <td>{field.fieldType.fieldTypeName}</td>
              <td>{field.capacity}</td>
              <td>{field.pricePerHour}</td>
              <td>{field.status}</td>
              <td>
                <PermissionEditButton feature="Quản lí sân">
                  <div onClick={() => handleTimeRuleClick(field.fieldId)}>
                    <TimeBtn></TimeBtn>
                  </div>
                </PermissionEditButton>
              </td>
              <td>
                <PermissionButton feature="Quản lí sân" idButton={field.fieldId} onEdit={handleEditField}>
                </PermissionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="center_pagination">
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            variant="outlined"
            shape="rounded"
            onChange={(event, value) => setCurrentPage(value)}
          />
        </Stack>
      </div>
    </div>
  );
};
export default Field;
