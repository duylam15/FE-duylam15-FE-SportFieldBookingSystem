import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 3; // Số lượng trang hiển thị liền kề

  // Tạo danh sách các trang hiển thị
  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (startPage > 1) {
      pages.unshift("...");
      pages.unshift(1);
    }
    if (endPage < totalPages) {
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {/* Nút '<<' */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {/* Nút '<' */}
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
        </li>

        {/* Số trang */}
        {visiblePages.map((page, index) => (
          <li
            key={index}
            className={`page-item ${
              page === currentPage ? "active" : page === "..." ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Nút '>' */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </li>

        {/* Nút '>>' */}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>

      {/* Hiển thị thông tin tổng số trang */}
      <div className="pagination-info">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
