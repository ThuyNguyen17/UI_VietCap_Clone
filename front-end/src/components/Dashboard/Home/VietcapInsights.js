import React, { useState } from "react";
import TradingIdeaCard from "../../VietCapInsight/TradingIdeaCard";
import Tabs from "../../Common/Tabs";
import NewMarket from "../../VietCapInsight/NewMarket";
import TradingIdeaModal from "../../VietCapInsight/TradeIdeasModal";
import NewMarkeModal from "../../VietCapInsight/NewMarkeModal";
const tabs = [
  { key: "ideas", label: "Trading Ideas" },
  { key: "market", label: "Market News" },
];

const mockIdeas = [
  {
    ticker: "NT2",
    companyName: "Nhon Trach 2 Power",
    investmentType: "Short-term",
    actionLabel: "Buy",
    currentPrice: 20.1,
    targetPrice: 23.5,
    details: `
- Target price raised by 14.1% due to improved operational efficiency and higher electricity demand.
- Recent financial results show consistent revenue growth with stable profit margins.
- The company has secured long-term power purchase agreements, ensuring steady cash flow.
- Market conditions are favorable with increasing industrial activity in the region.
- Analysts recommend buying with a strong conviction for short-term gains based on technical indicators.
- Watch for any changes in regulatory policies that might affect power tariffs or supply.
- Risk factors include potential fluctuations in fuel prices and unexpected maintenance costs.
`,
  },
  {
    ticker: "FPT",
    companyName: "FPT Corporation",
    investmentType: "Long-term",
    actionLabel: "Hold",
    currentPrice: 89.5,
    targetPrice: 98.0,
    details: `
FPT Corporation continues to demonstrate strong business fundamentals with diversified revenue streams across IT services, telecommunications, and education sectors. 

- Recent quarterly results indicate 12% year-over-year growth in IT services.
- The company is investing heavily in digital transformation solutions, positioning itself well for future trends.
- Expansion into international markets, especially Southeast Asia, provides additional growth opportunities.
- Dividend payout ratio remains stable, appealing to income-focused investors.
- Analysts recommend holding the stock, as current valuation reflects growth prospects but with moderate short-term volatility.
- Key risks include competitive pressure from global IT firms and currency fluctuations impacting overseas revenue.
- The company’s strategic initiatives around AI and cloud computing are expected to drive long-term value.
`,
  },
  {
    ticker: "HPG",
    companyName: "Hoa Phat Group",
    investmentType: "Short-term",
    actionLabel: "Sell",
    currentPrice: 28.0,
    targetPrice: 25.0,
    details: `
Hoa Phat Group is currently facing several headwinds that impact its near-term outlook:

- Steel prices have been declining due to oversupply in the global market.
- Increased raw material costs are compressing profit margins.
- The construction sector slowdown is reducing demand for steel products.
- There are concerns regarding environmental regulations tightening, which may increase operating expenses.
- Technical analysis signals bearish momentum; short-term traders are advised to reduce exposure.
- However, the company’s long-term fundamentals remain solid with ongoing capacity expansions.
- Investors should monitor macroeconomic factors and commodity price trends closely before making decisions.
`,
  },
];
const newsList = [
  {
    id: 1,
    title: "Market Overview - Morning Brief",
    reason: "BMP, VHM, FPT",
    contentSections: [
      {
        heading: "Market",
        points: [
          "VN-Index remained flat this morning session, with trading volume down sharply by 18% compared to yesterday morning.",
          "Foreign investors recorded a net selling of approximately VND 400 billion, focusing on VHM, MSN, FPT, and VPB."
        ],
      },
      {
        heading: "HDB +4%",
        points: [
          "6-month pre-tax profit doubled compared to the same period last year.",
          "Q2 pre-tax profit increased 38%-40% YoY, generally higher than initial forecasts."
        ],
      },
      {
        heading: "BMP +2%",
        points: [
          "Revenue grew 25% YoY, net profit after tax +31% YoY (achieving 51% and 53% of 2025 targets respectively).",
          "Q2 revenue increased 13% YoY, Q2 net profit increased 18% YoY – a new record high.",
          "Q2 discount rate decreased by 20% QoQ, discount/revenue ratio reduced 2.3% to 12.8%.",
          "Q2 operating profit margin increased 5.2% QoQ to 32.4% thanks to lower input costs."
        ],
      }
    ],
    tableData: {
      headers: ["Market", "HOSE", "HNX"],
      rows: [
        ["Index", "1,485", "245.8"],
        ["Change (%)", "-0.8", "-0.8"],
        ["Total Trading Volume (Million shares)", "1,476", "171"],
        ["Total Trading Value (Billion VND)", "35,499", "2,968"],
      ]
    }
  },
  {
    id: 2,
    title: "Tech Sector Highlights",
    reason: "FPT, VNPT, VGI",
    contentSections: [
      {
        heading: "Sector Overview",
        points: [
          "The technology sector showed strong resilience amid market volatility.",
          "FPT reported a 12% YoY revenue growth driven by digital transformation projects.",
          "VNPT launched new 5G services expanding its market coverage."
        ],
      },
      {
        heading: "FPT Corporation",
        points: [
          "Investment in AI and cloud computing continues to drive growth.",
          "International expansion into Southeast Asian markets progressing well.",
          "Analysts recommend a 'Hold' rating due to moderate short-term volatility."
        ],
      }
    ],
    tableData: {
      headers: ["Company", "Current Price", "Target Price"],
      rows: [
        ["FPT", "89.5", "98.0"],
        ["VNPT", "23.1", "25.5"],
        ["VGI", "15.8", "18.2"],
      ]
    }
  },
  {
    id: 3,
    title: "Steel Industry Update",
    reason: "HPG, NKG, VIS",
    contentSections: [
      {
        heading: "Industry Trends",
        points: [
          "Global steel prices have declined due to oversupply concerns.",
          "Raw material costs are increasing, putting pressure on profit margins.",
          "Construction slowdown is reducing demand for steel products."
        ],
      },
      {
        heading: "Hoa Phat Group (HPG)",
        points: [
          "Short-term outlook affected by bearish technical signals.",
          "Capacity expansions continue supporting long-term fundamentals.",
          "Environmental regulations tightening may increase operating costs."
        ],
      }
    ],
    tableData: {
      headers: ["Company", "Current Price", "Target Price"],
      rows: [
        ["HPG", "28.0", "25.0"],
        ["NKG", "15.5", "17.0"],
        ["VIS", "12.3", "13.8"],
      ]
    },
  },
  {
    id: 4,
    title: "Banking Sector Quarterly Results",
    reason: "VCB, TCB, ACB",
    contentSections: [
      {
        heading: "Sector Overview",
        points: [
          "Banks reported solid credit growth despite economic uncertainties.",
          "Net interest margins remain stable with improved cost efficiency.",
          "Digital banking adoption accelerated significantly in Q2."
        ],
      },
      {
        heading: "Key Bank Updates",
        points: [
          "VCB saw a 15% increase in net profit compared to Q1.",
          "TCB's loan portfolio expanded by 10% YoY with good asset quality.",
          "ACB launched new fintech products to capture younger demographics."
        ],
      }
    ],
    tableData: {
      headers: ["Bank", "Current Price", "Target Price"],
      rows: [
        ["VCB", "84.0", "90.0"],
        ["TCB", "52.5", "57.0"],
        ["ACB", "35.0", "38.0"],
      ]
    }
  }
];

