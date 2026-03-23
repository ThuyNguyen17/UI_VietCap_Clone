import React, { useState } from 'react';
import { FiSettings, FiMaximize2, FiChevronDown } from 'react-icons/fi'; // Icons for settings, maximize, dropdown
import { MdInfoOutline } from 'react-icons/md'; // Info icon for tooltips
import Header from '../components/Header/Header';

// Dummy Data cho bảng cổ phiếu
const dummyStocks = [
  { ma: 'A32', gia: 39.5, thayDoi: 14.8, san: 'UPCOM', nganh: 'Hàng cá nhân & Gi...' },
  { ma: 'AAA', gia: 7.68, thayDoi: -1.0, san: 'HSX', nganh: 'Hóa chất' },
  { ma: 'AAM', gia: 4.30, thayDoi: -2.3, san: 'UPCOM', nganh: 'Tài nguyên Cơ bản' },
  { ma: 'AAV', gia: 7.15, thayDoi: -0.7, san: 'HSX', nganh: 'Thực phẩm và đồ...' },
  { ma: 'AAS', gia: 9.50, thayDoi: -1.0, san: 'UPCOM', nganh: 'Dịch vụ tài chính' },
  { ma: 'AAT', gia: 3.40, thayDoi: 0.0, san: 'HSX', nganh: 'Hàng cá nhân & Gi...' },
  { ma: 'AB6', gia: 6.70, thayDoi: -4.3, san: 'HNX', nganh: 'Bất động sản' },
  { ma: 'ABB', gia: 9.00, thayDoi: -1.1, san: 'UPCOM', nganh: 'Ngân hàng' },
  { ma: 'ABC', gia: 10.50, thayDoi: 0.0, san: 'UPCOM', nganh: 'Viễn thông' },
  // Thêm nhiều dữ liệu giả khác nếu cần để test cuộn
  { ma: 'ABD', gia: 11.20, thayDoi: 2.5, san: 'HSX', nganh: 'Công nghệ thông tin' },
  { ma: 'ABE', gia: 8.90, thayDoi: -0.5, san: 'HNX', nganh: 'Điện, nước & Xây dựng' },
  { ma: 'ABF', gia: 15.00, thayDoi: 3.1, san: 'UPCOM', nganh: 'Tài nguyên Cơ bản' },
  { ma: 'ABG', gia: 22.50, thayDoi: 0.8, san: 'HSX', nganh: 'Hàng & Dịch vụ CN' },
  { ma: 'ABH', gia: 5.70, thayDoi: -1.8, san: 'HNX', nganh: 'Dầu khí' },
  { ma: 'ABI', gia: 18.30, thayDoi: 0.0, san: 'UPCOM', nganh: 'Hóa chất' },
  { ma: 'ABJ', gia: 9.10, thayDoi: 0.5, san: 'HSX', nganh: 'Thực phẩm và đồ...' },
  { ma: 'ABK', gia: 12.00, thayDoi: -0.2, san: 'UPCOM', nganh: 'Xây dựng và Vật liệu' },
  { ma: 'ABL', gia: 7.80, thayDoi: 1.5, san: 'HNX', nganh: 'Ô tô và phụ tùng' },
];

