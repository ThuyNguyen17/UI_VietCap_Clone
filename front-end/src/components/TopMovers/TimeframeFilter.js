import React from 'react';

const TimeframeFilter = ({ activeTimeframe, setActiveTimeframe, activeSector, setActiveSector }) => {
  const timeframes = ['Day', 'Week', 'Month'];
  const sectors = ['All', 'Finance', 'Tech', 'Consumer', 'Energy'];

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Filter timeframe */}
      <div className="flex space-x-1 bg-[#2a2a2a] p-1 rounded-md">
        {timeframes.map((tf) => (
          <button
            key={tf}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              activeTimeframe === tf
                ? 'bg-gray-700 text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
            }`}
            onClick={() => setActiveTimeframe(tf)}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Filter sector */}
      <div className="relative">
        <select
          value={activeSector}
          onChange={(e) => setActiveSector(e.target.value)}
          className="appearance-none bg-[#1a1a1a] border border-gray-700 text-white text-xs rounded-md px-3 py-1 pr-7 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector}>
              {sector === 'All' ? 'All Sectors' : sector}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
          <svg className="fill-current h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TimeframeFilter;
