import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const getAllInvoices = () => axios.get(`${API_BASE_URL}/listInvoice`).then(res => res.data);
const getInvoiceByCode = (code) => axios.get(`${API_BASE_URL}/invoice/${code}`).then(res => res.data);
const createInvoice = (data) => axios.post(`${API_BASE_URL}/invoice`, data).then(res => res.data);
const updateInvoice = (id, data) => axios.put(`${API_BASE_URL}/invoice/${id}`, data).then(res => res.data);
const deleteInvoice = (id) => axios.delete(`${API_BASE_URL}/invoice/${id}`).then(res => res.data);

export default { getAllInvoices, getInvoiceByCode, createInvoice, updateInvoice, deleteInvoice };
