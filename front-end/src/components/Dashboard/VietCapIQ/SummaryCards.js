function SummaryCard({ date, data, isActive, onClick }) {
  return (
    <div
      onClick={() => onClick(date)}
      className={`cursor-pointer p-4 rounded-xl shadow-md transition duration-200 
        ${isActive ? 'bg-yellow-400 text-black' : 'bg-[#1e1e1e] hover:bg-gray-700 text-white'}`}
    >
      <h3 className={`font-bold text-sm mb-3 text-center ${isActive ? 'text-black' : 'text-gray-400'}`}>{date}</h3>
      <div className="space-y-1">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center text-xs text-gray-400"
          >
            <span className={`truncate max-w-[70%] ${isActive ? 'text-black' : 'text-gray-400'}`}>{item.label}</span>
            <span className={`font-semibold truncate max-w-[30%] text-right ${isActive ? 'text-black' : 'text-white'}`}>
              {item.value || '—'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SummaryCards({ selectedDate, onSelectDate, weekDates }) {
  // Dữ liệu giả lập khớp với hình ảnh
  const mockData = {
    '04/08': [
      { label: 'Trả cổ tức bằng tiền mặt', value: '7' },
      { label: 'Phát hành cổ phiếu', value: '4' },
      { label: 'Khác', value: '6' },
    ],
    '05/08': [
      { label: 'Giao dịch nội bộ', value: '5' },
      { label: 'Đại hội cổ đông bất thường', value: '6' },
      { label: 'Phát hành cổ phiếu', value: '4' },
      { label: 'Khác', value: '6' },
    ],
    '06/08': [
      { label: 'Giao dịch nội bộ', value: '10' },
      { label: 'Trả cổ tức bằng tiền mặt', value: '5' },
      { label: 'Khác', value: '6' },
    ],
    '07/08': [
      { label: 'Trả cổ tức bằng tiền mặt', value: '7' },
      { label: 'Phát hành cổ phiếu', value: '5' },
      { label: 'Khác', value: '6' },
    ],
    '08/08': [
      { label: 'Trả cổ tức bằng tiền mặt', value: '7' },
      { label: 'Giao dịch nội bộ', value: '2' },
      { label: 'Khác', value: '3' },
    ],
    '09/08': [{ label: 'Không có sự kiện', value: '' }],
    '10/08': [{ label: 'Không có sự kiện', value: '' }],
  };

  return (
    <div className="grid grid-cols-7 gap-4 mb-6">
      {weekDates.map((date) => {
        const items = mockData[date];
        // Đảm bảo mỗi ngày đều có một thẻ, ngay cả khi không có sự kiện
        const displayItems = items && items.length > 0 ? items : [{ label: 'Không có sự kiện', value: '' }];

        return (
          <SummaryCard
            key={date}
            date={date}
            data={displayItems}
            isActive={selectedDate === date}
            onClick={onSelectDate}
          />
        );
      })}
    </div>
  );
}

export default SummaryCards;