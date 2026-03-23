import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockData = {
  ticker: 'VCB',
  exchange: 'HOSE',
  sector: 'BANKS',
  name: 'Vietcombank',
  price: 61900,
  priceChange: -0.5,
  pricePercent: 18.3,
  updated: '14:45 GMT+7',
  projectedTSR: 18.3,
  chartData: [
    { date: '08/2024', open: 58.60, high: 59.87, low: 58.60, close: 59.87 },
    { date: '09/2024', open: 59.00, high: 61.00, low: 58.50, close: 60.50 },
    { date: '10/2024', open: 60.00, high: 62.00, low: 59.50, close: 61.50 },
    { date: '11/2024', open: 61.00, high: 63.00, low: 60.00, close: 62.00 },
    { date: '12/2024', open: 62.00, high: 64.00, low: 61.00, close: 63.50 },
    { date: '01/2025', open: 63.00, high: 65.00, low: 62.00, close: 64.00 },
    { date: '02/2025', open: 64.00, high: 66.00, low: 63.00, close: 65.50 },
    { date: '03/2025', open: 65.00, high: 67.00, low: 64.00, close: 66.00 },
    { date: '04/2025', open: 66.00, high: 68.00, low: 65.00, close: 67.50 },
    { date: '05/2025', open: 67.00, high: 69.00, low: 66.00, close: 68.00 },
    { date: '06/2025', open: 68.00, high: 70.00, low: 67.00, close: 69.50 },
    { date: '07/2025', open: 69.00, high: 71.00, low: 68.00, close: 70.00 },
  ], // Simplified for demo, in real app this would be more detailed
  targetPricePoints: [
    { date: '11/2024', price: 73.50 },
    { date: '03/2025', price: 76.10 },
    { date: '05/2025', price: 73.20 },
  ]
};

const extendedRatioData = {
  dynamicRating: 'KQ', // Changed to match screenshot
  analystRating: 'MUA', // Changed to match screenshot
  targetPrice: 73.20,
  upside: 18.3,
  updateDate: '23/05/2025', // Changed format to match screenshot
  analyst: 'Quan Vu',
  marketCap: '517,216', // Changed to match screenshot
  outstandingShares: '8,355,675,094',
  adt30: '398.2', // Changed to match screenshot
  stateOwnership: '74.8%',
  foreignOwnership: '22.1%',
  maxForeignOwnership: '30.0%', // Added from screenshot
  freeFloatRatio: '11.0%', // Added from screenshot
};


// Định nghĩa các biến mock data cho các block
const earningsYears = ['2022', '2023', '2024', '2025F', '2026F'];
const earningsRows = [
  { label: 'Interest Income (bn VND)', values: ['63,000', '65,000', '67,000', '69,000', '71,000'] },
  { label: 'Interest Income Growth (%)', values: ['5.0', '3.2', '3.1', '3.0', '2.9'] },
  { label: 'NPAT-MI (bn VND)', values: ['20,000', '21,000', '22,000', '23,000', '24,000'] },
  { label: 'NPAT-MI Growth (%)', values: ['8.0', '5.0', '4.8', '4.5', '4.3'] },
  { label: 'EPS (VND)', values: ['5,000', '5,200', '5,400', '5,600', '5,800'] },
  { label: 'EPS Growth (%)', values: ['6.0', '4.0', '3.8', '3.7', '3.6'] },
  { label: 'ROE (%)', values: ['18.0', '17.5', '17.0', '16.5', '16.0'] },
  { label: 'ROA (%)', values: ['1.8', '1.7', '1.6', '1.5', '1.4'] },
  { label: 'P/E (x)', values: ['15.2', '14.8', '14.5', '14.2', '14.0'] },
  { label: 'P/B (x)', values: ['2.1', '2.0', '1.9', '1.8', '1.7'] },
  { label: 'Dividend Yield (%)', values: ['2.5', '2.6', '2.7', '2.8', '2.9'] },
  { label: 'Stock Return (%)', values: ['18.3', '17.0', '16.5', '16.0', '15.5'] },
];
const researchReports = [
  { title: 'VCB [BUY +23.0%] - Best-in-class bank at attractive valuation - Update', date: '24 Feb 2025' },
  { title: 'VCB - Low credit costs support earnings; asset quality remains top tier - Earnings Flash', date: '03 Feb 2025' },
  { title: 'VCB [BUY +22.7%] - On the road of recovery - Update', date: '02 Dec 2024' },
  { title: 'VCB - Drop in provision expenses counteracts weak NIM - Earnings Flash', date: '31 Oct 2024' },
];
const majorShareholders = [
  { name: 'The State Bank Of Vietnam', shares: '6,250,338,579', rate: '74.80%', last: '17 Apr 2025' },
  { name: 'Mizuho Bank, Ltd.', shares: '1,253,366,534', rate: '15.00%', last: '28 Apr 2025' },
  { name: 'Gic Private Limited', shares: '139,593,639', rate: '1.67%', last: '28 Apr 2025' },
];
const subsidiaries = [
  { name: 'Foreign Trade Of Vietnam Bank Ltd.', type: 'Subsidiary', ownership: '100.00%' },
  { name: 'Vietcombank Financial Leasing Co.', type: 'Subsidiary', ownership: '100.00%' },
  { name: 'Money Transfer Company Limited', type: 'Subsidiary', ownership: '100.00%' },
];

