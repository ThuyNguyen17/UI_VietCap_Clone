import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import Header from '../components/Header/Header';

const mockChartData = [
  { date: '2025-07-01', price: 60 },
  { date: '2025-07-02', price: 62 },
  { date: '2025-07-03', price: 59 },
  { date: '2025-07-04', price: 61 },
  { date: '2025-07-05', price: 64 },
  { date: '2025-07-06', price: 63 },
  { date: '2025-07-07', price: 66 },
];

const stockInfo = {
  ticker: 'VCB',
  exchange: 'HOSE',
  name: 'Vietcombank',
  sector: 'BANKS',
  price: 61900,
  priceChange: -0.5,
  pricePercent: -0.81,
  updated: '14:45 GMT+7',
  projectedTSR: 18.3,
};

export default function StockChartPage() {
  const priceColor = stockInfo.priceChange > 0 ? 'text-green-400' : 'text-red-400';
  const PriceArrow = stockInfo.priceChange > 0 ? FaArrowUp : FaArrowDown;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-8 px-4">
        <div className="bg-[#1e1e1e] rounded-2xl shadow-lg p-6 max-w-4xl mx-auto text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">{stockInfo.name} ({stockInfo.ticker})</h1>
              <p className="text-sm text-gray-400">{stockInfo.exchange} - {stockInfo.sector}</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-semibold ${priceColor}`}>
                {stockInfo.price.toLocaleString()} <PriceArrow className="inline ml-1" />
              </p>
              <p className={`text-sm ${priceColor}`}>
                {stockInfo.priceChange} ({stockInfo.pricePercent}%)
              </p>
              <p className="text-xs text-gray-500">Updated: {stockInfo.updated}</p>
            </div>
          </div>

          {/* Chart */}
          <div className="w-full h-72 bg-[#121212] rounded-xl p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="date" stroke="#aaa" />
                <YAxis stroke="#aaa" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#2d2d2d',
                    borderRadius: '8px',
                    border: 'none',
                  }}
                  labelStyle={{ color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="price" stroke="#4f46e5" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* TSR Info */}
          <div className="mt-6 flex justify-between text-sm text-gray-400">
            <span>Dự phóng TSR:</span>
            <span className="font-bold text-blue-400">{stockInfo.projectedTSR}%</span>
          </div>
        </div>
      </div>
    </>
  );
}
