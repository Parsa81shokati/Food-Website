import React, { useState } from "react";
import { FaSort, FaSortUp, FaSortDown, FaFilter } from "react-icons/fa";

export default function DataTable({
  columns = [],
  data = [],
  keyField = "id", // کلید یونیک هر ردیف
  loading = false,
  sortConfig,
  emptyMessage = "No data found",
}) {
  // نمایش ستون‌های قابل مرتب‌سازی
  const SortableColumnHeader = ({ column }) => {
    const isActive = sortConfig.field === column.key;

    return (
      <div className="flex items-center gap-1 cursor-pointer select-none">
        <span>{column.title}</span>
        {isActive && (
          <span className="text-[#9e0910] text-sm">
            {sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />}
          </span>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 animate-pulse rounded"></div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 border border-[#9e0910]/10 rounded-2xl bg-primaryLight">
        <p className="text-gray-600 text-lg font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-primaryLight border-b border-[#9e0910]/10">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-6 py-4 text-sm font-semibold text-gray-800"
                >
                  {col.sortable ? (
                    <SortableColumnHeader column={col} />
                  ) : (
                    col.title
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <TableRow
                key={item[keyField]}
                item={item}
                columns={columns}
                keyField={keyField}
                index={index}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const TableRow = React.memo(({ item, columns, keyField, index }) => (
  <tr
    key={item[keyField]}
    className={`
      border-b-gray-400 last:border-none transition
      hover:bg-[#9e0910]/3
      ${index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}
    `}
  >
    {columns.map((col) => (
      <td key={col.key} className="px-6 py-4 text-sm text-gray-700">
        {col.render ? col.render(item) : item[col.key]}
      </td>
    ))}
  </tr>
));
