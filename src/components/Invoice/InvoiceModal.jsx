import React, { useState, useEffect } from 'react';

const InvoiceModal = ({ isOpen, onClose, onSave, invoice }) => {
  const [formData, setFormData] = useState({
    invoiceCode: '',
    invDate: '',
    totalAmount: '',
    paymentStatus: '',
  });

  useEffect(() => {
    if (invoice) setFormData(invoice);
  }, [invoice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{invoice ? 'Edit Invoice' : 'Add Invoice'}</h2>
        <form onSubmit={handleSubmit}>
          <label>Invoice Code:</label>
          <input name="invoiceCode" value={formData.invoiceCode} onChange={handleChange} />
          <label>Date:</label>
          <input name="invDate" type="date" value={formData.invDate} onChange={handleChange} />
          <label>Total Amount:</label>
          <input name="totalAmount" type="number" value={formData.totalAmount} onChange={handleChange} />
          <label>Payment Status:</label>
          <input name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} />
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default InvoiceModal;
