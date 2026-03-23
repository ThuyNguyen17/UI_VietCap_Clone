import React, { useState, useEffect, useMemo } from 'react';

import { useNavigate } from 'react-router-dom';

// Dữ liệu chỉ số từ hình ảnh
const indices = [
  { name: 'VN-Index', value: 1497.28, change: 7.27, percent: 0.49, volume: '1,492', valueBn: '35,924', up: 154, down: 57, unchanged: 147, chartData: [1490, 1492, 1495, 1493, 1497, 1498, 1497.28] },
  { name: 'VN30', value: 1643.91, change: 9.21, percent: 0.56, volume: '478', valueBn: '15,988', up: 19, down: 11, unchanged: 0, chartData: [1635, 1638, 1640, 1637, 1642, 1645, 1643.91] },
  { name: 'HNX', value: 247.77, change: 1.68, percent: 0.68, volume: '178', valueBn: '3,300', up: 80, down: 50, unchanged: 93, chartData: [246, 246.5, 247, 246.8, 247.2, 247.5, 247.77] },
  { name: 'HNX30', value: 525.32, change: 10.90, percent: 2.12, volume: '118', valueBn: '2,702', up: 14, down: 12, unchanged: 0, chartData: [514, 516, 518, 520, 522, 524, 525.32] },
  { name: 'UPCOM', value: 104.74, change: 0.53, percent: 0.51, volume: '111', valueBn: '1,038', up: 173, down: 123, unchanged: 117, chartData: [104, 104.2, 104.4, 104.3, 104.5, 104.6, 104.74] },
];

// Dữ liệu ngành từ hình ảnh (một phần, dựa trên các cổ phiếu hiển thị)
const initialSectorData = [
  {
    sector: 'Banks',
    stocks: [
      { symbol: 'AAV', price: 7.70, change: 0.10, vol: '12,900', value: '99,330', high: 7.79, low: 7.60 },
      { symbol: 'AAT', price: 3.38, change: -0.02, vol: '176,500', value: '596,630', high: 3.39, low: 3.35 },
      { symbol: 'ABS', price: 42.70, change: 0.05, vol: '2,100', value: '89,670', high: 42.90, low: 42.50 },
      { symbol: 'ABT', price: 51.00, change: -1.50, vol: '2,600', value: '132,600', high: 52.20, low: 50.80 },
      { symbol: 'ACB', price: 22.65, change: 0.90, vol: '900', value: '20,385', high: 22.75, low: 22.40 },
      { symbol: 'ACC', price: 15.50, change: 0.10, vol: '17,500', value: '271,250', high: 15.65, low: 15.30 },
      { symbol: 'ACG', price: 49.30, change: -0.20, vol: '300', value: '14,790', high: 49.50, low: 49.10 },
      { symbol: 'ACS', price: 11.10, change: 0.10, vol: '1,500', value: '16,650', high: 11.20, low: 11.00 },
      { symbol: 'ADP', price: 31.90, change: -0.10, vol: '300', value: '9,570', high: 32.00, low: 31.80 },
      { symbol: 'AGC', price: 19.35, change: 0.15, vol: '25,100', value: '485,635', high: 19.50, low: 19.20 },
    ],
  },
  {
    sector: 'Basic Resources',
    stocks: [
      { symbol: 'HPG', price: 25.90, change: -0.64, vol: '3,500', value: '90,650', high: 26.10, low: 25.75 },
      { symbol: 'NKG', price: 22.05, change: 0.20, vol: '1,500', value: '33,075', high: 22.30, low: 21.80 },
    ],
  },
  {
    sector: 'Real Estate',
    stocks: [
      { symbol: 'VHM', price: 50.05, change: 0.10, vol: '1,800', value: '90,090', high: 50.30, low: 49.80 },
      { symbol: 'VIC', price: 45.20, change: -0.30, vol: '2,200', value: '99,440', high: 45.80, low: 44.90 },
    ],
  },
];