const VietcapInsights = ({ onCardClick, onNewsClick }) => {
  const [activeTab, setActiveTab] = useState("ideas");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleCardClick = (idea) => {
    if (isLoggedIn) {
      onCardClick(idea);
    } else {
      alert("Please log in to view full details.");
    }
  };
  const handleNewsClick = (news) => {
    if (isLoggedIn) {
      onNewsClick(news);
    } else {
      alert("Please log in to view full details.");
    }
  };
  return (
    <div className="bg-[#1a1a1a] rounded-3xl p-3 shadow-2xl border border-yellow-400/30 backdrop-blur-md text-white h-full flex flex-col relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 flex-shrink-0">
        <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
          <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
          Vietcap Insights
        </h2>
        <a
          href="/news"
          className="text-blue-400 text-sm cursor-pointer hover:underline"
        >
          See more
        </a>
      </div>

      {/* Tabs */}
      <div className="mb-1 flex-shrink-0">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-85 custom-scrollbar space-y-3">
        {activeTab === "ideas" ? (
          <>
            <p className="text-sm text-gray-400 font-medium mb-2">
              {new Date().toLocaleDateString("vi-VN")}
            </p>
            {mockIdeas.map((idea, index) => (
              <TradingIdeaCard
                key={index}
                {...idea}
                onClick={() => handleCardClick(idea)}
              />
            ))}
          </>
        ) : (
          <div className="p-2 text-gray-400 space-y-2">
            <NewMarket data={newsList} onClick={handleNewsClick} />
        </div>
        )}

        {!isLoggedIn && (
          <div className="absolute inset-0 backdrop-blur-md flex items-center justify-center rounded-xl z-10 bg-black/50">
            <button
              onClick={() => setIsLoggedIn(true)}
              className="bg-gray-700 bg-opacity-60 px-4 py-2 rounded-lg text-white italic hover:bg-gray-600 transition duration-300 shadow-lg"
            >
              Please log in to view content
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VietcapInsights;
