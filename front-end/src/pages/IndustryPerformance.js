import React, { useState } from 'react';
import { FiSettings, FiBarChart2, FiGrid } from 'react-icons/fi'; // Icons for settings, chart, grid
import { FaAngleDown } from 'react-icons/fa'; // For dropdown arrow
import Header from '../components/Header/Header';

// Combined Dummy Data for both tabs, structured to hold all necessary information
const industryFullData = [
  {
    id: 1,
    name: 'Ngân hàng',
    rankingValues: { // Data for 'Xếp hạng' tab
      '21/07': 82, '19/07': 82, '17/07': 84, '15/07': 83, '13/07': 84, '11/07': 85, '09/07': 83, '07/07': 85, '04/07': 79, '02/07': 71, '01/07': 69, '28/06': 65, '26/06': 62, '24/06': 62,
    },
    infoValues: { // Data for 'Thông tin' tab
      marketCap: '2,511,592', // Vốn hóa (Tỷ VND)
      changePercent: 0.8, // % Thay đổi
      day2Nearest: 0.8, // 2D gần nhất (assuming this is a percentage change)
      w1: 3.2, // 1W%
      m1: 11.3, // 1M%
      m6: 15.0, // 6M%
      ytd: 16.8, // YTD %
      y1: 24.1, // 1Y%
      y2: 38.2, // 2Y%
      y5: 161.0, // 5Y%
      chartTrend: 'green', // Used to determine the small chart icon (green for positive, red for negative trend)
    }
  },
  {
    id: 2,
    name: 'Bất động sản',
    rankingValues: {
      '21/07': 84, '19/07': 86, '17/07': 83, '15/07': 83, '13/07': 81, '11/07': 82, '09/07': 81, '07/07': 80, '04/07': 77, '02/07': 68, '01/07': 63, '28/06': 61, '26/06': 57, '24/06': 68,
    },
    infoValues: {
      marketCap: '1,462,726',
      changePercent: 0.6,
      day2Nearest: -1.2, // Example negative
      w1: 16.5,
      m1: 72.2,
      m6: 59.6,
      ytd: 70.2,
      y1: 42.8,
      y2: 57.1,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 3,
    name: 'Thực phẩm và đồ uống',
    rankingValues: {
      '21/07': 64, '19/07': 68, '17/07': 67, '15/07': 69, '13/07': 71, '11/07': 73, '09/07': 74, '07/07': 74, '04/07': 72, '02/07': 71, '01/07': 70, '28/06': 69, '26/06': 70, '24/06': 68,
    },
    infoValues: {
      marketCap: '680,735',
      changePercent: 0.8,
      day2Nearest: 1.0,
      w1: 4.5,
      m1: -0.2, // Example negative
      m6: -4.7, // Example negative
      ytd: 5.2,
      y1: 13.1,
      y2: 33.1,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 4,
    name: 'Hàng & Dịch vụ Công nghiệp',
    rankingValues: {
      '21/07': 68, '19/07': 68, '17/07': 67, '15/07': 65, '13/07': 64, '11/07': 67, '09/07': 70, '07/07': 70, '04/07': 72, '02/07': 71, '01/07': 67, '28/06': 65, '26/06': 59, '24/06': 54,
    },
    infoValues: {
      marketCap: '633,462',
      changePercent: 0.8,
      day2Nearest: 3.4,
      w1: 6.7,
      m1: -1.7,
      m6: 2.9,
      ytd: 17.6,
      y1: 53.3,
      y2: 128.8,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 5,
    name: 'Điện, nước & xăng dầu khí đốt',
    rankingValues: {
      '21/07': 60, '19/07': 61, '17/07': 59, '15/07': 60, '13/07': 59, '11/07': 59, '09/07': 59, '07/07': 56, '04/07': 53, '02/07': 56, '01/07': 48, '28/06': 48, '26/06': 51, '24/06': 53,
    },
    infoValues: {
      marketCap: '455,231',
      changePercent: 0.1,
      day2Nearest: 1.6,
      w1: 2.6,
      m1: 5.5,
      m6: 5.1,
      ytd: 1.1,
      y1: 7.5,
      y2: 66.8,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 6,
    name: 'Dịch vụ tài chính',
    rankingValues: {
      '21/07': 84, '19/07': 83, '17/07': 84, '15/07': 83, '13/07': 81, '11/07': 80, '09/07': 80, '07/07': 75, '04/07': 68, '02/07': 61, '01/07': 52, '28/06': 52, '26/06': 53, '24/06': 50,
    },
    infoValues: {
      marketCap: '340,160',
      changePercent: 0.4,
      day2Nearest: 4.8,
      w1: 22.5,
      m1: 29.2,
      m6: 26.7,
      ytd: 23.5,
      y1: 39.4,
      y2: 328.0,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 7,
    name: 'Du lịch và Giải trí',
    rankingValues: {
      // Dummy ranking values for this one if it wasn't explicitly in the original ranking data
      '21/07': 70, '19/07': 72, '17/07': 68, '15/07': 69, '13/07': 71, '11/07': 70, '09/07': 75, '07/07': 73, '04/07': 65, '02/07': 60, '01/07': 55, '28/06': 58, '26/06': 50, '24/06': 45,
    },
    infoValues: {
      marketCap: '340,010',
      changePercent: 0.2,
      day2Nearest: 6.0,
      w1: 4.4,
      m1: 20.9,
      m6: 15.6,
      ytd: 28.9,
      y1: 61.5,
      y2: 42.2,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 8,
    name: 'Tài nguyên Cơ bản',
    rankingValues: {
      '21/07': 78, '19/07': 75, '17/07': 73, '15/07': 72, '13/07': 71, '11/07': 69, '09/07': 70, '07/07': 69, '04/07': 66, '02/07': 63, '01/07': 59, '28/06': 57, '26/06': 55, '24/06': 53,
    },
    infoValues: {
      marketCap: '346,828',
      changePercent: -1.6, // Example negative
      day2Nearest: 1.9,
      w1: 12.7,
      m1: 16.8,
      m6: 18.6,
      ytd: 19.8,
      y1: 25.4,
      y2: 136.5,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 9,
    name: 'Viễn thông',
    rankingValues: {
      '21/07': 82, '19/07': 81, '17/07': 74, '15/07': 75, '13/07': 74, '11/07': 77, '09/07': 76, '07/07': 81, '04/07': 82, '02/07': 77, '01/07': 77, '28/06': 78, '26/06': 66, '24/06': 63,
    },
    infoValues: {
      marketCap: '281,696',
      changePercent: 0.8,
      day2Nearest: -0.3, // Example negative
      w1: 6.5,
      m1: -13.6, // Example negative
      m6: -12.9, // Example negative
      ytd: 17.1,
      y1: 185.3,
      y2: 209.3,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 10,
    name: 'Xây dựng và Vật liệu',
    rankingValues: {
      '21/07': 76, '19/07': 77, '17/07': 76, '15/07': 75, '13/07': 75, '11/07': 78, '09/07': 78, '07/07': 76, '04/07': 75, '02/07': 68, '01/07': 64, '28/06': 64, '26/06': 66, '24/06': 66,
    },
    infoValues: {
      marketCap: '272,713',
      changePercent: 0.8,
      day2Nearest: 2.1,
      w1: 7.8,
      m1: 9.0,
      m6: 8.7,
      ytd: 11.7,
      y1: 6.7,
      y2: 83.2,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 11,
    name: 'Hóa chất',
    rankingValues: {
      '21/07': 68, '19/07': 67, '17/07': 69, '15/07': 68, '13/07': 67, '11/07': 70, '09/07': 73, '07/07': 75, '04/07': 74, '02/07': 69, '01/07': 65, '28/06': 67, '26/06': 68, '24/06': 66,
    },
    infoValues: {
      marketCap: '205,454',
      changePercent: 0.8,
      day2Nearest: 4.4,
      w1: 7.0,
      m1: 7.7,
      m6: 3.7,
      ytd: 2.8,
      y1: 42.3,
      y2: 231.3,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 12,
    name: 'Công nghệ thông tin',
    rankingValues: {
      '21/07': 79, '19/07': 80, '17/07': 81, '15/07': 79, '13/07': 78, '11/07': 81, '09/07': 79, '07/07': 78, '04/07': 77, '02/07': 65, '01/07': 62, '28/06': 63, '26/06': 64, '24/06': 62,
    },
    infoValues: {
      marketCap: '209,588',
      changePercent: -0.5, // Example negative
      day2Nearest: 0.1,
      w1: 9.8,
      m1: -14.9, // Example negative
      m6: -14.3, // Example negative
      ytd: 2.8,
      y1: 78.2,
      y2: 386.8,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 13,
    name: 'Bán lẻ',
    rankingValues: {
      '21/07': 84, '19/07': 84, '17/07': 84, '15/07': 85, '13/07': 84, '11/07': 83, '09/07': 86, '07/07': 86, '04/07': 85, '02/07': 80, '01/07': 80, '28/06': 81, '26/06': 83, '24/06': 77,
    },
    infoValues: {
      marketCap: '105,404',
      changePercent: -0.3, // Example negative
      day2Nearest: 0.8,
      w1: 8.6,
      m1: 12.5,
      m6: 12.0,
      ytd: 14.8,
      y1: 44.0,
      y2: 222.4,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 14,
    name: 'Dầu khí',
    rankingValues: {
      '21/07': 69, '19/07': 68, '17/07': 66, '15/07': 66, '13/07': 66, '11/07': 72, '09/07': 81, '07/07': 80, '04/07': 78, '02/07': 75, '01/07': 72, '28/06': 71, '26/06': 64, '24/06': 65,
    },
    infoValues: {
      marketCap: '157,027',
      changePercent: 2.8,
      day2Nearest: 3.5,
      w1: 4.2,
      m1: -2.1, // Example negative
      m6: -2.6, // Example negative
      ytd: -9.1, // Example negative
      y1: 10.4,
      y2: 85.3,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 15,
    name: 'Hàng gia nhân & Gia dụng',
    rankingValues: {
      '21/07': 80, '19/07': 81, '17/07': 81, '15/07': 79, '13/07': 80, '11/07': 78, '09/07': 73, '07/07': 74, '04/07': 71, '02/07': 70, '01/07': 64, '28/06': 60, '26/06': 59, '24/06': 58,
    },
    infoValues: {
      marketCap: '82,457',
      changePercent: 0.2,
      day2Nearest: 0.8,
      w1: 4.6,
      m1: -5.7, // Example negative
      m6: -7.3, // Example negative
      ytd: -4.2, // Example negative
      y1: 11.6,
      y2: 103.0,
      y5: 0.0,
      chartTrend: 'red',
    }
  },
  {
    id: 16,
    name: 'Bảo hiểm',
    rankingValues: {
      // Dummy ranking values
      '21/07': 75, '19/07': 74, '17/07': 76, '15/07': 77, '13/07': 75, '11/07': 72, '09/07': 70, '07/07': 68, '04/07': 65, '02/07': 62, '01/07': 60, '28/06': 58, '26/06': 55, '24/06': 52,
    },
    infoValues: {
      marketCap: '80,845',
      changePercent: 0.1,
      day2Nearest: 0.4,
      w1: 1.2,
      m1: 3.2,
      m6: 2.6,
      ytd: 17.3,
      y1: 17.3,
      y2: 72.8,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
  {
    id: 17,
    name: 'Y tế',
    rankingValues: {
      // Dummy ranking values
      '21/07': 65, '19/07': 66, '17/07': 64, '15/07': 65, '13/07': 63, '11/07': 60, '09/07': 58, '07/07': 55, '04/07': 52, '02/07': 50, '01/07': 48, '28/06': 45, '26/06': 42, '24/06': 40,
    },
    infoValues: {
      marketCap: '63,880',
      changePercent: 0.3,
      day2Nearest: 0.5,
      w1: 2.0,
      m1: 4.1,
      m6: 3.0,
      ytd: 6.3,
      y1: 13.0,
      y2: 66.2,
      y5: 0.0,
      chartTrend: 'green',
    }
  },
];

const allDates = Array.from(new Set(industryFullData.flatMap(item => Object.keys(item.rankingValues))))
  .sort((a, b) => {
    // Convert DD/MM to MM/DD for Date object, then sort
    const [dayA, monthA] = a.split('/').map(Number);
    const [dayB, monthB] = b.split('/').map(Number);
    // Assuming current year for comparison, this is a simplified approach
    // We need to handle year if dates span across years for accurate sorting.
    // For simplicity, assuming dates are within the same 'context' year.
    // Let's use 2000 for consistent dummy year if not provided.
    const dateA = new Date(2000, monthA - 1, dayA); // Month is 0-indexed
    const dateB = new Date(2000, monthB - 1, dayB);
    return dateB.getTime() - dateA.getTime(); // Sort descending (latest date first)
  });

const getCellBgColor = (value) => {
  if (value >= 80) return 'bg-purple-600 text-white';
  if (value >= 70) return 'bg-green-500 text-black';
  if (value >= 60) return 'bg-lime-400 text-black';
  if (value >= 50) return 'bg-yellow-400 text-black';
  if (value >= 40) return 'bg-orange-400 text-black';
  return 'bg-red-500 text-white';
};

// Helper for percentage coloring (green for positive, red for negative)
const getPercentageColor = (value) => {
  if (value > 0) return 'text-green-500';
  if (value < 0) return 'text-red-500';
  return 'text-gray-400';
};

// Helper for chart icon based on trend
const getChartIcon = (trend) => {
  if (trend === 'green') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4 inline-block -mt-1 mr-1">
        <path d="M2 17L7 12L11 16L17 10L22 15" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M18 15H22V11" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  } else if (trend === 'red') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-4 inline-block -mt-1 mr-1">
        <path d="M22 7L17 12L13 8L7 14L2 9" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 9H2V13" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  return null;
};


export default function MarketPage() {
  const [activeTab, setActiveTab] = useState('ranking');
  const [hoveredCell, setHoveredCell] = useState(null); // { date: 'DD/MM', industryId: N, value: V, industryName: S }
  const [dateFilter, setDateFilter] = useState('Hôm nay');
  const [showSettings, setShowSettings] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // Default to table view

  // Default settings for reset functionality
  const defaultSettings = {
    industryLevel: 'ICB Level 2',
    avgTradingVolume3M: '~3 tỷ VND',
    signal: 'Đang cập nhật',
    wavePerformance: 'Đang cập nhật',
  };
  const [currentSettings, setCurrentSettings] = useState(defaultSettings);

  const resetSettings = () => {
    setCurrentSettings(defaultSettings);
    setShowSettings(false); // Close the settings dropdown after reset
  };

  const filteredDates = (() => {
    if (dateFilter === 'Hôm nay') return allDates.slice(0, 1);
    if (dateFilter === 'Tuần này') return allDates.slice(0, 5);
    if (dateFilter === 'Tháng này') return allDates.slice(0, 14);
    return allDates;
  })();

  return (
    <>
      <Header />
      <div className="bg-[#141414] min-h-screen text-white p-4 font-sans relative">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6 px-2 relative">
          <h1 className="text-2xl font-bold">Ngành</h1>
          <div className="flex space-x-2">
            {/* Nút Settings */}
            <div className="relative">
              <button
                className="p-2 bg-[#222] rounded-md hover:bg-[#333] transition-colors"
                onClick={() => setShowSettings(prev => !prev)}
              >
                <FiSettings className="text-lg text-gray-400" />
              </button>
              {showSettings && (
                <div className="absolute right-0 mt-2 w-64 bg-[#1e1e1e] border border-[#444] rounded-md shadow-lg z-20 text-sm">
                  <div className="px-4 py-2 border-b border-[#333] text-green-400 font-semibold flex justify-between items-center">
                    <span>Cài đặt</span>
                    <button
                      onClick={resetSettings}
                      className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-md bg-[#2a2a2a] hover:bg-[#3a3a3a] transition-colors"
                    >
                      Đặt lại
                    </button>
                  </div>
                  <div className="px-4 py-2">Ngành: <span className="text-white">{currentSettings.industryLevel}</span></div>
                  <div className="px-4 py-2">GTGD trung bình 3M: <span className="text-white">{currentSettings.avgTradingVolume3M}</span></div>
                  <div className="px-4 py-2">Tín hiệu: <span className="text-white">{currentSettings.signal}</span></div>
                  <div className="px-4 py-2">Hiệu suất sóng: <span className="text-white">{currentSettings.wavePerformance}</span></div>
                </div>
              )}
            </div>

            {/* Nút View Mode (Chart/Grid) */}
            <button
              className={`p-2 bg-[#222] rounded-md hover:bg-[#333] transition-colors ${viewMode === 'chart' ? 'ring-2 ring-green-400' : ''}`}
              onClick={() => setViewMode('chart')}
            >
              <FiBarChart2 className="text-lg text-gray-400" />
            </button>
            <button
              className={`p-2 bg-[#222] rounded-md hover:bg-[#333] transition-colors ${viewMode === 'table' ? 'ring-2 ring-green-400' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <FiGrid className="text-lg text-gray-400" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#333] mb-4">
          <button
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === 'ranking' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('ranking')}
          >
            Xếp hạng
          </button>
          <button
            className={`py-2 px-4 text-sm font-semibold ${
              activeTab === 'info' ? 'text-green-500 border-b-2 border-green-500' : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('info')}
          >
            Thông tin
          </button>
        </div>

        {/* Nội dung */}
        {activeTab === 'ranking' && (
          <>
            {viewMode === 'table' ? (
              <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
                {/* Bộ lọc */}
                <div className="flex items-center px-4 py-3 bg-[#222] border-b border-[#333] text-sm">
                  <div className="flex items-center mr-4">
                    <span className="text-gray-400 mr-2">Ngành</span>
                    <span className="font-semibold text-white">{industryFullData.length}</span>
                  </div>
                  <div className="relative">
                    <select
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                      className="appearance-none bg-[#2e2e2e] border border-[#444] text-white py-1 px-3 pr-8 rounded-md cursor-pointer focus:outline-none text-xs"
                    >
                      <option>Hôm nay</option>
                      <option>Tuần này</option>
                      <option>Tháng này</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <FaAngleDown className="text-xs" />
                    </div>
                  </div>
                </div>

                {/* Bảng dữ liệu */}
                <div className="overflow-x-auto min-w-full">
                  <table className="min-w-full divide-y divide-[#333]">
                    <thead className="bg-[#2a2a2a]">
                      <tr>
                        <th className="sticky left-0 bg-[#2a2a2a] px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider z-20 w-48">
                          Ngành
                        </th>
                        {filteredDates.map((date) => (
                          <th
                            key={date}
                            // Only highlight if the specific cell in THIS column is hovered
                            className={`px-4 py-2 text-center text-xs font-semibold uppercase tracking-wider whitespace-nowrap z-10
                              ${hoveredCell?.date === date ? 'text-yellow-300' : 'text-gray-400'}
                            `}
                          >
                            {date}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#2c2c2c]">
                      {industryFullData.map((industry, index) => (
                        <tr
                          key={industry.id}
                          className={`${index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#1a1a1a]'}`}
                        >
                          <td
                            className={`sticky left-0 px-4 py-2 text-sm font-medium z-20 whitespace-nowrap
                              ${hoveredCell?.industryId === industry.id ? 'bg-[#333333] text-yellow-300' : 'bg-inherit text-white'}
                            `}
                          >
                            <div className="flex items-center">
                              <span className="w-6 text-gray-500 text-right mr-2">{index + 1}</span>
                              <span>{industry.name}</span>
                            </div>
                          </td>
                          {filteredDates.map((date) => {
                            const value = industry.rankingValues[date] ?? '-';
                            return (
                              <td
                                key={`${industry.id}-${date}`}
                                className={`
                                  relative group px-4 py-2 text-sm text-center font-bold transition duration-200
                                  ${value !== '-' ? getCellBgColor(value) : 'bg-gray-800 text-white'}
                                  ${(hoveredCell?.date === date && hoveredCell?.industryId === industry.id) ? 'ring-2 ring-yellow-400 scale-105 z-10' : ''}
                                  ${(hoveredCell?.date === date && hoveredCell?.industryId === industry.id) ? 'bg-[#4f4f4f]' : ''}
                                `}
                                onMouseEnter={() => setHoveredCell({ date, industryId: industry.id, value, industryName: industry.name })}
                                onMouseLeave={() => setHoveredCell(null)}
                              >
                                {value}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto min-w-full">
              <table className="min-w-full divide-y divide-[#333]">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="sticky left-0 bg-[#2a2a2a] px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider z-10 w-48">
                      Ngành
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Vốn hóa<br/>(Tỷ VND)
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      % Thay đổi
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      2D gần nhất
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1W%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1M%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      6M%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      YTD %
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1Y%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      2Y%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      5Y%
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2c2c2c]">
                  {industryFullData.map((industry, index) => (
                    <tr
                      key={industry.id}
                      className={`${
                        index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#1a1a1a]'
                      } hover:bg-[#282828] transition-colors`} // Hover effect for the entire row
                    >
                      <td className="sticky left-0 px-4 py-2 whitespace-nowrap text-sm font-medium text-white bg-inherit z-10">
                        <div className="flex items-center">
                          <span className="w-6 text-gray-500 text-right mr-2">{index + 1}</span>
                          <span>{industry.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-gray-300">
                        {industry.infoValues.marketCap}
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.changePercent)}`}>
                        {industry.infoValues.changePercent.toFixed(1)}%
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-right flex items-center justify-end">
                        {getChartIcon(industry.infoValues.chartTrend)}
                        <span className={getPercentageColor(industry.infoValues.day2Nearest)}>
                           {industry.infoValues.day2Nearest.toFixed(1)}%
                        </span>
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.w1)}`}>
                        {industry.infoValues.w1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.m1)}`}>
                        {industry.infoValues.m1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.m6)}`}>
                        {industry.infoValues.m6.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.ytd)}`}>
                        {industry.infoValues.ytd.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y1)}`}>
                        {industry.infoValues.y1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y2)}`}>
                        {industry.infoValues.y2.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y5)}`}>
                        {industry.infoValues.y5.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            )}
          </>
        )}

        {/* Tab thông tin */}
        {activeTab === 'info' && (
          <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-[#2c2c2c] overflow-hidden">
            <div className="flex items-center px-4 py-3 bg-[#222] border-b border-[#333] text-sm">
              <div className="flex items-center">
                <span className="text-gray-400 mr-2">Ngành</span>
                <span className="font-semibold text-white">{industryFullData.length}</span>
              </div>
            </div>

            <div className="overflow-x-auto min-w-full">
              <table className="min-w-full divide-y divide-[#333]">
                <thead className="bg-[#2a2a2a]">
                  <tr>
                    <th className="sticky left-0 bg-[#2a2a2a] px-4 py-2 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider z-10 w-48">
                      Ngành
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      Vốn hóa<br/>(Tỷ VND)
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      % Thay đổi
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      2D gần nhất
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1W%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1M%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      6M%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      YTD %
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      1Y%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      2Y%
                    </th>
                    <th className="px-2 py-2 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      5Y%
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2c2c2c]">
                  {industryFullData.map((industry, index) => (
                    <tr
                      key={industry.id}
                      className={`${
                        index % 2 === 0 ? 'bg-[#1e1e1e]' : 'bg-[#1a1a1a]'
                      } hover:bg-[#282828] transition-colors`}
                    >
                      <td className="sticky left-0 px-4 py-2 whitespace-nowrap text-sm font-medium text-white bg-inherit z-10">
                        <div className="flex items-center">
                          <span className="w-6 text-gray-500 text-right mr-2">{index + 1}</span>
                          <span>{industry.name}</span>
                        </div>
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-right text-gray-300">
                        {industry.infoValues.marketCap}
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.changePercent)}`}>
                        {industry.infoValues.changePercent.toFixed(1)}%
                      </td>
                      <td className="px-2 py-2 whitespace-nowrap text-sm text-right flex items-center justify-end">
                        {getChartIcon(industry.infoValues.chartTrend)}
                        <span className={getPercentageColor(industry.infoValues.day2Nearest)}>
                           {industry.infoValues.day2Nearest.toFixed(1)}%
                        </span>
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.w1)}`}>
                        {industry.infoValues.w1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.m1)}`}>
                        {industry.infoValues.m1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.m6)}`}>
                        {industry.infoValues.m6.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.ytd)}`}>
                        {industry.infoValues.ytd.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y1)}`}>
                        {industry.infoValues.y1.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y2)}`}>
                        {industry.infoValues.y2.toFixed(1)}%
                      </td>
                      <td className={`px-2 py-2 whitespace-nowrap text-sm text-right ${getPercentageColor(industry.infoValues.y5)}`}>
                        {industry.infoValues.y5.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}