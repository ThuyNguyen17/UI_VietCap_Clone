function ActionButtons() {
  const buttons = [
    { label: 'Tất cả sự kiện', active: true },
    { label: 'Trả cổ tức - Phát hành thêm', active: false },
    { label: 'Cổ đông lớn & Cổ đông nội bộ', active: false },
    { label: 'Đại hội cổ đông', active: false },
    { label: 'Sự kiện khác', active: false },
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-700">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className={`py-2 px-4 text-sm font-semibold transition-colors duration-200 
            ${btn.active ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400 hover:text-white'}`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;