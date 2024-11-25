import React from "react";
import { Upload, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

const ImageUploader = ({ fileList, setFileList }) => {
  console.log("File anh de hien: ", fileList);

  // Hàm xử lý convert file thành base64
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      // Kiểm tra xem file có phải là Blob (hợp lệ với FileReader) hay không
      if (file && file instanceof Blob) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      } else if (file && typeof file === 'string') {
        // Nếu file là một URL (string), trực tiếp trả về URL đó
        resolve(file);
      } else {
        reject(new Error('File không hợp lệ.'));
      }
    });

  // Hàm xử lý preview khi tệp đã được thêm
  const handlePreview = async (file) => {
    console.log("vao handlePreview");

    // Nếu file đã có URL (được trả về từ backend), sử dụng URL đó để xem trước
    if (file.fieldImageURL) {
      // Nếu có URL, lấy preview từ base64 cho ảnh
      file.preview = await getBase64(file.fieldImageURL); // Sử dụng URL để tạo preview
      console.log("File có fieldImageURL, tạo preview từ URL");
    } else if (!file.preview) {
      // Nếu không có URL, tạo preview từ base64
      console.log("Không có URL, tạo preview từ base64");
      file.preview = await getBase64(file.originFileObj);
    }

    window.open(file.preview, "_blank");
  };

  // Hàm xử lý thêm tệp vào fileList và tạo preview
  const handleChange = async ({ fileList }) => {
    const updatedFileList = await Promise.all(
      fileList.map(async (file) => {
        // Nếu file không có preview và không có URL (fieldImageURL), tạo preview mới
        if (!file.fieldImageURL && !file.preview) {
          // Nếu không có URL và chưa có preview, tạo preview từ base64
          file.preview = await getBase64(file.originFileObj);
        }
        // Nếu có URL từ backend, tạo preview từ URL
        if (file.fieldImageURL && !file.preview) {
          file.preview = await getBase64(file.fieldImageURL);
        }
        return file;
      })
    );
    setFileList(updatedFileList); // Cập nhật lại fileList
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={(file) => {
          const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
          if (!isJpgOrPng) {
            toast.error("Chỉ chấp nhận file JPG/PNG!");
            return false; // Ngăn upload tự động
          }
          return false; // Ngăn upload tự động
        }}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>

      <Image.PreviewGroup>
        {fileList.map((file, index) => (
          <Image
            key={index}
            // Sử dụng preview đã tạo từ base64 (hoặc từ backend)
            src={file.preview || file.fieldImageURL}
            width={50}
            height={50}
            style={{ marginRight: 5 }}
          />
        ))}
      </Image.PreviewGroup>
    </>
  );
};

export default ImageUploader;