// Sample data for the new Vietcap-style table
const vietcapStocks = [
  {
    symbol: 'AAA', ceil: 8.31, ref: 7.77, floor: 7.23,
    foreign: { bought: 45000, sold: 129600, room: 373647161 },
    ask: [
      { price: 7.77, vol: 20000 },
      { price: 7.78, vol: 5100 },
      { price: 7.79, vol: 8500 },
    ],
    matched: { tvol: 3295400, price: 7.76, vol: 12000, percent: -0.1 },
    bid: [
      { price: 7.76, vol: 146300 },
      { price: 7.75, vol: 6300 },
      { price: 7.74, vol: 155300 },
    ],
    low: 7.74, high: 7.90, avg: 7.80,
  },
  {
    symbol: 'AAM', ceil: 7.70, ref: 7.20, floor: 6.70,
    foreign: { bought: 3000, sold: 0, room: 5952055 },
    ask: [
      { price: 7.21, vol: 20000 },
      { price: 7.20, vol: 300 },
      { price: 7.16, vol: 600 },
    ],
    matched: { tvol: 13200, price: 7.20, vol: 4400, percent: 1.3 },
    bid: [
      { price: 7.19, vol: 1600 },
      { price: 7.17, vol: 600 },
      { price: 7.16, vol: 2400 },
    ],
    low: 7.19, high: 7.20, avg: 7.20,
  },
  {
    symbol: 'HPG', ceil: 28.50, ref: 25.90, floor: 23.30,
    foreign: { bought: 10000, sold: 5000, room: 100000000 },
    ask: [
      { price: 25.95, vol: 3500 },
      { price: 26.00, vol: 2000 },
      { price: 26.10, vol: 1000 },
    ],
    matched: { tvol: 90650, price: 25.90, vol: 3500, percent: -0.6 },
    bid: [
      { price: 25.85, vol: 4000 },
      { price: 25.80, vol: 3000 },
      { price: 25.75, vol: 2000 },
    ],
    low: 25.75, high: 26.10, avg: 25.90,
  },
  {
    symbol: 'NKG', ceil: 24.50, ref: 22.05, floor: 19.60,
    foreign: { bought: 2000, sold: 1000, room: 5000000 },
    ask: [
      { price: 22.10, vol: 1500 },
      { price: 22.20, vol: 1000 },
      { price: 22.30, vol: 500 },
    ],
    matched: { tvol: 33075, price: 22.05, vol: 1500, percent: 0.2 },
    bid: [
      { price: 22.00, vol: 2000 },
      { price: 21.90, vol: 1000 },
      { price: 21.80, vol: 500 },
    ],
    low: 21.80, high: 22.30, avg: 22.05,
  },
  {
    symbol: 'VHM', ceil: 55.00, ref: 50.05, floor: 45.10,
    foreign: { bought: 1800, sold: 900, room: 2000000 },
    ask: [
      { price: 50.10, vol: 1800 },
      { price: 50.20, vol: 1000 },
      { price: 50.30, vol: 500 },
    ],
    matched: { tvol: 90090, price: 50.05, vol: 1800, percent: 0.1 },
    bid: [
      { price: 50.00, vol: 2000 },
      { price: 49.90, vol: 1000 },
      { price: 49.80, vol: 500 },
    ],
    low: 49.80, high: 50.30, avg: 50.05,
  },
  {
    symbol: 'VIC', ceil: 49.70, ref: 45.20, floor: 40.70,
    foreign: { bought: 2200, sold: 1100, room: 3000000 },
    ask: [
      { price: 45.30, vol: 2200 },
      { price: 45.50, vol: 1000 },
      { price: 45.80, vol: 500 },
    ],
    matched: { tvol: 99440, price: 45.20, vol: 2200, percent: -0.3 },
    bid: [
      { price: 45.10, vol: 2000 },
      { price: 45.00, vol: 1000 },
      { price: 44.90, vol: 500 },
    ],
    low: 44.90, high: 45.80, avg: 45.20,
  },
  {
    symbol: 'VCB', ceil: 98.00, ref: 90.00, floor: 82.00,
    foreign: { bought: 5000, sold: 2000, room: 500000 },
    ask: [
      { price: 90.10, vol: 1000 },
      { price: 90.20, vol: 800 },
      { price: 90.30, vol: 600 },
    ],
    matched: { tvol: 120000, price: 90.00, vol: 1000, percent: 0.0 },
    bid: [
      { price: 89.90, vol: 900 },
      { price: 89.80, vol: 700 },
      { price: 89.70, vol: 500 },
    ],
    low: 89.70, high: 90.30, avg: 90.00,
  },
  {
    symbol: 'FPT', ceil: 140.00, ref: 127.00, floor: 114.00,
    foreign: { bought: 3000, sold: 1000, room: 1000000 },
    ask: [
      { price: 127.10, vol: 500 },
      { price: 127.20, vol: 400 },
      { price: 127.30, vol: 300 },
    ],
    matched: { tvol: 63500, price: 127.00, vol: 500, percent: 0.0 },
    bid: [
      { price: 126.90, vol: 400 },
      { price: 126.80, vol: 300 },
      { price: 126.70, vol: 200 },
    ],
    low: 126.70, high: 127.30, avg: 127.00,
  },
  {
    symbol: 'MWG', ceil: 90.00, ref: 82.00, floor: 74.00,
    foreign: { bought: 4000, sold: 2000, room: 800000 },
    ask: [
      { price: 82.10, vol: 600 },
      { price: 82.20, vol: 500 },
      { price: 82.30, vol: 400 },
    ],
    matched: { tvol: 49200, price: 82.00, vol: 600, percent: 0.0 },
    bid: [
      { price: 81.90, vol: 500 },
      { price: 81.80, vol: 400 },
      { price: 81.70, vol: 300 },
    ],
    low: 81.70, high: 82.30, avg: 82.00,
  },
  {
    symbol: 'PNJ', ceil: 120.00, ref: 110.00, floor: 100.00,
    foreign: { bought: 2000, sold: 1000, room: 600000 },
    ask: [
      { price: 110.10, vol: 300 },
      { price: 110.20, vol: 200 },
      { price: 110.30, vol: 100 },
    ],
    matched: { tvol: 22100, price: 110.00, vol: 300, percent: 0.0 },
    bid: [
      { price: 109.90, vol: 200 },
      { price: 109.80, vol: 100 },
      { price: 109.70, vol: 50 },
    ],
    low: 109.70, high: 110.30, avg: 110.00,
  },
];

