import React, { useEffect } from "react";
import triangleImg from "../../assets/images/triangle.png";
import '../../App.css';

const TradingIdeaModal = ({ idea, onClose }) => {
  useEffect(() => {
    if (idea) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [idea]);

  if (!idea) return null;

  const { currentPrice, targetPrice, ticker, companyName, investmentType } = idea;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-[#1a1a1a] text-white p-0 rounded-xl shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto custom-scrollbar">

        {/* Banner */}
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIF.NYVA58GGSjHuf9aCz1Ht8w?w=289&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
            alt="Vietcap banner"
            className="w-full h-40 object-cover rounded-t-xl"
          />

          {/* Overlay Content */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent rounded-t-xl p-4 flex flex-col justify-between">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-white text-xl hover:text-red-400"
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vietcap</h1>
              <p className="text-sm text-gray-300">Trading Idea</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-start border-b border-gray-700 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-bold">{ticker}</span>
                <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">
                  {investmentType}
                </span>
              </div>
              <p className="text-sm text-gray-400">{companyName}</p>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-600 text-sm text-black font-semibold py-1 px-3 rounded-md transition">
              Buy
            </button>
          </div>

          {/* Grid Section */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 items-start">

            {/* Progress Bar */}
            <div className="relative h-6">
              <div className="absolute top-0 left-0 right-0 h-3 rounded-full overflow-hidden shadow-inner z-0">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, #1a472a, #228B22)`,
                  }}
                />
              </div>

              {/* Current Price Marker */}
              <div
                className="absolute flex flex-col items-center text-xs text-white z-10"
                style={{
                  left: `-10px`,
                  top: "-29px",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  userSelect: "none",
                }}
              >
                <div className="bg-gray-900 border border-green-600 rounded-md px-3 py-1 shadow-md">
                  {currentPrice?.toFixed(2) ?? "-"}
                </div>
                <img src={triangleImg} alt="current" className="w-3 h-3 mt-0.5" />
              </div>

              {/* Target Price Marker */}
              <div
                className="absolute flex flex-col items-center text-xs text-white z-10"
                style={{
                  right: `-10px`,
                  top: "-29px",
                  fontWeight: "700",
                  fontSize: "0.75rem",
                  userSelect: "none",
                }}
              >
                <div className="bg-gray-900 border border-yellow-400 rounded-md px-3 py-1 shadow-md">
                  {targetPrice?.toFixed(2) ?? "-"}
                </div>
                <img src={triangleImg} alt="target" className="w-3 h-3 mt-0.5" />
              </div>

              <div className="flex justify-between text-xs text-gray-400 font-semibold mt-5">
                <span>Current</span>
                <span>Target</span>
              </div>
            </div>

            {/* Details Section */}
            <div className="text-sm bg-[#2a2a2a] p-3 rounded-md border border-gray-700 space-y-1">
              {idea.details ? (
                idea.details
                  .trim()
                  .split("\n")
                  .filter(line => line.trim() !== "")
                  .map((line, index) => (
                    <p key={index} className="leading-snug">- {line.replace(/^-/, "").trim()}</p>
                  ))
              ) : (
                "No additional information available."
              )}
            </div>

          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-gray-500/30 border-l-4 border-yellow-500 text-white text-[11px] leading-relaxed p-3 rounded-md">
            <strong className="text-yellow-300 text-sm">⚠️ DISCLAIMER:</strong>
            <br />
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Short-term target</strong> is based on <u>technical analysis</u>.</li>
              <li><strong>Long-term target</strong> is based on <u>fundamental analysis</u> conducted by Vietcap.</li>
            </ul>

            <p className="mt-3">
              This bulletin is prepared for general informational purposes only, is for reference use, and does not constitute any representation or warranty, express or implied, as to the accuracy, timeliness, or completeness of the information provided:
            </p>

            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>The accuracy, timeliness, or completeness of the information</li>
              <li>Any direct or indirect damages or losses</li>
              <li>Loss of expected revenue or profit</li>
              <li>Any decision or action taken based on this bulletin or its linked content</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TradingIdeaModal;
