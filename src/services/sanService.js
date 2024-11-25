import axios from "../utils/axiosInstance";
import { baseURL } from "../utils/thongTinChung";

export const uploadImageSan = async (fieldId, files) => {
  const formData = new FormData();

  // Thêm các file vào FormData
  files.forEach((file) => {
    formData.append("files", file);
  });

  try {
    const response = await axios.post(`${baseURL}/field/${fieldId}/images`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};