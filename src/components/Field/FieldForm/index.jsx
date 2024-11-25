import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useConfirm } from "../../ConfirmProvider";
import crudService from "../../../services/crudService";
import FormThemSuaSan from "../Form_Them_Sua_San";
import ImageUploader from "../ImageUploader";
import './formTaoSan_SuaSan.css'
import { uploadImageSan } from "../../../services/sanService";

const FieldForm = () => {
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
  const { showConfirmMessage } = useConfirm();
  const navigate = useNavigate();
  const { fieldId } = useParams();

  useEffect(() => {
    fetchFieldTypes();
    if (fieldId) fetchFieldData(fieldId);
  }, [fieldId]);
  console.log("Field Data lay luc sua: ", fieldData)
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
      setFieldData({
        ...fieldData,
        fieldName: response.fieldName,
        capacity: response.capacity,
        pricePerHour: response.pricePerHour,
        fieldTypeId: response.fieldType.fieldTypeId,
        fieldAddress: response.fieldAddress,
        fieldImageUrls: response.fieldImageList,
        status: response.status,
      });
    } catch (error) {
      toast.error("Failed to fetch field data.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (fieldId) {
        const confirmMessage = `Bạn có chắc chắn muốn cập nhật field có id: ${fieldId} không?`;
        const confirmed = await showConfirmMessage(confirmMessage);
        if (confirmed) {
          await taoSan(fieldData)
          console.log("data to send update: ", fieldData)
          toast.success("Field updated successfully!");
        }
      } else {
        console.log("data to send create: ", fieldData)
        const respTaoSan = await crudService.create("fields", fieldData);
        if (respTaoSan) {
          // Gửi ảnh lên server sau khi tạo sân
          const formData = new FormData();

          // Log trước khi thêm các tệp ảnh vào FormData
          console.log("Bắt đầu thêm ảnh vào FormData...");
          fieldData.fieldImageUrls.forEach((file, index) => {
            console.log("Đang thêm file thứ " + (index + 1) + ": ", file.originFileObj);  // Log tệp thực tế
            formData.append("files", file.originFileObj);  // Thêm file thực tế vào FormData
        });

          // Log sau khi đã thêm hết ảnh vào FormData
          console.log("Đã thêm tất cả các ảnh vào FormData:", formData);

          // Gửi FormData chứa tệp hình ảnh lên server
          const responseUploadImage = await uploadImageSan(respTaoSan.fieldId, formData);
          console.log("resp tao san ", respTaoSan);
          toast.success("Field created successfully!");
        }
        console.log("resp tao san ", respTaoSan)
        toast.success("Field created successfully!");
      }
      // navigate("/admin/san");
    } catch (error) {
      toast.error("Error submitting field data.");
    }
  };

  return (
    <div className="field-form-container">
      <h2>{fieldId ? "Chỉnh sửa sân" : "Tạo mới sân"}</h2>
      <Form onSubmit={handleSubmit}>
        <FormThemSuaSan
          fieldData={fieldData}
          setFieldData={setFieldData}
          fieldTypes={fieldTypes}
        />
        <div className="list_uploader">
          <span>Ảnh sân</span>
          <ImageUploader
            fileList={fieldData.fieldImageUrls}
            setFileList={(fileList) =>
              setFieldData({ ...fieldData, fieldImageUrls: fileList })
            }
          />
        </div>

        <div className="field-form-actions">
          <Button type="submit">{fieldId ? "Update" : "Create"} Sân</Button>
          <Link to="/admin/san">
            <Button variant="secondary">Huỷ</Button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default FieldForm;