import React from 'react';

const ExchangeNewsCard = ({ news }) => {
  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 border border-gray-700 hover:border-blue-500 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-blue-400 font-medium">{news.code}</span>
          <h3 className="text-white font-medium mt-1">{news.title}</h3>
          <p className="text-gray-400 text-sm mt-2">{news.description}</p>
        </div>
        <span className="text-gray-500 text-sm whitespace-nowrap ml-4">{news.source}</span>
      </div>
    </div>
  );
};

export default ExchangeNewsCard;