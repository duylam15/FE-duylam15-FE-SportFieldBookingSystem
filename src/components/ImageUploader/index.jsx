import React from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

const ImageUploader = ({ fieldImageList, onUpload }) => {
  const onDrop = async (acceptedFiles) => {
    const uploadedImages = [];
    for (const file of acceptedFiles) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "your_upload_preset"); // Preset của Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      uploadedImages.push(response.data.secure_url);
    }
    onUpload([...images, ...uploadedImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ border: "1px dashed gray", padding: 20 }}
      >
        <input {...getInputProps()} />
        <p>Kéo và thả ảnh tại đây hoặc bấm để chọn file</p>
      </div>
      <div>
        {fieldImageList.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="field"
            style={{ width: 100, margin: 5 }}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
