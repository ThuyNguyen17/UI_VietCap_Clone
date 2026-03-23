import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

// Màu sắc theo cảm xúc
const sentimentColor = {
  Positive: "text-green-500",
  Negative: "text-red-500",
  Neutral: "text-yellow-400",
};

// Icon theo cảm xúc
const sentimentIcon = {
  Positive: <FaArrowUp className="inline mr-1" />,
  Negative: <FaArrowDown className="inline mr-1" />,
  Neutral: <FaMinus className="inline mr-1" />,
};

const AINewsCardItem = ({ news }) => {
  const color = sentimentColor[news.sentiment] || "text-gray-400";
  const icon = sentimentIcon[news.sentiment] || <FaMinus className="inline mr-1" />;

  return (
    <div className="bg-[#2a2a2a] rounded-xl p-3 shadow hover:shadow-lg transition cursor-pointer flex gap-4 items-start">
      {/* Hình ảnh bên trái */}
      <img
        src={news.image || "https://via.placeholder.com/80x80?text=News"}
        alt={news.symbol}
        className="w-16 h-16 rounded-md object-cover bg-white"
      />

      {/* Nội dung bên phải */}
      <div className="flex-1">
        <h3 className="text-white font-semibold text-sm mb-1 leading-snug">{news.title}</h3>
        <div className="text-xs text-gray-400 flex gap-2 items-center flex-wrap">
          <span className={`font-semibold flex items-center ${color}`}>
            {icon}
            {news.sentiment}
          </span>
          <span className="text-gray-500">•</span>
          <span className="font-medium">{news.symbol}</span>
          <span className="text-gray-500">•</span>
          <span className="italic">{news.timeAgo}</span>
        </div>
      </div>
    </div>
  );
};

export default AINewsCardItem;
