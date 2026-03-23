import React, { memo } from 'react';
import PropTypes from 'prop-types';

const AIInsightCardItem = ({ stock, type }) => {
  const variant = {
    positive: {
      border: 'border-emerald-500',
      text: 'text-emerald-700',
      bgScore: 'bg-emerald-100 text-emerald-900',
      ring: 'ring-emerald-400',
    },
    negative: {
      border: 'border-rose-500',
      text: 'text-rose-700',
      bgScore: 'bg-rose-100 text-rose-900',
      ring: 'ring-rose-400',
    }
  }[type];

  return (
    <div className={`group bg-white border ${variant.border} px-3 py-3 rounded-xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-lg w-[100px]`}>
      <div className="flex flex-col items-center space-y-2">
        <div className={`w-10 h-10 rounded-full bg-white p-1 ring-2 ${variant.ring}`}>
          <img
            src={stock.logo}
            alt={stock.name}
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <div className={`text-[13px] font-semibold ${variant.text} text-center truncate w-full`}>
          {stock.name}
        </div>
        <div className={`text-[12px] font-bold px-2 py-1 rounded-full ${variant.bgScore}`}>
          {stock.score}
        </div>
      </div>
    </div>
  );
};

AIInsightCardItem.propTypes = {
  stock: PropTypes.shape({
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  type: PropTypes.oneOf(['positive', 'negative']).isRequired
};

export default memo(AIInsightCardItem);
