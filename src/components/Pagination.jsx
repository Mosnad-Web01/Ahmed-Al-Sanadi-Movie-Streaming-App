import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md bg-blue-500 text-white ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        Previous
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, index) => index + 1)
        .slice(Math.max(currentPage - 3, 0), Math.min(currentPage + 2, totalPages))
        .map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded-md ${
              pageNumber === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {pageNumber}
          </button>
        ))}

      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md bg-blue-500 text-white ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
