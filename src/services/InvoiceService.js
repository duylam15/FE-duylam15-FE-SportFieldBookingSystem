import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

export const getAllInvoices = () => axios.get(`${API_BASE_URL}/listInvoice`);
export const getInvoiceByCode = (code) => axios.get(`${API_BASE_URL}/invoice/${code}`);
export const createInvoice = (data) => axios.post(`${API_BASE_URL}/invoice`, data);
export const updateInvoice = (id, data) => axios.put(`${API_BASE_URL}/invoice/${id}`, data);
export const deleteInvoice = (id) => axios.delete(`${API_BASE_URL}/invoice/${id}`);
export const getInvoiceByDate = async (startDate, endDate) => {
    return axios.get(`${API_BASE_URL}/invoices/getbydate`, {
      params: {
        startDate,
        endDate
      }
    });
  };
  