import React from 'react';
import { FiFilter } from 'react-icons/fi';
import { upcomingEventsData } from '../../../data/mockData';

const UpcomingEvents = () => {
  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-3 shadow-2xl border border-yellow-400/30 backdrop-blur-md text-white h-full flex flex-col">
      <div className="flex justify-between items-center pb-3 border-b border-gray-700 mb-4">
        <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
          Upcoming Events
        </h2>
        <div className="flex items-center space-x-2">
          <span className="text-blue-400 text-sm cursor-pointer hover:underline">See more</span>
        </div>
      </div>
      <div className="text-[11px] text-gray-400 mb-2">*Filters allow for in-depth data searching</div>
      {/* List */}
      <div className="overflow-y-auto max-h-85 pr-1 custom-scrollbar space-y-2">
        {upcomingEventsData.map((event, idx) => (
          <div
            key={idx}
            className="bg-[#2a2a2a] hover:bg-[#333] transition-colors duration-200 rounded-xl p-3 flex flex-col gap-2 border border-[#23242A] hover:border-blue-400"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 aspect-square shrink-0 flex items-center justify-center bg-[#3a3a3a] rounded-lg text-white text-[13px] font-extrabold tracking-wider select-none shadow border border-gray-600 text-center leading-tight px-1">
                <span className="break-all whitespace-normal block text-center leading-tight">
                  {event.symbol}
                </span>
              </div>

              {/* Title & Type */}
              <div className="flex flex-col overflow-hidden">
                <span className="text-[11px] text-blue-300 font-medium uppercase tracking-wide truncate">
                  {event.type}
                </span>
                <span className="text-white font-semibold text-sm leading-snug break-words">
                  {event.title}
                </span>
              </div>
            </div>


            {/* Event Details */}
            <div className="flex flex-wrap text-[11px] text-gray-400 gap-x-4 gap-y-1">
              {event.lastTradingDate && (
                <span>
                  Last trading date:{" "}
                  <span className="text-white font-medium">{event.lastTradingDate}</span>
                </span>
              )}
              {event.maturityDate && (
                <span>
                  Maturity date:{" "}
                  <span className="text-white font-medium">{event.maturityDate}</span>
                </span>
              )}
              {event.publicDate && (
                <span>
                  Public date:{" "}
                  <span className="text-white font-medium">{event.publicDate}</span>
                </span>
              )}
              {event.exRightDate && (
                <span>
                  Ex-right date:{" "}
                  <span className="text-white font-medium">{event.exRightDate}</span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default UpcomingEvents;
