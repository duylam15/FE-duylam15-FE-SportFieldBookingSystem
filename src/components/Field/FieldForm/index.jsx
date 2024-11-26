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
import Map from "../Map";
import axios from "axios";


const FieldForm = () => {
  const [loading, setLoading] = useState(false);
  const [fieldData, setFieldData] = useState({
    fieldName: "",
    capacity: "",
    pricePerHour: "",
    fieldTypeId: "",
    userId: 1,
    status: "AVAILABLE",
    longitude: 106.660172, // Tọa độ mặc định (TP.HCM)
    latitude: 10.762622,
    fieldAddress: "TP.HCM",
    fieldImageUrls: []
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
  const fetchAddressFromCoordinates = async (longitude, latitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.display_name) {
        console.log("Địa chỉ lấy được:", response.data.display_name);
        return response.data.display_name || "Không xác định";
      } else {
        throw new Error("Không tìm thấy địa chỉ.");
      }
    } catch (error) {
      toast.error("Lỗi khi gọi API Nominatim.");
      console.error("Lỗi API Nominatim:", error);
      throw error;
    }
  };

  // Cập nhật tọa độ và tên địa điểm khi vị trí thay đổi
  const handleLocationChange = async (lng, lat) => {
    setFieldData(prevState => ({
      ...prevState,
      longitude: lng,
      latitude: lat
    }));

    try {
      const address = await fetchAddressFromCoordinates(lng, lat);
      setFieldData(prevState => ({
        ...prevState,
        fieldAddress: address
      }));
    } catch (error) {
      toast.error("Không thể lấy địa chỉ từ tọa độ.");
    }
  };



  useEffect(() => {
    if (fieldData.longitude !== 106.660172 || fieldData.latitude !== 10.762622) {
      handleLocationChange(fieldData.longitude, fieldData.latitude);
    }
  }, [fieldData.longitude, fieldData.latitude]);

  const fetchFieldData = async (id) => {
    try {
      setLoading(true);
      const response = await crudService.read("fields", id);
      setFieldData({
        ...fieldData,
        longitude: response.longitude || 106.660172,
        latitude: response.latitude || 10.762622,
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
  const validateFieldData = (data) => {
    const errors = [];

    // Kiểm tra tên sân
    if (!data.fieldName || data.fieldName.trim() === "") {
      errors.push("Tên sân là bắt buộc.");
    }

    // Kiểm tra dung lượng
    if (!data.capacity || isNaN(data.capacity) || data.capacity <= 0) {
      errors.push("Dung lượng sân phải là số dương.");
    }

    // Kiểm tra giá theo giờ
    if (!data.pricePerHour || isNaN(data.pricePerHour) || data.pricePerHour <= 0) {
      errors.push("Giá theo giờ phải là số dương.");
    }

    // Kiểm tra tọa độ
    if (!data.longitude || !data.latitude) {
      errors.push("Vị trí tọa độ không hợp lệ.");
    }

    // Kiểm tra địa chỉ
    if (!data.fieldAddress || data.fieldAddress === "") {
      errors.push("Địa chỉ sân là bắt buộc.");
    }

    // Kiểm tra loại sân
    if (!data.fieldTypeId || data.fieldTypeId === "") {
      errors.push("Loại sân là bắt buộc.");
    }

    return errors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateFieldData(fieldData); // Kiểm tra dữ liệu

    if (errors.length > 0) {
      // Nếu có lỗi, hiển thị thông báo lỗi
      toast.error(errors.join(" "));
      return; // Dừng lại nếu có lỗi
    }

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
          <div className="row_bottom_form_field">
            <div className="list_uploader left">
              <span>Ảnh sân</span>
              <ImageUploader
                fileList={fieldData.fieldImageUrls}
                setFileList={(fileList) =>
                  setFieldData({ ...fieldData, fieldImageUrls: fileList })
                }
              />
            </div>
            <div className="map-container right">
              <Map
                lng={fieldData.longitude}
                lat={fieldData.latitude}
                onLocationChange={(lng, lat) =>
                  setFieldData({ ...fieldData, longitude: lng, latitude: lat })
                }
              />
            </div>
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