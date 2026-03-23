import { memo } from "react";
import AIInsightCardItem from "./AIInsightCardItem";
import { aiNewsData } from "../../../data/mockData";

const marketIndices = [
  { name: "HOSE", value: "hose" },
  { name: "VN30", value: "vn30" },
  { name: "VNMidCap", value: "vnmidcap" },
  { name: "VNSmallCap", value: "vnsmallcap" },
  { name: "VN100", value: "vn100" },
  { name: "HNX", value: "hnx" },
  { name: "HNX30", value: "hnx30" },
  { name: "UpCom", value: "upcom" },
];

const IndexButton = memo(({ name, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all duration-200 border focus:outline-none
        ${
          active
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-[#1e1e1e] text-gray-300 border-gray-600 hover:bg-gray-800"
        }
      `}
    >
      {name}
    </button>
  );
});

const StockTickerStrip = ({ activeIndex, setActiveIndex }) => {
  return (
    <div className="bg-[#121212] py-3 px-4 border-b border-gray-800">
      <div className="max-w-screen-xl mx-auto">
        {/* Header chỉ số */}
        <div className="flex flex-wrap gap-2 mb-3">
          {marketIndices.map((index) => (
            <IndexButton
              key={index.value}
              name={index.name}
              active={activeIndex === index.value}
              onClick={() => setActiveIndex(index.value)}
            />
          ))}
        </div>

        {/* AI Insights Cards */}
        <div className="flex gap-2">
          {aiNewsData[activeIndex]?.positive.slice(0, 8).map((stock, index) => (
            <AIInsightCardItem
              key={`pos-${index}`}
              stock={stock}
              type="positive"
            />
          ))}
          {aiNewsData[activeIndex]?.negative.slice(0, 8).map((stock, index) => (
            <AIInsightCardItem
              key={`neg-${index}`}
              stock={stock}
              type="negative"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockTickerStrip;
