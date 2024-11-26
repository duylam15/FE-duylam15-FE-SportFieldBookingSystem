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

export const searchSan = async (fieldName, fieldTypeId, minCapacity, maxCapacity, page = 0, size = 10) => {
  try {
      // Gọi API với tham số tìm kiếm và phân trang
      const response = await axios.get(`${baseURL}/api/fields/search/admin`, {
          params: {
              fieldName: fieldName,
              fieldTypeId: fieldTypeId,
              minCapacity: minCapacity,
              maxCapacity: maxCapacity,
              page,
              size
          }
      });
      console.log("search ~ ", response);
      return response
  } catch (error) {
      console.error("Error fetching search quyen:", error);
  }
};
