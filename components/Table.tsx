import React from "react";

interface Column<T> {
  key: string;
  label: string;
  width?: string; 
  render?: (row: T) => React.ReactNode; // Accept any row type (e.g., Feedback)
}

interface TableProps<T> {
  columns: Column<T>[];  // Columns array now accepts Column<T>
  data: T[];  // Data is an array of type T (e.g., Feedback)
}

const Table = <T extends Record<string, any>>({ columns, data }: TableProps<T>) => {
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
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
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
              <td
                colSpan={columns.length}
                className="px-4 py-2 border border-gray-300 text-center"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
