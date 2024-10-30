import React, { useState, useEffect } from 'react';
import InvoiceTable from './InvoiceTable';
import InvoiceModal from './InvoiceModal';
import {getAllInvoices, 
  getInvoiceByCode, 
  createInvoice, 
  updateInvoice, 
  deleteInvoice} from '../../services/InvoiceService';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [formValues, setFormValues] = useState({ code: '', amount: '', user: '', date: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div>
      <h1>Invoice Management</h1>
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
