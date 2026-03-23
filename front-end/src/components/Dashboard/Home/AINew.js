import React, { useState } from "react";
import AIInsightCardItem from "../News/AIInsightCardItem";
import AINewsCardItem from "../News/AINewsCardItem";
import { aiNewsData } from "../../../data/mockData";
import { FiFilter } from "react-icons/fi";
import Tabs from "../../Common/Tabs";

const tabs = [
  { key: "featuredStock", label: "Featured Stock" },
  { key: "hotNew", label: "Hot News" },
];

const AINew = () => {
  const [activeTab, setActiveTab] = useState("featuredStock");

  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-3 shadow-2xl border border-yellow-400/30 backdrop-blur-md text-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center pb-3">
        <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span> AI New
        </h2>
        <div className="flex items-center space-x-2">
          <FiFilter className="text-gray-400 text-xl cursor-pointer" />
          <a
            href="/news"
            className="text-blue-400 text-sm hover:underline cursor-pointer"
          >
            See more
          </a>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex-shrink-0">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <select
          className="bg-gray-700 text-white text-sm py-1 px-3 rounded-md border border-gray-600 cursor-pointer h-8"
          aria-label="Select AI model"
          onChange={(e) => console.log("Selected AI model:", e.target.value)}
          defaultValue="vietcap"
        >
          <option value="vietcap">Vietcap SmartAI</option>
          {/* Add more options if needed */}
        </select>
      </div>

      {/* Content */}
      {activeTab === "featuredStock" && (
        <>
          <p className="text-gray-400 text-xs mb-4">
            Top performing stocks are the Top 5 highest-rated and the bottom 5
            lowest-rated based on the past 5 days' news.
          </p>

          {/* Legend */}
          <div className="flex gap-4 mb-4 text-xs text-gray-300">
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-green-500 rounded-sm mr-1"></span>{" "}
              Positive
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-yellow-500 rounded-sm mr-1"></span>{" "}
              Neutral
            </div>
            <div className="flex items-center">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm mr-1"></span>{" "}
              Negative
            </div>
          </div>
          {/* Positive stocks */}
          <div className="grid grid-cols-5 gap-3 mb-4">
            {aiNewsData.hose?.positive?.map((stock, index) => (
              <AIInsightCardItem key={index} stock={stock} type="positive" />
            ))}
          </div>

          {/* Negative stocks */}
          <div className="grid grid-cols-5 gap-3">
            {aiNewsData.hose?.negative?.map((stock, index) => (
              <AIInsightCardItem key={index} stock={stock} type="negative" />
            ))}
          </div>
        </>
      )}

      {activeTab === "hotNew" && (
        <div className="overflow-y-auto max-h-[340px] pr-1 custom-scrollbar space-y-2">
          <p className="text-gray-400 text-xs mb-4">
            Latest important market news summarized by AI.
          </p>
          <div className="rounded-xl flex flex-col gap-2 transition-colors duration-200">
            {aiNewsData.hotNews.map((newsItem) => (
              <AINewsCardItem key={newsItem.id} news={newsItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AINew;
