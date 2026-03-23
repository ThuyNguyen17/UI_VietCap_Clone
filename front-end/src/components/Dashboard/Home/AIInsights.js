import React from 'react';
import { featuredReportsData } from '../../../data/mockData';

const AIInsights = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-3 shadow-2xl border border-yellow-400/30 backdrop-blur-md text-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-700 mb-6">
        <h2 className="flex items-center text-xl font-bold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
          AI News
        </h2>
        <div className="flex items-center space-x-1 cursor-pointer text-sm text-blue-400 hover:underline">
          <span>See more</span>
        </div>
      </div>

      {/* Card List */}
      <div className="overflow-y-auto max-h-85 pr-1 custom-scrollbar space-y-2">
        {featuredReportsData.map((report, idx) => (
          <div
            key={idx}
            className="p-4 rounded-lg bg-[#2a2a2a] transition-colors duration-200 hover:bg-[#3a3a3a] border border-transparent hover:border-blue-400"
          >
            <div className="flex justify-between items-start">
              {/* Left Content */}
              <div className="flex-1">
                <div className="text-xs text-gray-400 font-medium mb-1 flex flex-wrap items-center gap-x-2">
                  <span className="uppercase tracking-wide text-blue-400">{report.category}</span>
                  <span className="text-yellow-400 font-bold">{report.company}</span>
                </div>
                <div className="text-white text-sm font-semibold leading-snug">
                  {report.title}
                </div>
              </div>

              {/* Date */}
              <div className="text-gray-500 text-xs whitespace-nowrap ml-4 shrink-0">
                {report.date}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AIInsights;
