// components/Pagination.jsx
import { useState } from "react";

export default function Pagination({ totalPages, currentPage, onPageChange, visiblePages = 3 }) {
  // Use internal state if currentPage not controlled
  const [page, setPage] = useState(currentPage || 1);

  const getPageNumbers = () => {
    let start = Math.max(page - Math.floor(visiblePages / 2), 1);
    let end = start + visiblePages - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - visiblePages + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    if (onPageChange) onPageChange(newPage); // notify parent
  };

  return (
    <div className="py-3 flex justify-end gap-1 text-xs md:text-sm">
      <button
        className="px-3 py-1 rounded-sm cursor-pointer text-gray-600 hover:bg-blue-400 hover:text-white"
        onClick={() => handlePageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
      >
        Prev
      </button>

      {getPageNumbers().map((num) => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`px-3 py-1 rounded-sm cursor-pointer ${
            page === num
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:bg-blue-400 hover:text-white"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        className="px-3 py-1 rounded-sm cursor-pointer text-gray-600 hover:bg-blue-400 hover:text-white"
        onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}