// src/components/common/Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Show all pages if <= 5
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // First 5 pages + last
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Last 5 pages + first
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Current in the middle → only ONE "..." at the end
        pages.push(currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-center mt-4">
      <nav>
        <ul className="pagination">
          {/* Prev button */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </li>

          {/* Page numbers */}
          {getPageNumbers().map((page, index) => (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
            >
              {page === "..." ? (
                <span className="page-link">...</span>
              ) : (
                <button className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </button>
              )}
            </li>
          ))}

          {/* Next button */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
