import React, { useState, useMemo } from 'react';

const sortableColumns = ['price', 'change'];

const MoversTable = ({ data = [], columns = [], title = 'Top Movers' }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    const sorted = [...data].sort((a, b) => {
      let aVal = a[sortKey];
      let bVal = b[sortKey];

      const parseNumber = (val) => {
        if (typeof val === 'string') {
          val = val.replace(/[%+,]/g, '');
          const n = parseFloat(val);
          return isNaN(n) ? val.toLowerCase() : n;
        }
        return val;
      };

      aVal = parseNumber(aVal);
      bVal = parseNumber(bVal);

      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [data, sortKey, sortOrder]);

  const handleSort = (key) => {
    if (!sortableColumns.includes(key)) return; // Chỉ sort nếu cột được phép

    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (key) => {
    if (sortKey !== key) return null;
    return (
      <span className="ml-1 text-yellow-400 select-none">
        {sortOrder === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <table className="w-full text-sm rounded">
      <thead className="bg-[#1a1a1a] text-gray-300">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={`p-2 text-left font-semibold ${sortableColumns.includes(col.key) ? 'cursor-pointer select-none' : ''
                }`}
              onClick={() => handleSort(col.key)}
            >
              {col.label}
              {sortableColumns.includes(col.key) && renderSortIcon(col.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.length === 0 && (
          <tr>
            <td colSpan={columns.length} className="text-center p-4 text-gray-400">
              No data available
            </td>
          </tr>
        )}
        {sortedData.map((row, idx) => {
          const changeVal = row.change;
          let rowTextColor = 'text-gray-300';
          if (typeof changeVal === 'string') {
            if (changeVal.startsWith('-'))
              rowTextColor = 'text-red-500 font-semibold';
            else if (changeVal.startsWith('+'))
              rowTextColor = 'text-blue-500 font-semibold';
          }

          return (
            <tr
              key={row.symbol + idx}
              className={`${idx % 2 === 0 ? 'bg-black' : 'bg-[#1a1a1a]'} ${rowTextColor}`}
            >
              {columns.map((col) => (
                <td key={col.key} className="p-2">
                  {row[col.key]}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MoversTable;
