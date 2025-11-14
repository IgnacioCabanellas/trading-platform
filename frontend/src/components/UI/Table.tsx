import React from "react";

type Column = {
  key: string;
  label: string;
  hidden?: boolean;
  cell?: (row: Record<string, any>) => React.ReactNode;
};

type GenericTableProps = {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
};

export default function GenericTable({
  columns = [],
  data = [],
  className = "",
}: GenericTableProps) {
  return (
    <div className={`overflow-x-auto w-full ${className}`}>
      <table className="table table-zebra w-full border border-base-300 rounded-xl">
        <thead className="bg-base-200">
          <tr>
            {columns
            .filter((col) => !col.hidden ) 
            .map((col) => (
              <th key={col.key} className="text-left font-semibold p-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-base-content/60"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index} className="hover">
                {columns
                .filter((col) => !col.hidden )
                .map((col) => (
                  <td key={col.key} className="p-3">
                    {col.cell ? col.cell(row) : row[col.key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}