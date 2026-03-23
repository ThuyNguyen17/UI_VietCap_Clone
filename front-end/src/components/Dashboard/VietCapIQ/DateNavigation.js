
function DateNavigation({ weekDates, onPreviousWeek, onNextWeek, selectedDate, onSelectDate }) {
  // Lấy ngày hiện tại
  const today = new Date();
  const todayFormatted = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}`;
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
          Hôm nay
        </button>
        <div className="flex items-center bg-gray-700 rounded-full overflow-hidden">
          <button
            onClick={onPreviousWeek}
            className="text-gray-400 hover:text-white px-3 py-1"
          >
            &lt;
          </button>
          <div className="text-sm font-semibold text-white px-4 py-1">
            {weekDates[0]} - {weekDates[6]}/2025
          </div>
          <button
            onClick={onNextWeek}
            className="text-gray-400 hover:text-white px-3 py-1"
          >
            &gt;
          </button>
        </div>
      </div>
      <div className="text-right text-gray-400 text-sm italic">
        Tính năng lịch cho phép xem ngày thông báo, ngày thực hiện và ngày GDKHQ.
      </div>
    </div>
  );
}

export default DateNavigation;