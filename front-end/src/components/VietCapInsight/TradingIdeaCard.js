import triangleImg from "../../assets/images/triangle.png";

const TradingIdeaCard = ({
  ticker,
  companyName,
  investmentType,
  currentPrice,
  targetPrice,
  onClick,
}) => {
  
  return (
    <>
      {/* Card chính */}
      <div
        onClick={onClick}
        className="bg-[#2a2a2a] rounded-lg shadow text-white font-sans cursor-pointer hover:bg-[#2a2a2a] transition-colors duration-200"
      >
        {/* Phần trên */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-100">{ticker}</span>
              <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                {investmentType}
              </span>
            </div>
            <button className="bg-yellow-400 hover:bg-yellow-700 text-sm text-black font-semibold py-1 px-3 rounded-md transition duration-200">
              Buy
            </button>
          </div>
          <div className="text-xs text-gray-400">{companyName}</div>
        </div>

        {/* Phần dưới */}
        <div className="p-3 pt-4">
          {/* Progress bar container */}
          <div className="relative h-6 mb-2">
            {/* Progress bar background */}
            <div className="absolute top-0 left-0 right-0 h-3 rounded-full overflow-hidden shadow-inner z-0">
              {/* Progress bar fill */}
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  background: `linear-gradient(90deg, #1a472a, #228B22)`,
                }}
              />
            </div>

            {/* Current Price marker */}
            <div
              className="absolute flex flex-col items-center text-xs text-white z-10"
              style={{
                left: `-10px`,
                top: "-29px",
                pointerEvents: "none",
                fontWeight: "700",
                fontSize: "0.75rem",
                userSelect: "none",
              }}
            >
              <div className="bg-gray-900 border border-green-600 rounded-md px-3 py-1 shadow-md">
                {currentPrice !== undefined && currentPrice !== null
                  ? currentPrice.toFixed(2)
                  : "-"}
              </div>
              <img
                src={triangleImg}
                alt="current"
                className="w-3 h-3 mt-0.5"
                style={{ pointerEvents: "none" }}
              />
            </div>

            {/* Target Price marker */}
            <div
              className="absolute flex flex-col items-center text-xs text-white z-10"
              style={{
                right: "-10px",
                top: "-29px",
                pointerEvents: "none",
                fontWeight: "700",
                fontSize: "0.75rem",
                userSelect: "none",
              }}
            >
              <div className="bg-gray-900 border border-yellow-400 rounded-md px-3 py-1 shadow-md">
                {targetPrice !== undefined && targetPrice !== null
                  ? targetPrice.toFixed(2)
                  : "-"}
              </div>
              <img
                src={triangleImg}
                alt="target"
                className="w-3 h-3 mt-0.5"
                style={{ pointerEvents: "none" }}
              />
            </div>
          </div>

          {/* Labels dưới progress bar */}
          <div className="flex justify-between text-xs text-gray-400 font-semibold">
            <span>Current</span>
            <span>Target</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TradingIdeaCard;