const tabList = [
  'Overview',
  'Compare',
  'Financials',
  'StockReturn',
  'Technicals',
  'Statistic',
  'News & Event',
];

const CompanyOverviewPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const data = { ...mockData, ticker: symbol || mockData.ticker };

  // Combine mockData with extendedRatioData
  const fullData = { ...data, ratio: { ...data.ratio, ...extendedRatioData } };

  // Define consistent styles for blocks to mimic Vietcap's dark theme
  const blockClasses = 'bg-[#0a0a0a] border border-[#222] rounded-lg shadow-md'; // Darker background, subtle border, rounded corners, subtle shadow

  // For Foreign Net Flow Chart (simple bar chart with positive/negative)
  const foreignFlowData = [
    -10, 5, -8, 12, -3, 7, 15, -6, 9, 2, -11, 10
  ]; // Example data, could be from mockData
  const minFlow = Math.min(...foreignFlowData);
  const maxFlow = Math.max(...foreignFlowData);
  const flowRange = maxFlow - minFlow;
  const zeroLineY = 150 - (0 - minFlow) / (flowRange || 1) * 150; // Y position of zero line

  // Data for Recharts Pie Chart (Ownership Structure)
  const pieChartData = [
    { name: 'State Ownership', value: parseFloat(fullData.ratio.stateOwnership) },
    { name: 'Foreign Ownership', value: parseFloat(fullData.ratio.foreignOwnership) },
    { name: 'Other', value: 100 - parseFloat(fullData.ratio.stateOwnership) - parseFloat(fullData.ratio.foreignOwnership) },
  ];
  const COLORS = ['#00e676', '#4a90e2', '#ff4d4d']; // Colors for State, Foreign, Other

  // Custom Tooltip for Recharts Line Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      return (
        <div className="bg-[#1a1a1a] border border-[#444] p-3 rounded-md shadow-lg text-sm text-white">
          <p className="font-bold mb-1">{label}</p>
          <p>Mở cửa: <span className="text-gray-300">{currentData.open.toFixed(2)}</span></p>
          <p>Cao nhất: <span className="text-gray-300">{currentData.high.toFixed(2)}</span></p>
          <p>Thấp nhất: <span className="text-gray-300">{currentData.low.toFixed(2)}</span></p>
          <p>Đóng cửa: <span className="text-gray-300">{currentData.close.toFixed(2)}</span></p>
          {fullData.targetPricePoints.find(p => p.date === label) && (
            <p>Giá mục tiêu: <span className="text-emerald-400">{fullData.targetPricePoints.find(p => p.date === label).price.toFixed(2)}</span></p>
          )}
          <p>% Tăng trưởng: <span className="text-emerald-400">{fullData.pricePercent}%</span></p>
        </div>
      );
    }
    return null;
  };

  // Custom Dot for Recharts Line Chart to show target prices
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const isTargetPoint = fullData.targetPricePoints.some(p => p.date === payload.date);

    if (isTargetPoint) {
      const targetPrice = fullData.targetPricePoints.find(p => p.date === payload.date).price;
      return (
        <g>
          <line x1={cx} y1={cy} x2={cx} y2={cy - 20} stroke="#00e676" strokeWidth="1" />
          <circle cx={cx} cy={cy} r={5} fill="#00e676" stroke="#00e676" strokeWidth="2" />
          <text x={cx} y={cy - 25} fill="#00e676" fontSize="12" textAnchor="middle" className="font-semibold">
            {targetPrice.toFixed(2)}
          </text>
        </g>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-sans">
      {/* Header */}
      <div className="px-8 pt-6 pb-4 border-b border-[#222] bg-[#0a0a0a]">
        <div className="flex items-center gap-4 mb-2">
          {/* Ticker Selector/Input - Mimicking Vietcap's style */}
          <div className="relative">
            <select className="bg-[#1a1a1a] text-white px-3 py-2 pr-8 rounded-md font-bold text-lg outline-none border border-[#333] appearance-none cursor-pointer">
              <option>{fullData.ticker}</option>
              {/* Add more options here if needed for a real dropdown */}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" /></svg>
            </div>
          </div>
          <span className="bg-[#1a1a1a] text-xs px-3 py-1 rounded-md font-semibold text-blue-400 border border-[#333]">{fullData.exchange}</span>
          <span className="text-xs text-gray-500">•</span>
          <span className="bg-[#1a1a1a] text-xs px-3 py-1 rounded-md font-semibold text-emerald-400 border border-[#333]">{fullData.sector}</span>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-4xl font-extrabold text-white">{fullData.name}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-extrabold text-white">{fullData.price.toLocaleString()}</span>
            <span className="text-lg text-gray-400 font-semibold">VND</span>
            <span className="text-2xl font-bold ml-2" style={{ color: fullData.priceChange < 0 ? '#ff4d4d' : '#00e676' }}>
              {fullData.priceChange > 0 ? '+' : ''}{fullData.priceChange}
            </span>
            <span className="text-lg font-bold" style={{ color: fullData.priceChange < 0 ? '#ff4d4d' : '#00e676' }}>
              ({fullData.pricePercent > 0 ? '+' : ''}{fullData.pricePercent}%)
            </span>
          </div>
        </div>
        {/* Adjusted layout for updated info */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-2 text-sm text-gray-500">
          <div>Updated at {fullData.updated}</div>
          <div>Vietcap Projected TSR: <span className="text-emerald-400 font-semibold">{fullData.projectedTSR}%</span></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 px-8 pt-2 pb-1 border-b border-[#222] bg-[#0a0a0a]">
        {tabList.map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 text-base font-semibold rounded-t-lg border-b-2 transition-colors duration-200 ${
              tab === 'Overview'
                ? 'border-emerald-500 text-emerald-400 bg-[#1a1a1a]'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-[#1a1a1a]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-8 px-8 py-8 bg-black">
        {/* Chart & Ratio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Chart section */}
          <div className={`md:col-span-2 ${blockClasses} p-6 relative`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Biểu Đồ</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-md bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M8 3a.5.5 0 0 1 .5.5v5h4a.5.5 0 0 1 0 1h-4.5a.5.5 0 0 1-.5-.5v-5A.5.5 0 0 1 8 3z" />
                  </svg>
                </button>
                <button className="p-2 rounded-md bg-[#1a1a1a] border border-[#333] text-gray-400 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9A1.5 1.5 0 0 1 14.5 14h-13A1.5 1.5 0 0 1 0 12.5v-9zM7 5H2v7h5V5zm2 0h5v7H9V5z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fullData.chartData}
                  margin={{
                    top: 20, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis
                    dataKey="date"
                    stroke="#999"
                    tick={{ fill: '#999', fontSize: 12 }}
                    axisLine={{ stroke: '#333' }}
                    tickLine={{ stroke: '#333' }}
                  />
                  <YAxis
                    stroke="#999"
                    tick={{ fill: '#999', fontSize: 12 }}
                    axisLine={{ stroke: '#333' }}
                    tickLine={{ stroke: '#333' }}
                    domain={['dataMin', 'dataMax']} // Automatically adjust y-axis range
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#555', strokeWidth: 1, strokeDasharray: '3 3' }} />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#00e676"
                    strokeWidth={2}
                    dot={<CustomDot />}
                    activeDot={{ r: 6, fill: '#00e676', stroke: '#00e676', strokeWidth: 2 }}
                  />
                  {/* Current price line (horizontal) */}
                  {fullData.chartData.length > 0 && (
                    <Line
                      type="monotone"
                      dataKey="close"
                      stroke="#00e676"
                      strokeWidth={1}
                      strokeDasharray="5 5"
                      dot={false}
                      activeDot={false}
                      data={[{ close: fullData.chartData[fullData.chartData.length - 1].close, date: fullData.chartData[fullData.chartData.length - 1].date }]}
                    />
                  )}
                  {fullData.chartData.length > 0 && (
                    <text
                      x="98%"
                      y={50} // Adjust this based on your chart's Y-axis scale and position
                      fill="#00e676"
                      fontSize="14"
                      textAnchor="end"
                      className="font-bold"
                    >
                      {fullData.chartData[fullData.chartData.length - 1].close.toFixed(2)}
                    </text>
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {['6M', 'YTD', '1Y', '2Y', '5Y', 'All'].map(t => (
                <button key={t} className={`px-4 py-2 rounded-md text-xs font-semibold ${t === '1Y' ? 'bg-emerald-700 text-white' : 'bg-[#1a1a1a] text-gray-300 border border-[#333] hover:bg-[#2a2a2a]'} transition-colors`}>{t}</button>
              ))}
            </div>
          </div>
          {/* Ratio section */}
          <div className={`${blockClasses} p-6 flex-shrink-0`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Chỉ Số</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>Đánh giá động
                  <span className="ml-1 text-gray-500 cursor-pointer" title="Thông tin đánh giá động">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.065-1.192 1.99.012.756.347 1.079.676 1.079.672 0 1.036-.037 1.09-.08.659-.059 1.184-.175 1.237-.272v.443c-.095.042-.45.14-.99.145-.58.005-1.225-.095-1.745-.315A2.581 2.581 0 0 1 7.5 12.5c-1.375 0-2.23-.96-2.23-2.35 0-.93.626-1.456 1.731-2.112z" />
                    </svg>
                  </span>
                </span>
                <span className="text-white font-medium">{fullData.ratio.dynamicRating}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Chuyên viên đánh giá
                  <span className="ml-1 text-gray-500 cursor-pointer" title="Thông tin chuyên viên đánh giá">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.065-1.192 1.99.012.756.347 1.079.676 1.079.672 0 1.036-.037 1.09-.08.659-.059 1.184-.175 1.237-.272v.443c-.095.042-.45.14-.99.145-.58.005-1.225-.095-1.745-.315A2.581 2.581 0 0 1 7.5 12.5c-1.375 0-2.23-.96-2.23-2.35 0-.93.626-1.456 1.731-2.112z" />
                    </svg>
                  </span>
                </span>
                <span className="text-emerald-400 font-bold">{fullData.ratio.analystRating}</span>
              </div>
              <div className="flex justify-between"><span>Giá mục tiêu</span><span>{fullData.ratio.targetPrice.toFixed(2)}</span></div>
              <div className="flex justify-between items-center">
                <span>Tăng trưởng</span>
                <span className="text-emerald-400 font-bold relative">
                  {fullData.ratio.upside}%
                  <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-400">
                    {/* Sparkle Icon - using a simple SVG for demonstration */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0c-.663 0-1 2.4-1 3.5-.544.757-1.31 1.232-1.928 1.408C4.516 5.095 4 5.5 4 6c0 1.1.9 2 2 2 .5 0 .905.516 1.092 1.072.176.618.651 1.384 1.408 1.928C10.6 11 13 11 13 11V8s-2.4-.663-3.5-1c-.757-.544-1.232-1.31-1.408-1.928C5.095 4.516 5.5 4 6 4c1.1 0 2-.9 2-2V0z" />
                    </svg>
                  </span>
                </span>
              </div>
              <div className="flex justify-between"><span>Ngày cập nhật</span><span>{fullData.ratio.updateDate}</span></div>
              <div className="flex justify-between"><span>Chuyên viên</span><span>{fullData.ratio.analyst}</span></div>
              <div className="flex justify-between"><span>Vốn hóa (tỷ VND)</span><span>{fullData.ratio.marketCap}</span></div>
              <div className="flex justify-between"><span>Số cp lưu hành</span><span>{fullData.ratio.outstandingShares}</span></div>
              <div className="flex justify-between"><span>GTGTDTB 30 phiên</span><span>{fullData.ratio.adt30}</span></div>
              <div className="flex justify-between"><span>Sở hữu nhà nước</span><span>{fullData.ratio.stateOwnership}</span></div>
              <div className="flex justify-between"><span>Sở hữu nước ngoài</span><span>{fullData.ratio.foreignOwnership}</span></div>
              <div className="flex justify-between"><span>Sở hữu nước ngoài tối đa</span><span>{fullData.ratio.maxForeignOwnership}</span></div>
              <div className="flex justify-between"><span>Tỷ lệ tự do chuyển đổi</span><span>{fullData.ratio.freeFloatRatio}</span></div>
            </div>
          </div>
        </div>

        {/* Earnings & Compare */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Earnings */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Earnings</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-300 border-separate border-spacing-y-1">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="px-3 py-2 text-left font-semibold rounded-tl-md rounded-bl-md"> </th>
                    {earningsYears.map(y => (
                      <th key={y} className="px-3 py-2 text-center font-semibold">{y}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {earningsRows.map(row => (
                    <tr key={row.label} className="hover:bg-[#1a1a1a] transition-colors duration-150">
                      <td className="px-3 py-2 text-left text-gray-400">{row.label}</td>
                      {row.values.map((v, i) => (
                        <td key={i} className="px-3 py-2 text-center font-mono">{v}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Compare */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Compare</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="flex gap-2 mb-4">
              <button className="px-4 py-2 rounded-md bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-600 transition-colors">P/E - TTM</button>
              <button className="px-4 py-2 rounded-md bg-[#1a1a1a] text-gray-300 text-xs font-semibold border border-[#333] hover:bg-[#2a2a2a] transition-colors">P/B - TTM</button>
            </div>
            <div className="w-full h-48 flex items-end">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={fullData.chartData.slice(0, 8)} // Example: using a subset of data for compare chart
                  margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Line type="monotone" dataKey="close" stroke="#00e676" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {['6M', 'YTD', '1Y', '2Y', '5Y', 'All'].map(t => (
                <button key={t} className="px-3 py-1 rounded-md bg-[#1a1a1a] text-gray-300 text-xs font-semibold border border-[#333] hover:bg-[#2a2a2a] transition-colors">{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Research Reports & Foreign Net Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Research Reports */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Research Reports</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <ul className="divide-y divide-[#333] max-h-56 overflow-y-auto custom-scrollbar pr-2">
              {researchReports.map((r, i) => (
                <li key={i} className="py-3 flex flex-col">
                  <span className="text-base text-white truncate">{r.title}</span>
                  <span className="text-xs text-blue-400 cursor-pointer hover:underline">Company Research</span>
                  <span className="text-xs text-gray-500 mt-1">{r.date}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 mt-4 text-xs">
              <span className="text-gray-500">Showing</span>
              <select className="bg-[#1a1a1a] border border-[#333] text-gray-300 rounded px-2 py-1 outline-none appearance-none cursor-pointer">
                <option>10</option>
              </select>
              <span className="text-gray-500">reports</span>
              <span className="ml-auto text-gray-500">1 2 3 ... 10</span>
            </div>
          </div>
          {/* Foreign Net Flow */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Foreign Net Flow (USD)</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="w-full h-48 flex items-end relative">
              <svg width="100%" height="100%" viewBox="0 0 400 150" className="w-full h-full">
                {/* Zero Line */}
                <line x1="0" y1={zeroLineY} x2="400" y2={zeroLineY} stroke="#444" strokeWidth="0.5" strokeDasharray="2,2" />

                {/* Bars */}
                {foreignFlowData.map((value, i) => {
                  const barWidth = 20;
                  const gap = (400 - (barWidth * foreignFlowData.length)) / (foreignFlowData.length + 1);
                  const x = gap + i * (barWidth + gap);
                  const barHeight = Math.abs((value / (Math.max(Math.abs(minFlow), Math.abs(maxFlow)) || 1)) * (150 - zeroLineY)); // Scale from zero line
                  const y = value >= 0 ? zeroLineY - barHeight : zeroLineY;

                  return (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width={barWidth}
                      height={barHeight}
                      fill={value >= 0 ? '#00e676' : '#ff4d4d'}
                      opacity="0.8"
                    />
                  );
                })}
              </svg>
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {['6M', 'YTD', '1Y', '2Y', '5Y', 'All'].map(t => (
                <button key={t} className="px-3 py-1 rounded-md bg-[#1a1a1a] text-gray-300 text-xs font-semibold border border-[#333] hover:bg-[#2a2a2a] transition-colors">{t}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Ownership Structure & Major Shareholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ownership Structure */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Ownership Structure</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="flex items-center justify-center h-48 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={0} // No gap between slices
                    dataKey="value"
                    labelLine={false}
                    // Optional: label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value.toFixed(1)}%`, name]} />
                  <Legend
                    verticalAlign="middle"
                    align="right"
                    layout="vertical"
                    wrapperStyle={{ right: -20, top: '10%' }} // Adjust legend position
                    formatter={(value, entry) => (
                        <span style={{ color: entry.color }}>
                            {entry.payload.name}: {entry.payload.value.toFixed(1)}%
                        </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Major Shareholders */}
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Major Shareholders</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-300 border-separate border-spacing-y-1">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="px-3 py-2 text-left font-semibold rounded-tl-md rounded-bl-md">Shareholder</th>
                    <th className="px-3 py-2 text-center font-semibold">Shares</th>
                    <th className="px-3 py-2 text-center font-semibold">Rate</th>
                    <th className="px-3 py-2 text-center font-semibold">Last Change</th>
                  </tr>
                </thead>
                <tbody>
                  {majorShareholders.map((s, i) => (
                    <tr key={i} className="hover:bg-[#1a1a1a] transition-colors duration-150">
                      <td className="px-3 py-2 text-left text-gray-400">{s.name}</td>
                      <td className="px-3 py-2 text-center font-mono">{s.shares}</td>
                      <td className="px-3 py-2 text-center font-mono">{s.rate}</td>
                      <td className="px-3 py-2 text-center font-mono">{s.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Subsidiaries */}
        <div className="grid grid-cols-1">
          <div className={`${blockClasses} p-6`}>
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-xl text-white">Subsidiaries</span>
              <span className="text-sm text-gray-500 cursor-pointer hover:text-white">&gt;</span>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-300 border-separate border-spacing-y-1">
                <thead>
                  <tr className="bg-[#1a1a1a]">
                    <th className="px-3 py-2 text-left font-semibold rounded-tl-md rounded-bl-md">Name</th>
                    <th className="px-3 py-2 text-center font-semibold">Type</th>
                    <th className="px-3 py-2 text-center font-semibold">Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {subsidiaries.map((s, i) => (
                    <tr key={i} className="hover:bg-[#1a1a1a] transition-colors duration-150">
                      <td className="px-3 py-2 text-left text-gray-400">{s.name}</td>
                      <td className="px-3 py-2 text-center font-mono">{s.type}</td>
                      <td className="px-3 py-2 text-center font-mono">{s.ownership}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyOverviewPage;