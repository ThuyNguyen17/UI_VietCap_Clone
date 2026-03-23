import React, { useState, useRef, useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const RatingStructure = ({
  labels = ['BUY', 'HOLD', 'PARTIAL PAY', 'NO RESULT', 'SELL'],
  values = [31.3, 30.0, 26.3, 3.8, 8.6],
  backgroundColors = ['#22c55e', '#16a34a', '#facc15', '#f97316', '#dc2626'],
  totalStocks = 80,
  topStocks = {
    BUY: [{ code: 'AAA', change: '+10.2%' }, { code: 'BBB', change: '+9.8%' }, { code: 'CCC', change: '+8.7%' }],
    HOLD: [{ code: 'TLG', change: '+19.1%' }, { code: 'PLX', change: '+18.6%' }, { code: 'QNS', change: '+18.4%' }],
    'PARTIAL PAY': [{ code: 'PVT', change: '+9.7%' }, { code: 'HDG', change: '+9.6%' }, { code: 'SCS', change: '+9.4%' }],
    'NO RESULT': [{ code: 'GGG', change: '+2.1%' }, { code: 'HHH', change: '+1.8%' }, { code: 'III', change: '+1.5%' }],
    SELL: [{ code: 'XYZ', change: '-5.6%' }, { code: 'ZXC', change: '-6.1%' }, { code: 'QWE', change: '-7.3%' }],
  }
}) => {
  const chartRef = useRef(null);
  const [tooltip, setTooltip] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    label: '',
    value: 0,
    color: '',
    stocks: [],
  });

  const labelPositions = useMemo(() => {
    const centerX = 130;
    const centerY = 140; // Push chart down
    const radius = 150; // Push legends farther out
    let accAngle = 0;

    return values.map((value) => {
      const sliceAngle = (value / 100) * 2 * Math.PI;
      const midAngle = accAngle + sliceAngle / 2 - Math.PI / 2;
      // Trừ Math.PI/2 để bắt đầu từ 12h thay vì 3h
      accAngle += sliceAngle;

      const offset = 20; // khoảng cách đẩy ra ngoài (tăng nếu muốn xa hơn)
      const x = centerX + (radius + offset) * Math.cos(midAngle);
      const y = centerY + (radius + offset) * Math.sin(midAngle);

      return { x, y };
    });
  }, [values]);

  const options = {
    cutout: '65%',
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
      easing: 'easeOutQuart',
    },
    onHover: (event, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        const dataIndex = element.index;

        setTooltip({
          visible: true,
          position: {
            x: event.native.clientX,
            y: event.native.clientY - 10,
          },
          label: labels[dataIndex],
          value: values[dataIndex],
          color: backgroundColors[dataIndex],
          stocks: topStocks[labels[dataIndex]] || [],
        });
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: backgroundColors,
        borderColor: '#1a1a1a',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 h-full shadow-inner text-white relative border border-yellow-400/30 select-none">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
          Dynamic Rating Structure
        </h2>
      </div>

      {/* Chart container */}
      <div className="relative w-64 h-64 mx-auto select-none mt-16">
        <Doughnut ref={chartRef} data={data} options={options} />

        {/* Total stocks in center */}
        <div
          className="absolute top-1/2 left-1/2 text-center pointer-events-none select-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <p className="text-white text-4xl font-extrabold">{totalStocks}</p>
          <p className="text-gray-400 text-sm uppercase tracking-wide">Stocks</p>
        </div>

        {/* Legends positioned around the chart */}
        {labelPositions.map((pos, idx) => (
          <div
            key={idx}
            className="absolute text-center cursor-default select-none"
            style={{
              left: pos.x,
              top: pos.y,
              transform: 'translate(-50%, -70%)',
              color: backgroundColors[idx],
              fontSize: '12px',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            <div>{labels[idx]}</div>
            <div>{values[idx]}%</div>
          </div>
        ))}

      </div>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="z-50 pointer-events-none fixed bg-[#232323] text-white rounded-lg p-4 shadow-lg border-2"
          style={{
            top: tooltip.position.y,
            left: tooltip.position.x,
            borderColor: tooltip.color,
            minWidth: 220,
            transform: 'translate(-50%, -110%)',
            whiteSpace: 'normal',
            fontSize: 14,
            lineHeight: 1.3,
          }}
        >
          <div className="flex items-center mb-2">
            <span
              className="inline-block w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: tooltip.color }}
            />
            <span className="font-semibold text-lg">{tooltip.label}</span>
            <span className="ml-2 text-gray-400 text-sm">
              {Math.round((tooltip.value / 100) * totalStocks)} stocks ({tooltip.value}%)
            </span>
          </div>
          <hr className="border-gray-700 mb-2" />
          <div className="font-medium mb-1">Top 3 tickers</div>
          <ul className="list-none p-0 m-0">
            {tooltip.stocks.map((s, i) => {
              const changeColor = s.change.startsWith('+') ? '#22c55e' : '#dc2626';
              return (
                <li
                  key={s.code}
                  className="flex justify-between mb-1"
                  style={{ fontWeight: 500 }}
                >
                  <span>
                    <span className="font-bold mr-1">{i + 1}.</span> {s.code}
                  </span>
                  <span style={{ color: changeColor }}>{s.change}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RatingStructure;
