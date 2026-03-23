import React from "react";
import { FaLightbulb } from "react-icons/fa";

const NewsCard = ({ title, reason, onClick }) => {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("vi-VN", options);

  return (
    <div
      onClick={onClick}
      className="bg-[#2d2d2d] rounded-lg p-3 shadow-lg relative mb-2 hover:bg-gray-700 transition-colors cursor-pointer"
    >
      <div className="absolute top-2 right-2 text-gray-400 text-xs">
        {formattedDate}
      </div>
      <div className="flex items-start gap-2">
        <FaLightbulb className="text-yellow-400 mt-1" />
        <div>
          <p className="font-semibold text-yellow-400 text-sm leading-tight">
            {title}
          </p>
          <p className="text-white italic leading-tight mt-2">{reason}</p>
        </div>
      </div>
    </div>
  );
};

const NewMarket = ({ data = [], onClick }) => {
  return (
    <div className="custom-scrollbar max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-700">
      {data.map((item, index) => (
        <NewsCard
          key={index}
          title={item.title}
          reason={item.reason}
          onClick={() => onClick(item)}
        />
      ))}
    </div>
  );
};

export default NewMarket;
