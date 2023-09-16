import React from 'react';
import { Button } from 'react-bootstrap';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className="pagination justify-content-center">
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
            <Button
              variant={pageNumber === currentPage ? 'dark' : 'outline-dark'}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
