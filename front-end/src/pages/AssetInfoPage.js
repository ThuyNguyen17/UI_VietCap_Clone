import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const summary = {
  startAsset: 0,
  endAsset: 0,
  netDeposit: 0,
  totalPnL: 0,
  performance: 0,
};

const performanceData = [
  { date: "16/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,475.47", vnIndexChange: "+8.04%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "17/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,490.01", vnIndexChange: "+9.10%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "18/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,497.28", vnIndexChange: "+9.64%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "21/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,485.05", vnIndexChange: "+8.74%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "22/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,509.54", vnIndexChange: "+10.53%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "23/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,512.31", vnIndexChange: "+10.74%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "24/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,521.02", vnIndexChange: "+11.38%", in: 0, out: 0, deposit: 0, withdraw: 0 },
  { date: "25/07/2025", pnl: 0, performance: 0, netAsset: 0, vnIndex: "1,531.13", vnIndexChange: "+12.12%", in: 0, out: 0, deposit: 0, withdraw: 0 },
];

const chartData = {
  labels: performanceData.map((d) => d.date),
  datasets: [
    {
      label: "Hiệu suất tài sản",
      data: performanceData.map((_, i) => i * 2),
      borderColor: "#facc15",
      backgroundColor: "rgba(250, 204, 21, 0.1)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "VN-Index",
      data: [8.04, 9.1, 9.64, 8.74, 10.53, 10.74, 11.38, 12.12],
      borderColor: "#ccc",
      borderDash: [5, 5],
      tension: 0.4,
      fill: false,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { ticks: { color: "#ccc" } },
    y: { ticks: { color: "#ccc" } },
  },
  plugins: {
    legend: {
      labels: {
        color: "#facc15",
      },
    },
  },
};

export default function InvestmentDashboard() {
  return (
    <div className="bg-black min-h-screen text-white p-6 space-y-6">
      <h1 className="text-2xl font-bold text-yellow-400">Hiệu suất đầu tư</h1>

      <div className="bg-[#0f1a0f] p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Hiệu suất tài sản</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div><div className="text-gray-400 text-sm">Tài sản đầu kỳ</div><div>{summary.startAsset}</div></div>
          <div><div className="text-gray-400 text-sm">Tài sản cuối kỳ</div><div>{summary.endAsset}</div></div>
          <div><div className="text-gray-400 text-sm">Giá trị nộp/rút</div><div>{summary.netDeposit}</div></div>
          <div><div className="text-gray-400 text-sm">Tổng Lãi/Lỗ</div><div>{summary.totalPnL}</div></div>
          <div><div className="text-gray-400 text-sm">% Hiệu suất</div><div className="text-yellow-400 font-bold">{summary.performance}%</div></div>
        </div>
        <div className="h-[240px] mt-4">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="bg-[#111] rounded-lg shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="text-yellow-400 border-b border-gray-600">
            <tr>
              <th className="p-2">Ngày</th>
              <th>Lãi/Lỗ cuối ngày</th>
              <th>% Hiệu suất</th>
              <th>Tài sản ròng</th>
              <th>VN-Index % thay đổi</th>
              <th>GTCK nhập</th>
              <th>GTCK xuất</th>
              <th>Tiền nộp</th>
              <th>Tiền rút</th>
            </tr>
          </thead>
          <tbody>
            {performanceData.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-700 hover:bg-[#1e1e1e]">
                <td className="p-2">{row.date}</td>
                <td>{row.pnl}</td>
                <td>{row.performance}%</td>
                <td>{row.netAsset}</td>
                <td>{row.vnIndex} <span className="text-green-500">{row.vnIndexChange}</span></td>
                <td>{row.in}</td>
                <td>{row.out}</td>
                <td>{row.deposit}</td>
                <td>{row.withdraw}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}