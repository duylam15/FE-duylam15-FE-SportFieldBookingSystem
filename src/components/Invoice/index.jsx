import React, { useState, useEffect } from 'react';
import InvoiceTable from './InvoiceTable';
import InvoiceModal from './InvoiceModal';
import {
  getAllInvoices,
  getInvoiceByCode,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoiceByDate
} from '../../services/InvoiceService';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [formValues, setFormValues] = useState({ code: '', amount: '', user: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await getAllInvoices();
      setInvoices(response.data.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };

  const handleOpenAddModal = () => {
    setFormValues({ code: '', amount: '', user: '', date: '' });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = async (invoice) => {
    try {
      setFormValues(invoice);
      setSelectedInvoiceId(invoice.invoiceId);
      setIsEditing(true);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormValues({ code: '', amount: '', user: '', date: '' });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        await invoiceService.updateInvoice(selectedInvoiceId, formValues);
      } else {
        await invoiceService.createInvoice(formValues);
      }
      fetchInvoices();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleDeleteInvoice = async (id) => {
    try {
      await invoiceService.deleteInvoice(id);
      fetchInvoices();
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleFilterInvoices = async () => {
    if (!startDate || !endDate) {
      console.warn('Please select both start and end dates.');
      return;
    }
    try {
      const response = await getInvoiceByDate(startDate, endDate);
      setInvoices(response.data.data);
    } catch (error) {
      console.error('Error filtering invoices:', error);
    }
  };

  return (
    <div>
      <h2>Invoice List</h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '20px'
        }}
      >
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            style={{
              padding: '8px 10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              outline: 'none'
            }}
          />
        </label>
        <label style={{ fontWeight: 'bold', fontSize: '14px', color: '#333' }}>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            style={{
              padding: '8px 10px',
              fontSize: '14px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              outline: 'none'
            }}
          />
        </label>
        <button
          onClick={handleFilterInvoices}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 15px',
            fontSize: '14px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Filter
        </button>
      </div>

      {/* <button onClick={handleOpenAddModal}>Add Invoice</button> */}
      <InvoiceTable invoices={invoices} onEdit={handleOpenEditModal} onDelete={handleDeleteInvoice} />
      <InvoiceModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        formValues={formValues}
        setFormValues={setFormValues}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
    </div>
  );
};

export default Invoice;