const vietcapColors = {
  ceil: '#b366ff', // purple
  ref: '#ffd700', // yellow
  floor: '#00bfff', // blue
  up: '#00ff00',
  down: '#ff3333',
  unchanged: '#ffd700',
  background: '#181818',
  header: '#232323',
  text: '#e0e0e0',
  border: '#333333',
};

// Helper to get color for price/vol/%
const getPriceColor = (price, ref) => {
  if (price > ref) return vietcapColors.up;
  if (price < ref) return vietcapColors.down;
  return vietcapColors.unchanged;
};
const getPercentColor = (percent) => {
  if (percent > 0) return vietcapColors.up;
  if (percent < 0) return vietcapColors.down;
  return vietcapColors.unchanged;
};

const MarketPage = () => {
  const [expandedSectors, setExpandedSectors] = useState(
    initialSectorData.reduce((acc, sector) => ({ ...acc, [sector.sector]: true }), {})
  );
  const [activeTab, setActiveTab] = useState('HOSE');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  const colors = {
    up: '#00ff00',
    down: '#ff3333',
    unchanged: '#ffd700',
    background: '#181818',
    header: '#232323',
    text: '#e0e0e0',
    lightText: '#bdbdbd',
    border: '#333333',
  };

  const toggleSector = (sector) => {
    setExpandedSectors((prev) => ({ ...prev, [sector]: !prev[sector] }));
  };

  const handleSelectRow = (symbol) => {
    setSelectedSymbols((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const handleToggleFavourite = (symbol) => {
    setFavourites((prev) =>
      prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]
    );
  };

  const sortStocks = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'ascending' ? 'descending' : 'ascending';
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateMiniChart = (data, isUp) => {
    const width = 60;
    const height = 20;
    const padding = 2;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min === 0 ? 1 : max - min;
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * chartWidth + padding;
      const y = height - padding - ((value - min) / range) * chartHeight;
      return `${x},${y}`;
    }).join(' ');
    return (
      <svg width={width} height={height} className="mt-1">
        <polyline fill="none" stroke={isUp ? colors.up : colors.down} strokeWidth="1.5" points={points} />
      </svg>
    );
  };

  const filteredSectorData = useMemo(() => {
    let data = [...initialSectorData];

    if (activeTab === 'Favourite') {
      data = data
        .map(sector => ({
          ...sector,
          stocks: sector.stocks.filter(stock => favourites.includes(stock.symbol)),
        }))
        .filter(sector => sector.stocks.length > 0);
    }

    if (searchTerm.trim() !== '') {
      const lowerSearchTerm = searchTerm.trim().toLowerCase();
      data = data
        .map(sector => ({
          ...sector,
          stocks: sector.stocks.filter(stock => stock.symbol.toLowerCase().includes(lowerSearchTerm)),
        }))
        .filter(sector => sector.stocks.length > 0);
    }

    if (sortConfig.key) {
      data = data.map(sector => {
        const sortedStocks = [...sector.stocks].sort((a, b) => {
          if (sortConfig.key === 'symbol') {
            return sortConfig.direction === 'ascending' 
              ? a.symbol.localeCompare(b.symbol) 
              : b.symbol.localeCompare(a.symbol);
          } else {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            return sortConfig.direction === 'ascending' ? aValue - bValue : bValue - aValue;
          }
        });
        return { ...sector, stocks: sortedStocks };
      });
    }

    return data;
  }, [searchTerm, activeTab, favourites, sortConfig]);

  const allSymbolsInView = useMemo(() =>
    filteredSectorData.flatMap(sector => sector.stocks.map(stock => stock.symbol))
  , [filteredSectorData]);

  return (
    <>

      <div className="bg-[#181818] min-h-screen flex flex-col text-gray-200 font-sans">
        {/* Indices Bar */}
        <div className="overflow-x-auto whitespace-nowrap bg-[#232323] border-b border-[#333] sticky top-0 z-30 shadow-sm p-2">
          <div className="flex gap-4 px-2 py-1 min-w-max">
            {indices.map((idx) => {
              const isUp = idx.change > 0;
              const valueColor = idx.change === 0 ? colors.unchanged : isUp ? colors.up : colors.down;
              const percentColor = isUp ? colors.up : colors.down;
              return (
                <div key={idx.name} className="inline-block w-48 bg-[#181818] rounded border border-[#333] p-2 mx-1 hover:shadow-md transition-all duration-200 cursor-pointer">
                  <div className="flex justify-between text-gray-400 text-xs">
                    <span className="font-semibold text-white">{idx.name}</span>
                    <span className="text-gray-500">Closed</span>
                  </div>
                  <div className="flex items-baseline mt-1">
                    <span className="text-lg font-bold" style={{ color: valueColor }}>{idx.value.toFixed(2)}</span>
                    <span className="ml-2 text-sm" style={{ color: percentColor }}>
                      {isUp ? '+' : ''}{idx.change.toFixed(2)} ({idx.percent.toFixed(2)}%)
                    </span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Vol: {idx.volume}M | Val: {idx.valueBn}B
                  </div>
                  {generateMiniChart(idx.chartData, isUp)}
                  <div className="text-xs flex justify-between mt-1">
                    <span style={{ color: colors.up }}>↑ {idx.up}</span>
                    <span style={{ color: colors.down }}>↓ {idx.down}</span>
                    <span style={{ color: colors.unchanged }}>= {idx.unchanged}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 p-2 bg-[#232323] border-b border-[#333] sticky top-[96px] z-20 shadow-sm">
          <div className="relative flex-1 max-w-sm md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gray-500">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>
            <input
              className="bg-[#232323] rounded-lg pl-10 pr-3 py-1 text-sm text-gray-200 w-full border border-[#333] focus:border-blue-500 outline-none"
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-1 overflow-x-auto whitespace-nowrap py-1">
            {['HOSE', 'HNX', 'UPCOM', 'Favourite', 'Sectors', 'Futures', 'Covered Warrant', 'Bond'].map(tab => (
              <button
                key={tab}
                className={`px-3 py-1 rounded-lg text-xs font-semibold border transition ${
                  activeTab === tab 
                    ? 'bg-blue-700 text-white border-blue-500' 
                    : 'bg-[#232323] text-gray-200 border-[#333] hover:bg-[#333]'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="text-xs text-gray-400 ml-auto flex-shrink-0">
            {currentTime.toLocaleString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: true, 
              timeZone: 'Asia/Ho_Chi_Minh' 
            })} +07, {currentTime.toLocaleDateString()}
          </div>
        </div>

        {/* Main Table */}
        <div className="flex-1 overflow-x-auto bg-[#181818] p-2">
          <table className="min-w-max text-xs text-gray-200 border-separate border-spacing-y-1" style={{ width: '1800px' }}>
            <thead className="sticky top-[144px] z-10 bg-[#232323] text-gray-100 border-b border-[#333]">
              <tr>
                <th rowSpan="2" className="px-2 py-2 text-left font-semibold sticky left-0 z-20 bg-[#232323]" style={{ minWidth: 80 }}>Ticker</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold" style={{ color: vietcapColors.ceil }}>Ceil</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold" style={{ color: vietcapColors.ref }}>Ref</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold" style={{ color: vietcapColors.floor }}>Floor</th>
                <th colSpan="3" className="px-2 py-2 text-center font-semibold border-x border-[#333]">Foreign</th>
                <th colSpan="6" className="px-2 py-2 text-center font-semibold border-x border-[#333]">Ask</th>
                <th colSpan="4" className="px-2 py-2 text-center font-semibold border-x border-[#333]">Matched</th>
                <th colSpan="6" className="px-2 py-2 text-center font-semibold border-x border-[#333]">Bid</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold">Low</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold">High</th>
                <th rowSpan="2" className="px-2 py-2 text-right font-semibold">Avg</th>
              </tr>
              <tr>
                <th className="px-2 py-1 text-right font-semibold">Bought</th>
                <th className="px-2 py-1 text-right font-semibold">Sold</th>
                <th className="px-2 py-1 text-right font-semibold">Room</th>
                {/* Ask */}
                <th className="px-2 py-1 text-right font-semibold">Price 1</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 1</th>
                <th className="px-2 py-1 text-right font-semibold">Price 2</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 2</th>
                <th className="px-2 py-1 text-right font-semibold">Price 3</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 3</th>
                {/* Matched */}
                <th className="px-2 py-1 text-right font-semibold">T.Vol</th>
                <th className="px-2 py-1 text-right font-semibold">Price</th>
                <th className="px-2 py-1 text-right font-semibold">Vol</th>
                <th className="px-2 py-1 text-right font-semibold">%</th>
                {/* Bid */}
                <th className="px-2 py-1 text-right font-semibold">Price 1</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 1</th>
                <th className="px-2 py-1 text-right font-semibold">Price 2</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 2</th>
                <th className="px-2 py-1 text-right font-semibold">Price 3</th>
                <th className="px-2 py-1 text-right font-semibold">Vol 3</th>
              </tr>
            </thead>
            <tbody>
              {vietcapStocks.map(stock => (
                <tr key={stock.symbol} className="bg-[#181818] border-b border-[#333] hover:bg-[#232323]">
                  <td
                    className="px-2 py-1 font-bold text-left sticky left-0 z-10 bg-[#181818] cursor-pointer hover:underline"
                    style={{ color: '#ff3366', minWidth: 80 }}
                    onClick={() => navigate(`/company/${stock.symbol}`)}
                    title={`Xem thông tin ${stock.symbol}`}
                  >
                    {stock.symbol}
                  </td>
                  <td className="px-2 py-1 text-right" style={{ color: vietcapColors.ceil }}>{stock.ceil.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right" style={{ color: vietcapColors.ref }}>{stock.ref.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right" style={{ color: vietcapColors.floor }}>{stock.floor.toFixed(2)}</td>
                  {/* Foreign */}
                  <td className="px-2 py-1 text-right">{stock.foreign.bought.toLocaleString()}</td>
                  <td className="px-2 py-1 text-right">{stock.foreign.sold.toLocaleString()}</td>
                  <td className="px-2 py-1 text-right">{stock.foreign.room.toLocaleString()}</td>
                  {/* Ask */}
                  {stock.ask.map((a, i) => (
                    <React.Fragment key={i}>
                      <td className="px-2 py-1 text-right" style={{ color: getPriceColor(a.price, stock.ref) }}>{a.price.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right">{a.vol.toLocaleString()}</td>
                    </React.Fragment>
                  ))}
                  {/* Matched */}
                  <td className="px-2 py-1 text-right">{stock.matched.tvol.toLocaleString()}</td>
                  <td className="px-2 py-1 text-right" style={{ color: getPriceColor(stock.matched.price, stock.ref) }}>{stock.matched.price.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right">{stock.matched.vol.toLocaleString()}</td>
                  <td className="px-2 py-1 text-right" style={{ color: getPercentColor(stock.matched.percent) }}>
                    {stock.matched.percent > 0 ? '+' : ''}{stock.matched.percent.toFixed(1)}%
                  </td>
                  {/* Bid */}
                  {stock.bid.map((b, i) => (
                    <React.Fragment key={i}>
                      <td className="px-2 py-1 text-right" style={{ color: getPriceColor(b.price, stock.ref) }}>{b.price.toFixed(2)}</td>
                      <td className="px-2 py-1 text-right">{b.vol.toLocaleString()}</td>
                    </React.Fragment>
                  ))}
                  <td className="px-2 py-1 text-right">{stock.low.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right">{stock.high.toFixed(2)}</td>
                  <td className="px-2 py-1 text-right">{stock.avg.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Order Bar */}
        <div className="fixed bottom-0 left-0 w-full bg-[#232323] border-t border-[#333] flex items-center justify-between p-2 z-10 shadow-lg">
          <div className="flex items-center gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-green-700 transition">
              Buy
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-red-700 transition">
              Sell
            </button>
            <div className="ml-4 text-sm text-gray-200">
              Selected: {selectedSymbols.length} stocks
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="bg-[#181818] text-gray-200 px-3 py-1 rounded text-sm hover:bg-[#232323] border border-[#333]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline mr-1">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
              Order Book
            </button>
            <button className="bg-[#181818] text-gray-200 px-3 py-1 rounded text-sm hover:bg-[#232323] border border-[#333]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="inline mr-1">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              Portfolio
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MarketPage;