import React, { useState, useEffect } from 'react';
import Tabs from '../../Common/Tabs'; // Nếu bạn chưa có, tạo component Tabs đơn giản theo dạng tabs
import TimeframeFilter from '../../TopMovers/TimeframeFilter';
import MoversTable from '../../TopMovers/MoversTable';

import { strongDecreaseData } from '../../../data/strongDecreaseData';
import { breakoutData } from '../../../data/breakoutData';
import { vietcapRatedData } from '../../../data/vietcapRatedData';
import { strongIncreaseData } from '../../../data/strongIncreaseData';

const tabs = [
  { key: 'Vietcap', label: 'Vietcap Rated' },
  { key: 'Breakout', label: 'Breakout' },
  { key: 'StrongRise', label: 'Strong Rise' },
  { key: 'StrongDecline', label: 'Strong Decline' },
];

// Lọc theo sector
const filterBySector = (data, sector) => {
  if (sector === 'All' || !sector) return data;
  return data.filter((item) => item.sector === sector);
};

// Lọc theo timeframe + sector
const getTimeframeData = (data, timeframe, sector) => {
  const filteredBySector = filterBySector(data, sector);
  if (timeframe === 'All' || !timeframe) return filteredBySector;

  // Lọc theo trường timeframe trong data
  return filteredBySector.filter((item) => item.timeframe === timeframe);
};

const defaultColumns = [
  { key: 'symbol', label: 'Symbol' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: 'Change' },
  { key: 'volume', label: 'Volume' },
];

const vietcapColumns = [
  { key: 'symbol', label: 'Symbol' },
  { key: 'price', label: 'Price' },
  { key: 'change', label: 'Change' },
  { key: 'predictedReturn', label: 'Predicted Return' },
];

const TopMovers = () => {
  const [activeTab, setActiveTab] = useState('StrongDecline');
  const [activeTimeframe, setActiveTimeframe] = useState('Day');
  const [activeSector, setActiveSector] = useState('All');
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    let data;
    switch (activeTab) {
      case 'Vietcap':
        data = vietcapRatedData;
        break;
      case 'Breakout':
        data = breakoutData;
        break;
      case 'StrongRise':
        data = strongIncreaseData;
        break;
      case 'StrongDecline':
      default:
        data = strongDecreaseData;
    }

    const filteredData = getTimeframeData(data, activeTimeframe, activeSector);
    setCurrentData(filteredData);
  }, [activeTab, activeTimeframe, activeSector]);

  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 flex flex-col h-full shadow-lg border border-yellow-400/30 text-white font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
          Top Movers
        </h2>
        <span className="text-xs text-gray-400">Updated: {new Date().toLocaleTimeString()}</span>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Timeframe and Sector filter */}
      <TimeframeFilter
        activeTimeframe={activeTimeframe}
        setActiveTimeframe={setActiveTimeframe}
        activeSector={activeSector}
        setActiveSector={setActiveSector}
      />

      {/* Table */}
      <div className="mt-2 flex-1 overflow-y-auto rounded">
        <MoversTable
          data={currentData}
          columns={activeTab === 'Vietcap' ? vietcapColumns : defaultColumns}
          title={tabs.find((t) => t.key === activeTab)?.label || 'Top Movers'}
        />
      </div>
    </div>
  );
};

export default TopMovers;
