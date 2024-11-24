import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = "http://localhost:8080/api";

const crudService = {
    create: async (entityName, data) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/${entityName}`, data);
            // toast.success(`Create ${entity} successfully.!`, "Thông báo");
            return response.data;
        } catch(error) {
            toast.error(`Error while creating ${entityName}: ${error.message} `, `Lỗi`);
            throw error;
        }
    },
    read: async (entityName, id = null) => {
        try {
            const url = id ? `${API_BASE_URL}/${entityName}/${id}` : `${API_BASE_URL}/${entityName}`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            toast.error(`Error while getting ${entityName}: ${error.message}`);
            throw error;
        }
    },
    update: async (entityName, id, data) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${entityName}/${id}`, data);
            // toast.success(`Update ${entityName} successfully.`, `Thông báo`);
            return response.data;
        } catch (error) {
            toast.error(`Error while updating ${entityName} : ${error.message}`);
            throw error;
        }
    },
    delete: async (entityName, id) => {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${entityName}/${id}`);
            // toast.success(`Delete ${entityName} id: "${id}" successfully`);
            return response.data;
        } catch (error) {
            toast.error(`Erroe while deleting ${entityName}: ${error.message}`);
            throw error;
        }
    },
    getPaymentUrl: async (entityName, data) => {
        try {
            const response = await axios.get(`http://localhost:8080/${entityName}`, {
                params: {
                  amount: data,
                }
              });
            // toast.success(`Create ${entity} successfully.!`, "Thông báo");
            return response.data;
        } catch(error) {
            toast.error(`Error while creating ${entityName}: ${error.message} `, `Lỗi`);
            throw error;
        }
    },
}
export default crudService;