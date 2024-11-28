import React, { useState } from 'react';
import { PermissionButton } from "../../components/Admin/Sidebar";
const InvoiceTable = ({ invoices = [], onEdit, onDelete }) => {
  // Số mục trên mỗi trang
  const itemsPerPage = 5;

  // State quản lý trang hiện tại
  const [currentPage, setCurrentPage] = useState(1);

  // Tính toán số trang
  const totalPages = Math.ceil(invoices.length / itemsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentInvoices = invoices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Chuyển đến trang trước
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Chuyển đến trang tiếp theo
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Invoice ID</th>
            <th>Invoice Code</th>
            <th>Date</th>
            <th>Total Amount</th>
            <th>Payment Status</th>
            {/* <th>Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {currentInvoices.length > 0 ? (
            currentInvoices.map((invoice) => (
              <tr key={invoice.invoiceId}>
                <td>{invoice.invoiceId}</td>
                <td>{invoice.invoiceCode}</td>
                <td>{invoice.invDate}</td>
                <td>{invoice.totalAmount}</td>
                <td>{invoice.paymentStatus}</td>
                {/* <td className="row_btn">
                  <button onClick={() => onEdit(invoice.invoiceId)}>Edit</button>
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No invoices available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Điều hướng phân trang */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          style={{ marginRight: '10px' }}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          style={{ marginLeft: '10px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InvoiceTable;
