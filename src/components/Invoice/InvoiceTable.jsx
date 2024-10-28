import React from 'react';

const InvoiceTable = ({ invoices, onEdit, onDelete }) => (
  <div>
    <h2>Invoice List</h2>
    <table>
      <thead>
        <tr>
          <th>Invoice ID</th>
          <th>Invoice Code</th>
          <th>Date</th>
          <th>Total Amount</th>
          <th>Payment Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {invoices.map(invoice => (
          <tr key={invoice.invoiceId}>
            <td>{invoice.invoiceId}</td>
            <td>{invoice.invoiceCode}</td>
            <td>{invoice.invDate}</td>
            <td>{invoice.totalAmount}</td>
            <td>{invoice.paymentStatus}</td>
            <td>
              <button onClick={() => onEdit(invoice)}>Edit</button>
              <button onClick={() => onDelete(invoice.invoiceId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default InvoiceTable;
