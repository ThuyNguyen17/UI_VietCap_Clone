import { useState, useRef } from "react";

const stockData = [
  {
    symbol: "SAB",
    owner: "SABECO",
    value: 46.6,
    amount: 48100,
    percentChange: 0.31,
  },
  {
    symbol: "VHC",
    owner: "VHC Corp",
    value: 43.8,
    amount: 45000,
    percentChange: 0.25,
  },
  {
    symbol: "MSN",
    owner: "Masan Group",
    value: 36.9,
    amount: 37500,
    percentChange: 0.15,
  },
  {
    symbol: "KDH",
    owner: "KDH Corp",
    value: 35.8,
    amount: 36200,
    percentChange: 0.12,
  },
  {
    symbol: "PTB",
    owner: "PTB Group",
    value: 35.7,
    amount: 36000,
    percentChange: 0.11,
  },
  {
    symbol: "BMI",
    owner: "BMI Corp",
    value: 30.2,
    amount: 30500,
    percentChange: 0.08,
  },
  {
    symbol: "IDC",
    owner: "IDC Holdings",
    value: 29.6,
    amount: 29800,
    percentChange: 0.07,
  },
];

const metrics = [
  "Profitability (%)",
  "Profit Growth (%)",
  "ROE (%)",
  "Yield (%)",
  "Other Metrics",
];

const TopForecastStocks = () => {
  const [activeMetric, setActiveMetric] = useState("Profitability (%)");
  const [hoveredSymbol, setHoveredSymbol] = useState(null);
  const tabsRef = useRef(null);

  const maxValue = Math.max(...stockData.map((item) => item.value));

  const handleScroll = (direction) => {
    if (tabsRef.current) {
      const scrollAmount = 100;
      tabsRef.current.scrollLeft +=
        direction === "right" ? scrollAmount : -scrollAmount;
    }
  };

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-6 h-full shadow-lg border border-yellow-400/30 text-white relative">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-6 bg-yellow-400 rounded-sm mr-3" />
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 tracking-wide">
          Top Forecast Stocks
        </h2>
      </div>
      {/* Metric Tabs with Navigation Buttons */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => handleScroll("left")}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-200 text-lg"
        >
          &lt;
        </button>
        <div
          ref={tabsRef}
          className="flex-1 flex overflow-x-hidden whitespace-nowrap"
        >
          {metrics.map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-4 py-2 text-sm md:text-base font-semibold rounded-lg transition-colors duration-200
                ${
                  activeMetric === metric
                    ? "bg-[#333] text-white"
                    : "bg-transparent text-gray-400 hover:text-white"
                }`}
            >
              {metric}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleScroll("right")}
          className="p-2 text-gray-400 hover:text-white transition-colors duration-200 text-lg"
        >
          &gt;
        </button>
      </div>

      {/* List of stocks */}
      <div className="space-y-4">
        {stockData.map((item, index) => (
          <div
            key={item.symbol}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredSymbol(item.symbol)}
            onMouseLeave={() => setHoveredSymbol(null)}
          >
            {/* Stock item bar */}
            <div className="flex items-center justify-between">
              <span className="w-12 text-sm text-gray-100 font-semibold">
                {item.symbol}
              </span>

              {/* Progress bar */}
              <div className="flex-1 mx-4 h-2 rounded-md bg-[#2d2d2d] overflow-hidden relative">
                <div
                  className={`h-full rounded-md transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-blue-600`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                />
              </div>

              <span className="w-12 text-right text-sm text-white font-semibold">
                {item.value.toFixed(1)}
              </span>
            </div>

            {/* Tooltip on hover */}
            {hoveredSymbol === item.symbol && (
              <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-[110%] bg-[#2d2d2d] text-white text-xs rounded-lg p-3 shadow-xl w-48 border border-gray-600 animate-fade-in">
                {/* Tooltip triangle */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-[#2d2d2d]" />

                <p className="font-bold text-lg mb-1">{item.symbol}</p>
                <div className="text-gray-400 text-sm flex justify-between mb-1">
                  <span>{item.owner}</span>
                  <span>{item.value.toFixed(1)}%</span>
                </div>
                <div className="text-gray-400 text-sm flex justify-between">
                  <span className="text-green-400">+{item.percentChange}%</span>
                  <span>{item.amount.toLocaleString()} VND</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopForecastStocks;