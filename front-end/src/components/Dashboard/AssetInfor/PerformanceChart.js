import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
  labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  datasets: [
    {
      label: 'Giá cổ phiếu (VND)',
      data: [72000, 73000, 74000, 72500, 73500, 74500, 73000],
      borderColor: '#4f46e5',
      backgroundColor: 'rgba(79, 70, 229, 0.2)',
      tension: 0.3,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
};

export default function PerformanceChart() {
  return <Line data={data} options={options} />;
}
