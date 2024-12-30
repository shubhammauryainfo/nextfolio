import React, { useState } from "react";
import { GrLinkNext , GrLinkPrevious } from "react-icons/gr";

interface Column<T> {
  key: string;
  label: string;
  width?: string;
  render?: (row: T) => React.ReactNode; // Accept any row type (e.g., Feedback)
}

interface TableProps<T> {
  columns: Column<T>[]; // Columns array now accepts Column<T>
  data: T[]; // Data is an array of type T (e.g., Feedback)
  rowsPerPage?: number; // Optional prop for setting rows per page
}

const Table = <T extends Record<string, any>>({
  columns,
  data,
  rowsPerPage = 10, // Default value is 10
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Slice the data to show only the current page's rows
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + rowsPerPage);

  // Handle page change (next, previous, or specific page)
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto mt-2">
      <table className="min-w-full table-auto border-collapse border border-gray-300" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr className="bg-gray-200 text-left">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-2 border border-gray-300 font-semibold"
                style={{
                  width: column.width || "auto",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.length > 0 ? (
            currentPageData.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 border border-gray-300"
                    style={{
                      width: column.width || "auto",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-2 border border-gray-300 text-center">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-green-300 text-gray-800 rounded-l hover:bg-green-400 disabled:bg-gray-200"
          >
          <GrLinkPrevious/>
          </button>
          <div className="px-4 py-2 text-gray-700">
            {currentPage} / {totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-green-300 text-gray-800 rounded-r hover:bg-green-400 disabled:bg-gray-200"
          >
         <GrLinkNext/>
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