export default function StockFilterPage() {
  const [activeTab, setActiveTab] = useState('generalInfo'); // 'generalInfo', 'technicalSignals', 'financialRatios'

  // State cho các giá trị lọc (dùng chung cho tab generalInfo)
  const [vonHoaRange, setVonHoaRange] = useState([0, 1000000]); // Max 1.000.000 tỷ VND
  const [giaRange, setGiaRange] = useState([0, 800000]); // Max 800.000 VND
  const [thayDoiRange, setThayDoiRange] = useState([-15, 15]); // Thay đổi %
  const [gtgdRange, setGtgdRange] = useState([0, 2000]); // GTGD trung bình (tỷ VND)

  // Hàm để render thanh trượt lọc
  const renderFilterSlider = (label, value, setValue, min, max, unit = '') => (
    <div className="flex items-center mb-4 text-sm">
      <div className="w-1/4 flex items-center text-gray-400">
        {label}
        {label === 'Vốn hóa (tỷ VND)' || label === 'Thay đổi (%)' ? (
          <MdInfoOutline className="ml-1 text-gray-500 cursor-pointer" title="Tooltip info" />
        ) : null}
      </div>
      <div className="w-3/4">
        <div className="flex items-center space-x-2 mb-1">
          <input
            type="number"
            value={value[0]}
            onChange={(e) => setValue([Number(e.target.value), value[1]])}
            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-xs text-center focus:outline-none focus:border-green-500"
            min={min}
            max={max}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[0]}
            onChange={(e) => setValue([Number(e.target.value), value[1]])}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-green-500"
            style={{ WebkitAppearance: 'none', /* For custom styling */MozAppearance: 'none' }}
          />
          <input
            type="range"
            min={min}
            max={max}
            value={value[1]}
            onChange={(e) => setValue([value[0], Number(e.target.value)])}
            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-green-500"
            style={{ WebkitAppearance: 'none', /* For custom styling */MozAppearance: 'none' }}
          />
          <input
            type="number"
            value={value[1]}
            onChange={(e) => setValue([value[0], Number(e.target.value)])}
            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-xs text-center focus:outline-none focus:border-green-500"
            min={min}
            max={max}
          />
        </div>
        <div className="text-gray-500 text-xs text-right mt-1">
          {value[0].toLocaleString()} {unit} - {value[1].toLocaleString()} {unit}
        </div>
      </div>
    </div>
  );

  // Filter logic (simple based on dummy data and vonHoa for now)
  const filteredStocks = dummyStocks.filter(stock => {
    // Implement actual filtering based on all criteria here
    // For demo, just show all
    return true;
  });

  return (
  <>
  <Header />
    <div className="flex flex-col h-screen bg-gray-950 text-white font-sans">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800 shadow-md flex-shrink-0">
        <h1 className="text-xl font-bold">Bộ lọc cổ phiếu</h1>
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400">
            <FiSettings className="text-lg" />
          </button>
          <div className="relative">
            <select className="appearance-none bg-gray-800 border border-gray-700 text-white py-1 px-3 pr-8 rounded-md cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>Tất cả</option>
              <option>HSX</option>
              <option>HNX</option>
              <option>UPCOM</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <FiChevronDown className="text-xs" />
            </div>
          </div>
          <div className="relative">
            <select className="appearance-none bg-gray-800 border border-gray-700 text-white py-1 px-3 pr-8 rounded-md cursor-pointer text-sm focus:outline-none focus:ring-1 focus:ring-green-500">
              <option>Tất cả</option>
              <option>Ngân hàng</option>
              <option>Bất động sản</option>
              {/* Thêm các ngành khác */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <FiChevronDown className="text-xs" />
            </div>
          </div>
          <button className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400">
            <FiMaximize2 className="text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-56 bg-gray-900 border-r border-gray-800 p-4 flex flex-col flex-shrink-0">
          <button
            className={`flex items-center w-full text-left py-2 px-3 rounded-md mb-2 transition-colors duration-200 ${
              activeTab === 'generalInfo'
                ? 'bg-green-700 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('generalInfo')}
          >
            <MdInfoOutline className="mr-2 text-lg" />
            Thông tin chung
          </button>
          <button
            className={`flex items-center w-full text-left py-2 px-3 rounded-md mb-2 transition-colors duration-200 ${
              activeTab === 'technicalSignals'
                ? 'bg-green-700 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('technicalSignals')}
          >
            <MdInfoOutline className="mr-2 text-lg" /> {/* Placeholder icon */}
            Tín hiệu kỹ thuật
          </button>
          <button
            className={`flex items-center w-full text-left py-2 px-3 rounded-md mb-2 transition-colors duration-200 ${
              activeTab === 'financialRatios'
                ? 'bg-green-700 text-white'
                : 'text-gray-300 hover:bg-gray-800'
            }`}
            onClick={() => setActiveTab('financialRatios')}
          >
            <MdInfoOutline className="mr-2 text-lg" /> {/* Placeholder icon */}
            Chỉ số tài chính
          </button>
        </div>

        {/* Filter Pane & Stock List */}
        <div className="flex-1 flex flex-col bg-gray-900 p-6 overflow-hidden">
          {activeTab === 'generalInfo' && (
            <div className="flex-1 flex flex-col">
              <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700 shadow-inner flex-shrink-0">
                <p className="text-xs text-gray-400 mb-4">
                  Chọn tối đa <span className="font-bold text-white">1000</span> mã cổ phiếu.
                </p>
                {renderFilterSlider('Vốn hóa (tỷ VND)', vonHoaRange, setVonHoaRange, 0, 1000000)}
                {renderFilterSlider('Giá (VND)', giaRange, setGiaRange, 0, 800000)}
                {renderFilterSlider('Thay đổi (%)', thayDoiRange, setThayDoiRange, -50, 50)} {/* Adjusted range for % */}
                
                <div className="flex items-center mb-4 text-sm">
                    <div className="w-1/4 flex items-center text-gray-400">
                        GTGD trung bình (tỷ VND)
                    </div>
                    <div className="w-3/4 flex items-center space-x-2">
                        <select className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-green-500 w-24">
                            <option value="30">30 ngày</option>
                            <option value="90">90 ngày</option>
                            <option value="180">180 ngày</option>
                        </select>
                        <input
                            type="number"
                            value={gtgdRange[0]}
                            onChange={(e) => setGtgdRange([Number(e.target.value), gtgdRange[1]])}
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-xs text-center focus:outline-none focus:border-green-500"
                            min={0}
                            max={2000}
                        />
                         <input
                            type="range"
                            min={0}
                            max={2000}
                            value={gtgdRange[0]}
                            onChange={(e) => setGtgdRange([Number(e.target.value), gtgdRange[1]])}
                            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-green-500"
                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                        />
                        <input
                            type="range"
                            min={0}
                            max={2000}
                            value={gtgdRange[1]}
                            onChange={(e) => setGtgdRange([gtgdRange[0], Number(e.target.value)])}
                            className="flex-1 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-green-500"
                            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                        />
                        <input
                            type="number"
                            value={gtgdRange[1]}
                            onChange={(e) => setGtgdRange([gtgdRange[0], Number(e.target.value)])}
                            className="w-20 bg-gray-700 border border-gray-600 rounded px-2 py-1 text-white text-xs text-center focus:outline-none focus:border-green-500"
                            min={0}
                            max={2000}
                        />
                        <button className="p-2 ml-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-400">
                            <MdInfoOutline className="text-base" /> {/* Thùng rác icon, dùng info tạm */}
                        </button>
                    </div>
                </div>

              </div>

              {/* Stock List Table */}
              <div className="flex-1 bg-gray-800 rounded-lg border border-gray-700 overflow-hidden flex flex-col">
                <div className="flex-shrink-0 p-3 bg-gray-700 border-b border-gray-600">
                    <input
                        type="text"
                        placeholder="Tìm kiếm mã"
                        className="w-48 bg-gray-600 border border-gray-500 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-green-500"
                    />
                </div>
                <div className="overflow-y-auto flex-1">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-800 sticky top-0 z-10">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">Mã</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">Giá</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">Thay đổi</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">Sàn</th>
                        <th className="px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider w-1/5">Ngành</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredStocks.map((stock, index) => (
                        <tr key={stock.ma} className={`${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'} hover:bg-gray-700 transition-colors`}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">
                            {stock.ma}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-white">
                            {stock.gia.toLocaleString('vi-VN')}
                          </td>
                          <td className={`px-4 py-2 whitespace-nowrap text-sm ${stock.thayDoi > 0 ? 'text-green-400' : stock.thayDoi < 0 ? 'text-red-400' : 'text-gray-300'}`}>
                            {stock.thayDoi > 0 ? '+' : ''}{stock.thayDoi}%
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            {stock.san}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                            {stock.nganh}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {filteredStocks.length === 0 && (
                    <div className="text-center text-gray-500 py-8">Không có cổ phiếu nào phù hợp.</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technicalSignals' && (
            <div className="flex-1 flex flex-col bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-300 shadow-inner">
              <h2 className="text-lg font-bold mb-4">Tín hiệu kỹ thuật</h2>
              <p>Nội dung bộ lọc cho tín hiệu kỹ thuật sẽ ở đây.</p>
              {/* Thêm các tùy chọn lọc kỹ thuật */}
            </div>
          )}

          {activeTab === 'financialRatios' && (
            <div className="flex-1 flex flex-col bg-gray-800 rounded-lg p-6 border border-gray-700 text-gray-300 shadow-inner">
              <h2 className="text-lg font-bold mb-4">Chỉ số tài chính</h2>
              <p>Nội dung bộ lọc cho chỉ số tài chính sẽ ở đây.</p>
              {/* Thêm các tùy chọn lọc tài chính */}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-3 bg-gray-900 border-t border-gray-800 text-sm text-gray-400 flex-shrink-0">
        <span>Tổng cộng: <span className="text-white">{filteredStocks.length}</span> mã</span>
        <div className="flex space-x-3">
          <button className="px-4 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-medium">
            Tải sàn
          </button>
          <button className="px-4 py-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-white font-medium">
            So sánh
          </button>
          <button className="px-4 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white font-medium">
            Đặt lệnh
          </button>
        </div>
      </div>
    </div>
    </>
  );
}