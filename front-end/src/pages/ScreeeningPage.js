import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faChartLine, faMoneyBillWave, faCaretDown, faAngleUp, faAngleDown, faTrashAlt, faPlusCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header/Header' // Assuming you have a Header component

const stockData = [
    // ... (dữ liệu stockData của bạn giữ nguyên)
    { ma: 'BMG', gia: 17500, thayDoiGia: 0.0, sucManh: 54, san: 'UPCOM', nganh: 'Hàng cá nhân & Gia dụng', rs: 60, rsi: 55, giaVsEMA: 2.5, pe: 15.2, pb: 1.8, roe: 12.1, tangTruongLoiNhuan: 8.5, vonHoa: 500, gtgdTrungBinh: 150 },
    { ma: 'BVL', gia: 20650, thayDoiGia: 0.5, sucManh: 19, san: 'HSX', nganh: 'Bảo hiểm', rs: 45, rsi: 48, giaVsEMA: 1.0, pe: 10.5, pb: 0.9, roe: 9.3, tangTruongLoiNhuan: 5.2, vonHoa: 1200, gtgdTrungBinh: 300 },
    { ma: 'BMU', gia: 10800, thayDoiGia: 4.8, sucManh: 4.7, san: 'UPCOM', nganh: 'Tài nguyên Cơ bản', rs: 70, rsi: 65, giaVsEMA: 4.0, pe: 20.1, pb: 2.5, roe: 18.7, tangTruongLoiNhuan: 15.0, vonHoa: 300, gtgdTrungBinh: 80 },
    { ma: 'BMK', gia: 16900, thayDoiGia: 0.0, sucManh: 84, san: 'UPCOM', nganh: 'Xây dựng và Vật liệu', rs: 80, rsi: 75, giaVsEMA: 3.2, pe: 22.3, pb: 3.1, roe: 20.5, tangTruongLoiNhuan: 12.8, vonHoa: 800, gtgdTrungBinh: 200 },
    { ma: 'BMP', gia: 145300, thayDoiGia: -0.5, sucManh: 70, san: 'HSX', nganh: 'Xây dựng và Vật liệu', rs: 65, rsi: 60, giaVsEMA: -1.2, pe: 18.0, pb: 2.0, roe: 14.0, tangTruongLoiNhuan: 7.0, vonHoa: 5000, gtgdTrungBinh: 1000 },
    { ma: 'BMS', gia: 13400, thayDoiGia: 3.1, sucManh: 89, san: 'UPCOM', nganh: 'Dịch vụ tài chính', rs: 90, rsi: 85, giaVsEMA: 5.0, pe: 25.0, pb: 4.0, roe: 25.0, tangTruongLoiNhuan: 20.0, vonHoa: 700, gtgdTrungBinh: 180 },
    { ma: 'BMV', gia: 6200, thayDoiGia: 0.0, sucManh: 35, san: 'UPCOM', nganh: 'Thực phẩm và đồ uống', rs: 50, rsi: 40, giaVsEMA: -0.5, pe: 12.0, pb: 1.2, roe: 8.0, tangTruongLoiNhuan: 4.0, vonHoa: 200, gtgdTrungBinh: 50 },
    { ma: 'BNA', gia: 8100, thayDoiGia: 5.2, sucManh: 51, san: 'HNX', nganh: 'Thực phẩm và đồ uống', rs: 55, rsi: 50, giaVsEMA: 1.8, pe: 14.0, pb: 1.5, roe: 10.0, tangTruongLoiNhuan: 6.0, vonHoa: 400, gtgdTrungBinh: 100 },
    { ma: 'BNW', gia: 8100, thayDoiGia: 0.0, sucManh: 15, san: 'UPCOM', nganh: 'Điện, nước & xăng dầu', rs: 30, rsi: 35, giaVsEMA: -2.0, pe: 8.0, pb: 0.7, roe: 5.0, tangTruongLoiNhuan: 2.0, vonHoa: 150, gtgdTrungBinh: 40 },
];

