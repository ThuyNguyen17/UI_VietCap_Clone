import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiBarChart2, FiZap, FiTarget } from 'react-icons/fi';
import { MdOutlinePsychology } from "react-icons/md";

const mockMarketData = {
  sentiment: 'Bullish',
  confidence: '87%',
  summary: 'AI predicts a positive trend for the next week, with technology and energy sectors leading the gains. Market sentiment analysis shows strong institutional buying pressure.',
  topGainers: [
    { symbol: 'NVDA', name: 'NVIDIA', predictedChange: '+5.2%', confidence: '92%', sector: 'Technology' },
    { symbol: 'AAPL', name: 'Apple', predictedChange: '+4.1%', confidence: '88%', sector: 'Technology' },
    { symbol: 'TSLA', name: 'Tesla', predictedChange: '+3.8%', confidence: '85%', sector: 'Automotive' },
    { symbol: 'AMD', name: 'AMD', predictedChange: '+3.2%', confidence: '82%', sector: 'Technology' }
  ],
  topLosers: [
    { symbol: 'BABA', name: 'Alibaba', predictedChange: '-2.3%', confidence: '78%', sector: 'E-commerce' },
    { symbol: 'NFLX', name: 'Netflix', predictedChange: '-1.7%', confidence: '75%', sector: 'Entertainment' },
    { symbol: 'ZM', name: 'Zoom', predictedChange: '-1.2%', confidence: '72%', sector: 'Technology' },
    { symbol: 'UBER', name: 'Uber', predictedChange: '-0.9%', confidence: '70%', sector: 'Transportation' }
  ],
  marketIndicators: [
    { name: 'RSI', value: '65', status: 'neutral', color: 'yellow' },
    { name: 'MACD', value: 'Bullish', status: 'positive', color: 'green' },
    { name: 'Volume', value: 'High', status: 'positive', color: 'green' },
    { name: 'Volatility', value: 'Low', status: 'positive', color: 'green' }
  ]
};

const colorClassMap = {
  green: 'bg-green-400',
  yellow: 'bg-yellow-400',
  red: 'bg-red-400',
  gray: 'bg-gray-400'
};

const MarketPredictionOverview = () => {
  const PredictionCard = ({ stock, isGainer, index }) => (
    <div
      className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
        isGainer
          ? 'bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:border-green-400/40'
          : 'bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 hover:border-red-400/40'
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isGainer ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {isGainer ? (
              <FiTrendingUp className="text-green-400 text-lg" />
            ) : (
              <FiTrendingDown className="text-red-400 text-lg" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
            <p className="text-gray-400 text-xs">{stock.name}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-bold text-lg ${isGainer ? 'text-green-400' : 'text-red-400'}`}>
            {stock.predictedChange}
          </div>
          <div className="text-gray-400 text-xs">{stock.confidence} confidence</div>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">{stock.sector}</span>
        <div className="flex items-center gap-1">
          <FiTarget className="text-gray-500" />
          <span className="text-gray-400">AI Prediction</span>
        </div>
      </div>
    </div>
  );

  const IndicatorCard = ({ indicator, index }) => (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-300 dark:border-gray-700 hover:border-accent transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-500 dark:text-gray-400 text-sm">{indicator.name}</span>
        <div className={`w-2 h-2 rounded-full ${colorClassMap[indicator.color] || 'bg-gray-400'}`}></div>
      </div>
      <div className="text-gray-900 dark:text-white font-semibold">{indicator.value}</div>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-300 dark:border-gray-700 p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
            <MdOutlinePsychology className="text-purple-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">AI Market Predictions</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Powered by advanced machine learning algorithms</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div
            className={`px-4 py-2 rounded-full text-white font-semibold ${
              mockMarketData.sentiment === 'Bullish'
                ? 'bg-gradient-to-r from-green-500 to-green-600'
                : 'bg-gradient-to-r from-red-500 to-red-600'
            }`}
          >
            {mockMarketData.sentiment}
          </div>
          <div className="text-center">
            <div className="text-accent font-bold text-lg">{mockMarketData.confidence}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">Confidence</div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6 border border-gray-300 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <FiZap className="text-accent text-lg mt-1" />
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{mockMarketData.summary}</p>
        </div>
      </div>

      {/* Market Indicators */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <FiBarChart2 className="text-accent" />
          Market Indicators
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {mockMarketData.marketIndicators.map((indicator, index) => (
            <IndicatorCard key={index} indicator={indicator} index={index} />
          ))}
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 gap-6">
        {/* Gainers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <FiTrendingUp className="text-green-400 text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Predicted Gainers</h3>
          </div>
          <div className="space-y-3">
            {mockMarketData.topGainers.map((stock, idx) => (
              <PredictionCard key={idx} stock={stock} isGainer={true} index={idx} />
            ))}
          </div>
        </div>

        {/* Losers */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <FiTrendingDown className="text-red-400 text-lg" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Predicted Losers</h3>
          </div>
          <div className="space-y-3">
            {mockMarketData.topLosers.map((stock, idx) => (
              <PredictionCard key={idx} stock={stock} isGainer={false} index={idx} />
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-xl border border-yellow-300 dark:border-yellow-500/20">
        <div className="flex items-start gap-3">
          <div className="p-1 bg-yellow-300/30 rounded">
            <FiTarget className="text-yellow-400 text-sm" />
          </div>
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <strong className="text-yellow-600 dark:text-yellow-400">Disclaimer:</strong> These predictions are based on AI analysis and should not be considered as financial advice. Always conduct your own research before making investment decisions.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketPredictionOverview;
