import React, { useState, useEffect } from "react";
import crudService from "../../../services/crudService";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useConfirm } from "../../ConfirmProvider";
import IconLabelAddButtons from "../../Admin/ColorButtons";
import DeleteBtn from "../../Admin/ColorButtons/deleteBtn";
import EditBtn from "../../Admin/ColorButtons/EditBtn";
import { toast } from "react-toastify";
import { Input } from "antd";
import { FileSearchOutlined } from "@ant-design/icons";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const URL_NAME = `fieldType`;

const FieldType = () => {
  //confirm modal
  const { showConfirmMessage } = useConfirm();
  //data
  const [fieldTypes, setFieldTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentFieldType, setCurrentFieldType] = useState({
    fieldTypeName: "",
    fieldTypeDescription: "",
  });
  // search and pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(5); // Số lượng items mỗi trang

  // Lấy danh sách FieldType từ server
  useEffect(() => {
    fetchFieldTypes(keyWord, currentPage);
  }, [keyWord, currentPage]);

  const fetchFieldTypes = async (keyword, page) => {
    const data = await crudService.read(
      URL_NAME + "/search",
      null, // No URL params to append
      {
        params: {
          keyword: keyword,
          page: page,
          size: itemsPerPage,
        },
      }
    );
    setFieldTypes(data.content);
    setTotalPages(data.totalPages);
  };

  // Mở modal để thêm hoặc chỉnh sửa
  const openModal = (
    fieldType = { fieldTypeName: "", fieldTypeDescription: "" }
  ) => {
    if (fieldType.fieldTypeId) {
      // Đang sửa
      setCurrentFieldType(fieldType);
      setIsEditing(true);
    } else {
      // Đang thêm mới
      setCurrentFieldType({ fieldTypeName: "", fieldTypeDescription: "" });
      setIsEditing(false);
    }
    setShowModal(true);
  };

  // Đóng modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentFieldType({ fieldTypeName: "", fieldTypeDescription: "" });
  };

  // Xử lý lưu FieldType mới hoặc chỉnh sửa
  const handleSave = async () => {
    const confirmMessage = isEditing
      ? `Bạn có chắc chắn muốn cập nhật loại id: ${currentFieldType.fieldTypeId} này không?`
      : `Bạn có chắc chắn muốn thêm loại sân này không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    console.log(currentFieldType);
    if (confirmed) {
      try {
        const dataToSend = { ...currentFieldType };
        if (isEditing) {
          await crudService.update(
            URL_NAME,
            dataToSend.fieldTypeId,
            dataToSend
          );
          toast.success("Sửa loại sân thành công.");
        } else {
          await crudService.create(URL_NAME, dataToSend);
          toast.success("Tạo loại sân thành công.");
        }
        closeModal();
        fetchFieldTypes(keyWord, currentPage);
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi lưu loại sân!");
      }
    }
  };

  // Xử lý xóa FieldType
  const handleDelete = async (id) => {
    const confirmMessage = `Bạn có chắc chắn muốn xóa field type id: ${id} này không?`;
    const confirmed = await showConfirmMessage(confirmMessage);
    if (confirmed) {
      await crudService.delete(URL_NAME, id);
      toast.success("Xóa loại sân thành công");
    }

    fetchFieldTypes(keyWord, currentPage);
  };

  return (
    <div className="container mt-4">
      <h1 className="title_center_page">Danh sách loại sân</h1>
      <div onClick={openModal}>
        <IconLabelAddButtons></IconLabelAddButtons>
      </div>
      <div className="timkiem">
        <div className="block_input">
          <label htmlFor="inputTenSan">Tên loại sân</label>
          <Input
            placeholder="Nhập tên loại sân"
            prefix={<FileSearchOutlined />}
            id="inputTenLoaiSan"
            value={keyWord}
            onChange={(e) => setKeyWord(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng hiển thị danh sách FieldType */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Loại Sân</th>
            <th>Mô Tả</th>
            <th>Chỉnh sửa</th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {fieldTypes.map((fieldType) => (
            <tr key={fieldType.fieldTypeId}>
              <td>{fieldType.fieldTypeId}</td>
              <td>{fieldType.fieldTypeName}</td>
              <td>{fieldType.fieldTypeDescription}</td>
              <td>
                <div onClick={() => openModal(fieldType)}>
                  <EditBtn></EditBtn>
                </div>
              </td>
              <td>
                <div onClick={() => handleDelete(fieldType.fieldTypeId)}>
                  {" "}
                  <DeleteBtn></DeleteBtn>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Thêm/Sửa FieldType */}
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? "Chỉnh Sửa Loại Sân" : "Thêm Loại Sân"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tên Loại Sân</Form.Label>
              <Form.Control
                type="text"
                value={currentFieldType.fieldTypeName}
                onChange={(e) =>
                  setCurrentFieldType({
                    ...currentFieldType,
                    fieldTypeName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mô Tả</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentFieldType.fieldTypeDescription}
                onChange={(e) =>
                  setCurrentFieldType({
                    ...currentFieldType,
                    fieldTypeDescription: e.target.value,
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
            {isEditing ? "Cập Nhật" : "Lưu"}
          </Button>
        </Modal.Footer>
      </Modal>
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

export default FieldType;
