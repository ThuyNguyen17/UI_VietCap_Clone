function EventTable({ events, selectedDate }) {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4">
      <div className="flex items-center text-sm font-semibold text-gray-400 mb-4">
        <span className="mr-auto text-white text-base font-bold">
          Sự kiện ngày {selectedDate}/2025
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-yellow-400">
            <tr>
              {['Mã', 'Mô tả', 'Thông báo', 'GDKHQ', 'Thực hiện', 'Tỷ lệ', 'Ghi chú'].map((header, i) => (
                <th key={i} className="px-4 py-2 text-left text-xs font-semibold text-black uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {events.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-400 italic">
                  Không có sự kiện trong ngày này.
                </td>
              </tr>
            ) : (
              events.map((event, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="px-4 py-3 text-sm font-medium text-white">{event.ma}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.description}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.notificationDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.gdkhqDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.executionDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.ratio}</td>
                  <td className="px-4 py-3 text-sm text-gray-300">{event.note}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventTable;
