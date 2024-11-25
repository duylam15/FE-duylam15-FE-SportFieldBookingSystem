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
import { GradientButton, GradientButtonBack } from "../../Admin/GradientButton";
import { Spin } from "antd";


const FieldForm = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
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
    } finally {
      setLoading(false)
    }
    
  };

  const handleBack = () => {
    navigate('/admin/san');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (fieldId) {
        // Cập nhật sân
        const confirmMessage = `Bạn có chắc chắn muốn cập nhật field có id: ${fieldId} không?`;
        const confirmed = await showConfirmMessage(confirmMessage);
        if (confirmed) {
          // Lọc ảnh
          const oldImages = fieldData.fieldImageUrls.filter((image) => image.fieldImageURL);
          const newImages = fieldData.fieldImageUrls.filter((image) => !image.fieldImageURL);

          // Chuẩn bị dữ liệu cập nhật
          const modifiedFieldData = {
            ...fieldData,
            fieldImageList: oldImages.map((image) => image.fieldImageURL),
          };

          console.log("Updating field with data:", modifiedFieldData);
          await crudService.update("fields", fieldId, modifiedFieldData);

          // Upload ảnh mới
          if (newImages.length > 0) {
            const formData = new FormData();
            newImages.forEach((file) => formData.append("files", file.originFileObj));

            const responseUploadImage = await uploadImageSan(fieldId, formData);
            console.log("Uploaded new images:", responseUploadImage);
          }

          toast.success("Field updated successfully!");
        }
      } else {
        // Tạo mới sân
        console.log("Creating field with data:", fieldData);
        const respTaoSan = await crudService.create("fields", fieldData);

        if (respTaoSan) {
          const newImages = fieldData.fieldImageUrls;
          if (newImages.length > 0) {
            const formData = new FormData();
            newImages.forEach((file) => formData.append("files", file.originFileObj));

            const responseUploadImage = await uploadImageSan(respTaoSan.fieldId, formData);
            console.log("Uploaded new images:", responseUploadImage);
          }
          toast.success("Field created successfully!");
        }
      }

      // navigate("/admin/san"); // Điều hướng sau khi xử lý xong
    } catch (error) {
      toast.error("Error submitting field data.");
      console.error("Error:", error);
    }
    finally {
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading} tip="Đang tải...">
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
            <div onClick={handleBack}> <GradientButtonBack /> </div>
            <div onClick={handleSubmit}> <GradientButton /> </div> {/* Save Button */}
          </div>
        </Form>
      </div>
    </Spin>
  );
};

export default FieldForm;