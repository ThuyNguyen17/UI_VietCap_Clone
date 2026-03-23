import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LineChart, Line, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend, XAxis, YAxis } from 'recharts';
import {
  ChartCanvas, Chart, CandlestickSeries, XAxis as FXAxis, YAxis as FYAxis,
  MouseCoordinateX, MouseCoordinateY, OHLCTooltip,
  EdgeIndicator
} from 'react-financial-charts';
import { scaleTime } from "d3-scale";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";


// --- Mock Data for Multiple Tickers ---
const allMockData = {
  'VCB': {
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
    ],
    targetPricePoints: [
      { date: '11/2024', price: 73.50 },
      { date: '03/2025', price: 76.10 },
      { date: '05/2025', price: 73.20 },
    ],
    extendedRatioData: {
      dynamicRating: 'KQ',
      analystRating: 'MUA',
      targetPrice: 73.20,
      upside: 18.3,
      updateDate: '23/05/2025',
      analyst: 'Quan Vu',
      marketCap: '517,216',
      outstandingShares: '8,355,675,094',
      adt30: '398.2',
      stateOwnership: '74.8%',
      foreignOwnership: '22.1%',
      maxForeignOwnership: '30.0%',
      freeFloatRatio: '11.0%',
    },
    earningsData: {
      years: ['2022', '2023', '2024', '2025F', '2026F'],
      rows: [
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
      ],
    },
    researchReports: [
      { title: 'VCB [BUY +23.0%] - Best-in-class bank at attractive valuation - Update', date: '24 Feb 2025' },
      { title: 'VCB - Low credit costs support earnings; asset quality remains top tier - Earnings Flash', date: '03 Feb 2025' },
      { title: 'VCB [BUY +22.7%] - On the road of recovery - Update', date: '02 Dec 2024' },
      { title: 'VCB - Drop in provision expenses counteracts weak NIM - Earnings Flash', date: '31 Oct 2024' },
    ],
    majorShareholders: [
      { name: 'The State Bank Of Vietnam', shares: '6,250,338,579', rate: '74.80%', last: '17 Apr 2025' },
      { name: 'Mizuho Bank, Ltd.', shares: '1,253,366,534', rate: '15.00%', last: '28 Apr 2025' },
      { name: 'Gic Private Limited', shares: '139,593,639', rate: '1.67%', last: '28 Apr 2025' },
    ],
    subsidiaries: [
      { name: 'Foreign Trade Of Vietnam Bank Ltd.', type: 'Subsidiary', ownership: '100.00%' },
      { name: 'Vietcombank Financial Leasing Co.', type: 'Subsidiary', ownership: '100.00%' },
      { name: 'Money Transfer Company Limited', type: 'Subsidiary', ownership: '100.00%' },
    ],
  },
  'FPT': {
    ticker: 'FPT',
    exchange: 'HOSE',
    sector: 'TECHNOLOGY',
    name: 'FPT Corporation',
    price: 95500,
    priceChange: 1.2,
    pricePercent: 1.27,
    updated: '14:40 GMT+7',
    projectedTSR: 22.5,
    chartData: [
      { date: '08/2024', open: 90.00, high: 91.50, low: 89.00, close: 91.00 },
      { date: '09/2024', open: 91.00, high: 93.00, low: 90.50, close: 92.50 },
      { date: '10/2024', open: 92.00, high: 94.00, low: 91.50, close: 93.00 },
      { date: '11/2024', open: 93.00, high: 95.00, low: 92.00, close: 94.50 },
      { date: '12/2024', open: 94.00, high: 96.00, low: 93.50, close: 95.00 },
      { date: '01/2025', open: 95.00, high: 97.00, low: 94.00, close: 96.50 },
      { date: '02/2025', open: 96.00, high: 98.00, low: 95.00, close: 97.00 },
      { date: '03/2025', open: 97.00, high: 99.00, low: 96.00, close: 98.50 },
      { date: '04/2025', open: 98.00, high: 100.00, low: 97.00, close: 99.00 },
      { date: '05/2025', open: 99.00, high: 101.00, low: 98.00, close: 100.50 },
      { date: '06/2025', open: 100.00, high: 102.00, low: 99.00, close: 101.00 },
      { date: '07/2025', open: 101.00, high: 103.00, low: 100.00, close: 102.50 },
    ],
    targetPricePoints: [
      { date: '12/2024', price: 105.00 },
      { date: '04/2025', price: 108.00 },
    ],
    extendedRatioData: {
      dynamicRating: 'TANG',
      analystRating: 'BUY',
      targetPrice: 108.00,
      upside: 13.0,
      updateDate: '15/06/2025',
      analyst: 'Minh Le',
      marketCap: '76,500',
      outstandingShares: '800,000,000',
      adt30: '120.5',
      stateOwnership: '0.0%',
      foreignOwnership: '49.0%',
      maxForeignOwnership: '49.0%',
      freeFloatRatio: '51.0%',
    },
    earningsData: {
      years: ['2022', '2023', '2024', '2025F', '2026F'],
      rows: [
        { label: 'Revenue (bn VND)', values: ['35,000', '40,000', '45,000', '50,000', '55,000'] },
        { label: 'Revenue Growth (%)', values: ['15.0', '14.3', '12.5', '11.1', '10.0'] },
        { label: 'NPAT (bn VND)', values: ['5,000', '6,000', '7,000', '8,000', '9,000'] },
        { label: 'NPAT Growth (%)', values: ['20.0', '18.0', '16.7', '14.3', '12.5'] },
        { label: 'EPS (VND)', values: ['6,250', '7,500', '8,750', '10,000', '11,250'] },
        { label: 'EPS Growth (%)', values: ['18.0', '20.0', '16.7', '14.3', '12.5'] },
        { label: 'ROE (%)', values: ['25.0', '26.0', '27.0', '28.0', '29.0'] },
        { label: 'ROA (%)', values: ['8.0', '8.5', '9.0', '9.5', '10.0'] },
        { label: 'P/E (x)', values: ['18.0', '16.0', '14.5', '13.0', '12.0'] },
        { label: 'P/B (x)', values: ['4.5', '4.2', '4.0', '3.8', '3.6'] },
        { label: 'Dividend Yield (%)', values: ['1.5', '1.6', '1.7', '1.8', '1.9'] },
        { label: 'Stock Return (%)', values: ['22.5', '20.0', '18.0', '16.0', '15.0'] },
      ],
    },
    researchReports: [
      { title: 'FPT [BUY +15.0%] - Strong digital transformation growth - Update', date: '10 May 2025' },
      { title: 'FPT - AI and Cloud services drive strong earnings - Earnings Flash', date: '25 Apr 2025' },
    ],
    majorShareholders: [
      { name: 'Truong Gia Binh', shares: '50,000,000', rate: '6.25%', last: '01 Mar 2025' },
      { name: 'Foreign Funds', shares: '392,000,000', rate: '49.00%', last: '30 Jun 2025' },
    ],
    subsidiaries: [
      { name: 'FPT Software', type: 'Subsidiary', ownership: '100.00%' },
      { name: 'FPT Retail', type: 'Subsidiary', ownership: '60.00%' },
    ],
  },
  // Add more ticker data here (e.g., 'HPG', 'PNJ', 'GAS', 'MWG')
  // Example for VNINDEX30 (as an index, it might have slightly different data fields)
  'VNINDEX30': {
    ticker: 'VNINDEX30',
    exchange: 'HOSE',
    sector: 'INDEX',
    name: 'VN30 Index',
    price: 1350.25,
    priceChange: 8.75,
    pricePercent: 0.65,
    updated: '15:00 GMT+7',
    projectedTSR: 10.0, // Example for an index, might not be applicable
    chartData: [
      { date: '08/2024', open: 1250.00, high: 1260.00, low: 1240.00, close: 1255.00 },
      { date: '09/2024', open: 1255.00, high: 1270.00, low: 1250.00, close: 1265.00 },
      { date: '10/2024', open: 1265.00, high: 1280.00, low: 1260.00, close: 1275.00 },
      { date: '11/2024', open: 1275.00, high: 1290.00, low: 1270.00, close: 1285.00 },
      { date: '12/2024', open: 1285.00, high: 1300.00, low: 1280.00, close: 1295.00 },
      { date: '01/2025', open: 1295.00, high: 1310.00, low: 1290.00, close: 1305.00 },
      { date: '02/2025', open: 1305.00, high: 1320.00, low: 1300.00, close: 1315.00 },
      { date: '03/2025', open: 1315.00, high: 1330.00, low: 1310.00, close: 1325.00 },
      { date: '04/2025', open: 1325.00, high: 1340.00, low: 1320.00, close: 1335.00 },
      { date: '05/2025', open: 1335.00, high: 1350.00, low: 1330.00, close: 1345.00 },
      { date: '06/2025', open: 1345.00, high: 1360.00, low: 1340.00, close: 1355.00 },
      { date: '07/2025', open: 1355.00, high: 1370.00, low: 1350.00, close: 1365.00 },
    ],
    targetPricePoints: [], // Indexes might not have target prices
    extendedRatioData: { // Some of these might not apply to an index
      dynamicRating: 'Ổn định',
      analystRating: 'N/A',
      targetPrice: 1400.00,
      upside: 3.6,
      updateDate: '20/07/2025',
      analyst: 'Market View',
      marketCap: 'N/A',
      outstandingShares: 'N/A',
      adt30: 'N/A',
      stateOwnership: 'N/A',
      foreignOwnership: 'N/A',
      maxForeignOwnership: 'N/A',
      freeFloatRatio: 'N/A',
    },
    earningsData: { // Indexes won't have individual company earnings
      years: ['2022', '2023', '2024', '2025F', '2026F'],
      rows: [
        { label: 'Index Performance (%)', values: ['-5.0', '10.0', '15.0', '12.0', '10.0'] },
        // ... add other relevant index metrics
      ],
    },
    researchReports: [
      { title: 'VN30 Index Outlook Q3 2025 - Continued Growth', date: '01 Jul 2025' },
    ],
    majorShareholders: [], // Indexes don't have shareholders
    subsidiaries: [], // Indexes don't have subsidiaries
  },
};
// --- End Mock Data ---

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

  // State for the selected ticker
  const [selectedTicker, setSelectedTicker] = useState(symbol || 'VCB');

  // Derive data based on selectedTicker
  const data = allMockData[selectedTicker] || allMockData['VCB']; // Fallback to VCB if symbol not found
  const fullData = { ...data, ratio: { ...data.extendedRatioData } };

  const blockClasses = 'bg-[#0a0a0a] border border-[#222] rounded-lg shadow-md';

  // Update URL param when ticker changes
  useEffect(() => {
    if (symbol !== selectedTicker) {
      navigate(`/company/${selectedTicker}`, { replace: true });
    }
  }, [selectedTicker, symbol, navigate]);

  // Prepare data for charts (re-run when selectedTicker changes)
  const foreignFlowData = [-10, 5, -8, 12, -3, 7, 15, -6, 9, 2, -11, 10].map((v, i) => ({ // This data is static, consider making it dynamic per ticker
    name: `${i + 1}`,
    value: v,
  }));

  const ownershipPieData = [
    { name: 'State Ownership', value: parseFloat(fullData.ratio.stateOwnership) || 0, color: '#00e676' },
    { name: 'Foreign Ownership', value: parseFloat(fullData.ratio.foreignOwnership) || 0, color: '#4a90e2' },
    { name: 'Other', value: (100 - (parseFloat(fullData.ratio.stateOwnership) || 0) - (parseFloat(fullData.ratio.foreignOwnership) || 0)), color: '#ff4d4d' },
  ].filter(d => d.value > 0); // Filter out zero values for better pie chart rendering

  // Financial chart data preparation
  const toFinancialChartData = (data) => data.map(d => ({
    date: new Date(`01/${d.date}`), // Assuming 'date' is 'MM/YYYY'
    open: d.open,
    high: d.high,
    low: d.low,
    close: d.close,
  }));
  
  const financialChartData = toFinancialChartData(fullData.chartData);
  const xAccessor = d => d.date;
  const xScaleProvider = scaleTime();
  const tickFormat = timeFormat("%m/%Y");
  const initialXExtents = [financialChartData[0]?.date, financialChartData[financialChartData.length - 1]?.date];

  // Custom tooltip for line chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const currentData = payload[0].payload;
      const targetPrice = fullData.targetPricePoints.find(p => {
        const pDate = new Date(`01/${p.date}`);
        return pDate.getMonth() === currentData.date.getMonth() && pDate.getFullYear() === currentData.date.getFullYear();
      });

      return (
        <div className="bg-[#1a1a1a] border border-[#444] p-3 rounded-md shadow-lg text-sm text-white">
          <p className="font-bold mb-1">{timeFormat("%m/%Y")(currentData.date)}</p>
          <p>Mở cửa: <span className="text-gray-300">{currentData.open?.toFixed(2)}</span></p>
          <p>Cao nhất: <span className="text-gray-300">{currentData.high?.toFixed(2)}</span></p>
          <p>Thấp nhất: <span className="text-gray-300">{currentData.low?.toFixed(2)}</span></p>
          <p>Đóng cửa: <span className="text-gray-300">{currentData.close?.toFixed(2)}</span></p>
          {targetPrice && (
            <p>Giá mục tiêu: <span className="text-emerald-400">{targetPrice.price.toFixed(2)}</span></p>
          )}
          <p>% Tăng trưởng: <span className="text-emerald-400">{fullData.pricePercent}%</span></p>
        </div>
      );
    }
    return null;
  };

  const handleTickerChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  return (
    <>

      <div className="min-h-screen bg-black text-gray-300 font-sans">
        {/* Header */}
        <div className="px-8 pt-6 pb-4 border-b border-[#222] bg-[#0a0a0a]">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <select
                className="bg-[#1a1a1a] text-white px-3 py-2 pr-8 rounded-md font-bold text-lg outline-none border border-[#333] appearance-none cursor-pointer"
                value={selectedTicker}
                onChange={handleTickerChange}
              >
                {Object.keys(allMockData).map((ticker) => (
                  <option key={ticker} value={ticker}>
                    {ticker}
                  </option>
                ))}
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
            <div className={`md:col-span-2 ${blockClasses} p-6 relative shadow-lg rounded-xl bg-gradient-to-br from-[#101820] to-[#181a1b]`}>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-2xl text-white tracking-wide">Biểu Đồ Giá</span>
                <div className="flex items-center gap-2">
                  {/* Chart controls */}
                </div>
              </div>
              <div className="w-full h-80 flex items-end relative rounded-lg overflow-hidden bg-[#181a1b]">
                <ResponsiveContainer width="100%" height="100%">
                  <ChartCanvas
                    height={320}
                    ratio={1}
                    margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
                    seriesName={fullData.ticker}
                    data={financialChartData}
                    xAccessor={xAccessor}
                    xScale={xScaleProvider}
                    xExtents={initialXExtents}
                    style={{ background: '#181a1b' }}
                  >
                    <Chart id={1} yExtents={d => [d.high, d.low]}>
                      <FXAxis
                        showTicks
                        showGridLines
                        tickFormat={tickFormat}
                        stroke="#333"
                        tickStroke="#C4C4C4"
                        tickLabelFill="#C4C4C4"
                        outerTickSize={0}
                      />
                      <FYAxis
                        showTicks
                        showGridLines
                        tickFormat={format(".2f")}
                        stroke="#333"
                        tickStroke="#C4C4C4"
                        tickLabelFill="#C4C4C4"
                        outerTickSize={0}
                      />
                      <MouseCoordinateX
                        at="bottom"
                        orient="bottom"
                        displayFormat={tickFormat}
                        fill="#222"
                        textFill="#fff"
                      />
                      <MouseCoordinateY
                        at="right"
                        orient="right"
                        displayFormat={format(".2f")}
                        fill="#222"
                        textFill="#fff"
                      />
                      <CandlestickSeries
                        wickStroke={d => d.close > d.open ? "#32D74B" : "#FF2626"}
                        fill={d => d.close > d.open ? "#32D74B" : "#FF2626"}
                        stroke={d => d.close > d.open ? "#32D74B" : "#FF2626"}
                        candleStrokeWidth={1}
                        widthRatio={0.3}
                        opacity={1}
                      />
                      <EdgeIndicator
                        itemType="last"
                        orient="right"
                        edgeAt="right"
                        yAccessor={d => d.close}
                        fill={d => d.close > d.open ? "#32D74B" : "#FF2626"}
                        lineStroke={d => d.close > d.open ? "#32D74B" : "#FF2626"}
                        displayFormat={format(".2f")}
                        textFill="#fff"
                        fontSize={12}
                      />
                      <OHLCTooltip
                        origin={[8, 16]}
                        textFill="#fff"
                        labelFill="#aaa"
                        valueFill="#fff"
                        fontSize={14}
                      />
                    </Chart>
                  </ChartCanvas>
                </ResponsiveContainer>
              </div>
              <div className="flex gap-2 mt-4 justify-center">
                {['6M', 'YTD', '1Y', '2Y', '5Y', 'All'].map(t => (
                  <button
                    key={t}
                    className={`px-4 py-2 rounded-md text-xs font-semibold border transition-colors ${
                      t === '1Y'
                        ? 'bg-emerald-700 text-white border-emerald-500'
                        : 'bg-[#1a1a1a] text-gray-300 border-[#333] hover:bg-[#2a2a2a]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <div className="flex gap-4 mt-2 justify-center text-xs">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-emerald-400"></span> Tăng
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-3 h-3 rounded bg-red-400"></span> Giảm
                </div>
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
                  <span>Đánh giá động</span>
                  <span className="text-white font-medium">{fullData.ratio.dynamicRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chuyên viên đánh giá</span>
                  <span className="text-emerald-400 font-bold">{fullData.ratio.analystRating}</span>
                </div>
                <div className="flex justify-between"><span>Giá mục tiêu</span><span>{fullData.ratio.targetPrice?.toFixed(2) || 'N/A'}</span></div>
                <div className="flex justify-between items-center">
                  <span>Tăng trưởng</span>
                  <span className="text-emerald-400 font-bold relative">
                    {fullData.ratio.upside}%
                    <span className="absolute -right-5 top-1/2 -translate-y-1/2 text-blue-400">
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
                      {fullData.earningsData.years.map(y => (
                        <th key={y} className="px-3 py-2 text-center font-semibold">{y}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fullData.earningsData.rows.map(row => (
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
                  <LineChart data={fullData.chartData.slice(0, 8)}>
                    <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={{ fill: '#999', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <YAxis tick={{ fill: '#999', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} domain={['dataMin', 'dataMax']} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="close" stroke="#00e676" strokeWidth={2} dot={{ r: 3, fill: '#00e676' }} />
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
                {fullData.researchReports.map((r, i) => (
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
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={foreignFlowData}>
                    <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fill: '#999', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <YAxis tick={{ fill: '#999', fontSize: 12 }} axisLine={{ stroke: '#333' }} tickLine={false} />
                    <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #444', color: '#fff' }} />
                    <Bar dataKey="value">
                      {foreignFlowData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value >= 0 ? '#00e676' : '#ff4d4d'} opacity={0.8} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
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
                <ResponsiveContainer width="60%" height="100%">
                  <PieChart>
                    <Pie
                      data={ownershipPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      labelLine={false}
                      label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                    >
                      {ownershipPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
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
                    {fullData.majorShareholders.map((s, i) => (
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
                    {fullData.subsidiaries.map((s, i) => (
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
    </>
  );
};

export default CompanyOverviewPage;