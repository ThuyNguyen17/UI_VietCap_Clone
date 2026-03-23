import React from 'react';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex mb-3 border-b border-gray-700">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`relative px-3 py-2 text-sm font-medium ${
            activeTab === tab.key ? 'text-yellow-400' : 'text-gray-400 hover:text-white'
          }`}
        >
          {tab.label}
          {activeTab === tab.key && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[3px] bg-yellow-400 rounded-full"></span>
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
