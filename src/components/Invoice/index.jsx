import React, { useState, useEffect } from 'react';
import InvoiceTable from './InvoiceTable';
import InvoiceModal from './InvoiceModal';
import invoiceService from '../../services/InvoiceService';

const Invoice = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = () => {
    invoiceService.getAllInvoices().then(data => setInvoices(data));
  };

  const handleAddInvoice = () => {
    setSelectedInvoice(null);
    setIsModalOpen(true);
  };

  const handleEditInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsModalOpen(true);
  };

  const handleDeleteInvoice = (id) => {
    invoiceService.deleteInvoice(id).then(() => fetchInvoices());
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    fetchInvoices();
  };

  const handleSaveInvoice = (data) => {
    const savePromise = selectedInvoice 
      ? invoiceService.updateInvoice(selectedInvoice.invoiceId, data)
      : invoiceService.createInvoice(data);
    savePromise.then(() => handleModalClose());
  };

  return (
    <div>
      <button onClick={handleAddInvoice}>Add Invoice</button>
      <InvoiceTable invoices={invoices} onEdit={handleEditInvoice} onDelete={handleDeleteInvoice} />
      <InvoiceModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSave={handleSaveInvoice} 
        invoice={selectedInvoice} 
      />
    </div>
  );
};

export default Invoice;