function ScreeningPage() {
    const [activeTab, setActiveTab] = useState('generalInfo');
    // Đổi tên state để rõ ràng hơn, mặc định là mở rộng
    const [isFilterDetailExpanded, setIsFilterDetailExpanded] = useState(true);

    const [filters, setFilters] = useState({
        vonHoa: { enabled: false, min: 0, max: 1000000 },
        gia: { enabled: false, min: 0, max: 800000 },
        thayDoiGia: { enabled: false, min: -15, max: 15 },
        gtgdTrungBinh: { enabled: false, period: 30, min: 0, max: 2000 },
        sucManh: { enabled: false, min: 0, max: 100 },
        rs: { enabled: false, min: 0, max: 100 },
        rsi: { enabled: false, min: 0, max: 100 },
        giaVsEMA: { enabled: false, min: -10, max: 10 },
        pe: { enabled: false, min: 0, max: 50 },
        pb: { enabled: false, min: 0, max: 10 },
        roe: { enabled: false, min: 0, max: 30 },
        tangTruongLoiNhuan: { enabled: false, min: -20, max: 50 },
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSan, setSelectedSan] = useState('Tất cả');
    const [selectedNganh, setSelectedNganh] = useState('Tất cả');

    const uniqueNganh = ['Tất cả', ...new Set(stockData.map(stock => stock.nganh))];
    const uniqueSan = ['Tất cả', ...new Set(stockData.map(stock => stock.san))];

    // Sửa handleFilterChange để xử lý logic cho thanh trượt
    const handleFilterChange = (filterName, key, value) => {
        setFilters((prev) => {
            const newFilter = { ...prev[filterName] };
            const numValue = parseFloat(value) || 0;

            if (key === 'min') {
                // Đảm bảo "min" không vượt qua "max"
                newFilter.min = numValue > newFilter.max ? newFilter.max : numValue;
            } else if (key === 'max') {
                // Đảm bảo "max" không nhỏ hơn "min"
                newFilter.max = numValue < newFilter.min ? newFilter.min : numValue;
            } else {
                newFilter[key] = value;
            }
            
            return {
                ...prev,
                [filterName]: newFilter,
            };
        });
    };


    const handleCheckboxChange = (filterName) => {
        setFilters((prev) => ({
            ...prev,
            [filterName]: {
                ...prev[filterName],
                enabled: !prev[filterName].enabled,
            },
        }));
    };

    const formatNumber = (num) => {
        if (num === null || num === undefined) return '';
        return new Intl.NumberFormat('vi-VN').format(num);
    };

    const filteredStocks = stockData.filter((stock) => {
        let isMatch = true;
        for (const key in filters) {
            if (filters[key].enabled) {
                if (stock[key] < filters[key].min || stock[key] > filters[key].max) {
                    isMatch = false;
                    break;
                }
            }
        }
        if (!isMatch) return false;

        if (searchTerm && !stock.ma.toLowerCase().includes(searchTerm.toLowerCase())) isMatch = false;
        if (selectedSan !== 'Tất cả' && stock.san !== selectedSan) isMatch = false;
        if (selectedNganh !== 'Tất cả' && stock.nganh !== selectedNganh) isMatch = false;
        return isMatch;
    });

    const renderFilterRow = (filterName, label, unit, minRange, maxRange, step = 1, formatValue = (num) => num) => {
        const filter = filters[filterName];
        if (!filter) return null;

        const handleMinInputChange = (e) => {
            const value = parseFloat(e.target.value);
            if (value <= filter.max) {
                handleFilterChange(filterName, 'min', value);
            }
        };

        const handleMaxInputChange = (e) => {
            const value = parseFloat(e.target.value);
            if (value >= filter.min) {
                handleFilterChange(filterName, 'max', value);
            }
        };
        
        return (
            <div className="flex items-center gap-3 mb-4">
                <label className="flex items-center cursor-pointer min-w-[180px]">
                    <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-yellow-500 rounded border-gray-500 bg-[#2a2a2a] focus:ring-yellow-500"
                        checked={filter.enabled}
                        onChange={() => handleCheckboxChange(filterName)}
                    />
                    <span className="ml-2 text-sm">{label} {unit && `(${unit})`}</span>
                </label>
                <input
                    type="number"
                    className="bg-[#2a2a2a] border border-gray-500 text-gray-200 p-1 rounded w-24 text-center text-sm"
                    value={filter.min}
                    onChange={handleMinInputChange}
                    disabled={!filter.enabled}
                />
                <div className="relative flex-grow h-1 bg-gray-500 rounded-full mx-2">
                    {/* Visual track cho vùng được chọn */}
                    <div className="absolute h-full rounded-full" style={{
                        left: `${((filter.min - minRange) / (maxRange - minRange)) * 100}%`,
                        width: `${((filter.max - filter.min) / (maxRange - minRange)) * 100}%`,
                        backgroundColor: filter.enabled ? '#CA8A04' : '#6b7280',
                        zIndex: 1,
                    }}></div>
                     {/* Range input cho min value */}
                    <input
                        type="range"
                        min={minRange}
                        max={maxRange}
                        step={step}
                        value={filter.min}
                        onChange={handleMinInputChange}
                        className="absolute w-full h-full bg-transparent slider-thumb appearance-none cursor-pointer"
                        disabled={!filter.enabled}
                        style={{ zIndex: 3 }}
                    />
                     {/* Range input cho max value */}
                    <input
                        type="range"
                        min={minRange}
                        max={maxRange}
                        step={step}
                        value={filter.max}
                        onChange={handleMaxInputChange}
                        className="absolute w-full h-full bg-transparent slider-thumb appearance-none cursor-pointer"
                        disabled={!filter.enabled}
                        style={{ zIndex: 4 }}
                    />
                </div>
                <input
                    type="number"
                    className="bg-[#2a2a2a] border border-gray-500 text-gray-200 p-1 rounded w-28 text-center text-sm"
                    value={filter.max}
                    onChange={handleMaxInputChange}
                    disabled={!filter.enabled}
                />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Header />
            <style jsx global>{`
                .slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 1rem;
                  height: 1rem;
                  background-color: #CA8A04;
                  border-radius: 50%;
                  cursor: pointer;
                  margin-top: -6px; /* Căn giữa thumb với track */
                }
                .slider-thumb:disabled {
                  background-color: #6b7280;
                }
                /* T ẩn track mặc định của trình duyệt */
                .slider-thumb::-webkit-slider-runnable-track {
                  background: transparent;
                  border: none;
                }
                .slider-thumb::-moz-range-track {
                  background: transparent;
                  border: none;
                }
            `}</style>
            <main className="flex-grow p-5 overflow-y-auto bg-black">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
                    {/* Cột trái: Bộ lọc cổ phiếu (dạng tabbed) */}
                    <div className="bg-[#1a1a1a] py-5 rounded-lg border border-zinc-800 lg:col-span-1 h-fit">
                        <h2 className="text-white text-lg px-5 pb-5 border-b border-zinc-700">Bộ lọc cổ phiếu</h2>
                        <ul>
                            <li
                                className={`px-5 py-3 cursor-pointer text-sm ${activeTab === 'generalInfo' ? 'bg-zinc-800 text-yellow-400' : 'hover:bg-zinc-800'}`}
                                onClick={() => setActiveTab('generalInfo')}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" /> Thông tin chung
                            </li>
                            <li
                                className={`px-5 py-3 cursor-pointer text-sm ${activeTab === 'technicalIndicators' ? 'bg-zinc-800 text-yellow-400' : 'hover:bg-zinc-800'}`}
                                onClick={() => setActiveTab('technicalIndicators')}
                            >
                                <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Tín hiệu kỹ thuật
                            </li>
                            <li
                                className={`px-5 py-3 cursor-pointer text-sm ${activeTab === 'financialIndicators' ? 'bg-zinc-800 text-yellow-400' : 'hover:bg-zinc-800'}`}
                                onClick={() => setActiveTab('financialIndicators')}
                            >
                                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" /> Chỉ số tài chính
                            </li>
                        </ul>
                    </div>

                    {/* Cột phải: Thanh tìm kiếm, dropdown và các tùy chọn lọc chi tiết */}
                    <div className="lg:col-span-2 bg-[#1a1a1a] p-4 rounded-lg border border-zinc-800">
                        <header className="flex flex-wrap items-center justify-between pb-4 mb-4 border-b border-gray-600">
                            <div className="flex items-center gap-3 mb-3 md:mb-0 flex-grow mr-4">
                                <button className="bg-[#2a2a2a] text-white py-2 px-3 rounded hover:bg-gray-600"><FontAwesomeIcon icon={faSearch} /></button>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm theo mã"
                                    className="flex-grow bg-[#2a2a2a] border border-gray-500 text-gray-200 p-2 rounded text-sm"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2 mb-3 md:mb-0">
                                {/* Dropdowns */}
                                <div className="relative inline-block group">
                                    <button className="bg-[#2a2a2a] text-white py-2 px-4 text-sm rounded flex items-center gap-1">
                                        Sàn <FontAwesomeIcon icon={faCaretDown} />
                                    </button>
                                    <div className="absolute hidden group-hover:block bg-[#2a2a2a] shadow-xl rounded z-10 mt-1 min-w-[120px] border border-zinc-700">
                                        {uniqueSan.map(san => (
                                            <button key={san} onClick={() => setSelectedSan(san)} className="block w-full text-left text-gray-200 hover:bg-gray-600 px-4 py-2 text-sm">
                                                {san}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative inline-block group">
                                    <button className="bg-[#2a2a2a] text-white py-2 px-4 text-sm rounded flex items-center gap-1">
                                        Ngành <FontAwesomeIcon icon={faCaretDown} />
                                    </button>
                                    <div className="absolute hidden group-hover:block bg-[#2a2a2a] shadow-xl rounded z-10 mt-1 min-w-[120px] border border-zinc-700">
                                        {uniqueNganh.map(nganh => (
                                            <button key={nganh} onClick={() => setSelectedNganh(nganh)} className="block w-full text-left text-gray-200 hover:bg-gray-600 px-4 py-2 text-sm">
                                                {nganh}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                 {/* Nút thu gọn/mở rộng được chuyển vào đây */}
                                <button
                                    className="bg-[#2a2a2a] text-white py-2 px-4 rounded flex items-center gap-2 hover:bg-gray-600 transition-colors text-sm"
                                    onClick={() => setIsFilterDetailExpanded(!isFilterDetailExpanded)}
                                >
                                    <span>Bộ lọc</span>
                                    <FontAwesomeIcon icon={isFilterDetailExpanded ? faAngleUp : faAngleDown} />
                                </button>
                            </div>
                        </header>

                        {/* Các tùy chọn lọc chi tiết được bao bọc bởi điều kiện */}
                        {isFilterDetailExpanded && (
                            <section className="filter-options">
                                {activeTab === 'generalInfo' && (
                                    <>
                                        {renderFilterRow('vonHoa', 'Vốn hóa', 'tỷ VNĐ', 0, 1000000, 1000, formatNumber)}
                                        {renderFilterRow('gia', 'Giá', 'VNĐ', 0, 800000, 100, formatNumber)}
                                        {renderFilterRow('thayDoiGia', 'Thay đổi giá', '%', -50, 50, 0.1, (num) => num.toFixed(1))}
                                        {renderFilterRow('gtgdTrungBinh', 'GTGD trung bình', 'tỷ VNĐ', 0, 2000, 10, formatNumber)}
                                    </>
                                )}
                                {activeTab === 'technicalIndicators' && (
                                    <>
                                        {renderFilterRow('sucManh', 'Sức mạnh giá', null, 0, 100, 1, (num) => num)}
                                        {renderFilterRow('rs', 'RS', null, 0, 100, 1, (num) => num)}
                                        {renderFilterRow('rsi', 'RSI', null, 0, 100, 1, (num) => num)}
                                        {renderFilterRow('giaVsEMA', 'Giá vs EMA', '%', -50, 50, 0.1, (num) => num.toFixed(1))}
                                    </>
                                )}
                                {activeTab === 'financialIndicators' && (
                                    <>
                                        {renderFilterRow('pe', 'P/E', 'x', 0, 50, 0.1, (num) => num.toFixed(1))}
                                        {renderFilterRow('pb', 'P/B', 'x', 0, 10, 0.1, (num) => num.toFixed(1))}
                                        {renderFilterRow('roe', 'ROE', '%', 0, 100, 0.1, (num) => num.toFixed(1))}
                                        {renderFilterRow('tangTruongLoiNhuan', 'Tăng trưởng lợi nhuận', '%', -50, 100, 0.1, (num) => num.toFixed(1))}
                                    </>
                                )}
                            </section>
                        )}
                    </div>
                </div>

                {/* Hàng dưới: Bảng hiển thị dữ liệu cổ phiếu */}
                <section className="stock-list bg-[#1a1a1a] p-4 rounded-lg border border-zinc-800">
                   <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-600">
                            <thead className="bg-gray-800">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Mã</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Giá</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">+/- Giá (%)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sức mạnh</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ngành</th>
                                    {activeTab === 'technicalIndicators' && (
                                        <>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RS</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">RSI</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Giá vs EMA (%)</th>
                                        </>
                                    )}
                                    {activeTab === 'financialIndicators' && (
                                        <>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P/E (x)</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">P/B (x)</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ROE (%)</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tăng trưởng LN (%)</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-600">
                                {filteredStocks.map((stock) => (
                                    <tr key={stock.ma} className="hover:bg-gray-800 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-yellow-400">{stock.ma}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{formatNumber(stock.gia)}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${stock.thayDoiGia > 0 ? 'text-green-400' : (stock.thayDoiGia < 0 ? 'text-red-400' : 'text-gray-300')}`}>
                                            {stock.thayDoiGia > 0 ? '+' : ''}{stock.thayDoiGia.toFixed(1)}%
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.sucManh}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.nganh}</td>
                                        {activeTab === 'technicalIndicators' && (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.rs}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.rsi}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.giaVsEMA}%</td>
                                            </>
                                        )}
                                        {activeTab === 'financialIndicators' && (
                                            <>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.pe}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.pb}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.roe}%</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{stock.tangTruongLoiNhuan}%</td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                   </div>
                </section>
            </main>
        </div>
    );
}

export default ScreeningPage;