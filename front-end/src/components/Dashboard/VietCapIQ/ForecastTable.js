import React from "react";

const data = [
  {
    symbol: "SAB",
    industry: "Consumer",
    profitability: 46.6,
    volume: "61,489",
    dividendYield: "7.3%",
    liquidity: "41.0%",
    priceTarget: "67,000",
    datePublished: "08/03/2025",
    gtdd: 95.0,
    expertRating: "BUY",
    profit2025: 4734,
    profit2026: 4787,
    profitGrowth2025: 9.3,
    profitGrowth2026: 1.1,
    pve2025: 13.3,
    pve2026: 13.1,
    pt_2025f: 2.2,
  },
  {
    symbol: "VHC",
    industry: "Consumer",
    profitability: 43.8,
    volume: "12,502",
    dividendYield: "5.4%",
    liquidity: "80.4%",
    priceTarget: "81,700",
    datePublished: "17/02/2025",
    gtdd: 110.7,
    expertRating: "BUY",
    profit2025: 1495,
    profit2026: 2034,
    profitGrowth2025: 21.2,
    profitGrowth2026: 36.0,
    pve2025: 8.4,
    pve2026: 6.1,
    pt_2025f: 1.2,
  },
  {
    symbol: "MSN",
    industry: "Consumer",
    profitability: 36.9,
    volume: "104,809",
    dividendYield: "0.0%",
    liquidity: "74.6%",
    priceTarget: "101,200",
    datePublished: "21/05/2025",
    gtdd: 673.5,
    expertRating: "BUY",
    profit2025: 2852,
    profit2026: 4475,
    profitGrowth2025: 42.7,
    profitGrowth2026: 56.9,
    pve2025: 38.5,
    pve2026: 24.7,
    pt_2025f: 3.3,
  },
  {
    symbol: "KDH",
    industry: "Real Estate",
    profitability: 35.8,
    volume: "31,085",
    dividendYield: "0.0%",
    liquidity: "16.4%",
    priceTarget: "37,900",
    datePublished: "15/05/2025",
    gtdd: 147.2,
    expertRating: "BUY",
    profit2025: 949,
    profit2026: 1053,
    profitGrowth2025: 17.3,
    profitGrowth2026: 11.0,
    pve2025: 35.3,
    pve2026: 31.8,
    pt_2025f: 1.7,
  },
  {
    symbol: "PTB",
    industry: "Industrials",
    profitability: 35.7,
    volume: "3,641",
    dividendYield: "4.4%",
    liquidity: "11.5%",
    priceTarget: "71,000",
    datePublished: "14/03/2025",
    gtdd: 5.7,
    expertRating: "BUY",
    profit2025: 461,
    profit2026: 519,
    profitGrowth2025: 24.6,
    profitGrowth2026: 12.6,
    pve2025: 8.3,
    pve2026: 7.4,
    pt_2025f: 1.1,
  },
  {
    symbol: "BMI",
    industry: "Insurance",
    profitability: 30.2,
    volume: "2,732",
    dividendYield: "2.4%",
    liquidity: "18.7%",
    priceTarget: "26,200",
    datePublished: "12/04/2024",
    gtdd: 6.0,
    expertRating: "BUY",
    profit2025: 381,
    profit2026: 442,
    profitGrowth2025: 10.4,
    profitGrowth2026: 16.0,
    pve2025: 8.4,
    pve2026: 7.2,
    pt_2025f: 0.9,
  },
  {
    symbol: "IDC",
    industry: "Industrial P...",
    profitability: 29.6,
    volume: "14,718",
    dividendYield: "4.5%",
    liquidity: "30.2%",
    priceTarget: "55,600",
    datePublished: "08/05/2025",
    gtdd: 130.1,
    expertRating: "BUY",
    profit2025: 1536,
    profit2026: 1737,
    profitGrowth2025: -23.0,
    profitGrowth2026: 13.1,
    pve2025: 9.7,
    pve2026: 8.6,
    pt_2025f: 2.1,
  },
  {
    symbol: "ACV",
    industry: "Transport...",
    profitability: 29.5,
    volume: "218,871",
    dividendYield: "0.0%",
    liquidity: "46.0%",
    priceTarget: "131,800",
    datePublished: "08/05/2025",
    gtdd: 85.2,
    expertRating: "BUY",
    profit2025: 10687,
    profit2026: 12503,
    profitGrowth2025: 3.5,
    profitGrowth2026: 17.8,
    pve2025: 19.6,
    pve2026: 16.9,
    pt_2025f: 3.1,
  },
  {
    symbol: "ACB",
    industry: "Banks",
    profitability: 26.6,
    volume: "118,145",
    dividendYield: "4.3%",
    liquidity: "0.0%",
    priceTarget: "28,600",
    datePublished: "19/05/2025",
    gtdd: 350.9,
    expertRating: "BUY",
    profit2025: 18041,
    profit2026: 21206,
    profitGrowth2025: 6.6,
    profitGrowth2026: 17.5,
    pve2025: 6.6,
    pve2026: 5.6,
    pt_2025f: 1.2,
  },
  {
    symbol: "CTR",
    industry: "Consumer",
    profitability: 26.0,
    volume: "10,295",
    dividendYield: "2.2%",
    liquidity: "40.4%",
    priceTarget: "114,300",
    datePublished: "10/05/2025",
    gtdd: 74.4,
    expertRating: "BUY",
    profit2025: 586,
    profit2026: 705,
    profitGrowth2025: 8.9,
    profitGrowth2026: 20.3,
    pve2025: 23.3,
    pve2026: 19.4,
    pt_2025f: 4.2,
  },
  {
    symbol: "FRT",
    industry: "Consumer",
    profitability: 25.1,
    volume: "26,512",
    dividendYield: "0.0%",
    liquidity: "15.7%",
    priceTarget: "139,800",
    datePublished: "28/05/2025",
    gtdd: 91.4,
    expertRating: "BUY",
    profit2025: 733,
    profit2026: 1132,
    profitGrowth2025: 150.6,
    profitGrowth2026: 54.4,
    pve2025: 36.1,
    pve2026: 23.4,
    pt_2025f: 9.9,
  },
  {
    symbol: "TLG",
    industry: "Consumer",
    profitability: 25.6,
    volume: "4,436",
    dividendYield: "7.2%",
    liquidity: "85.7%",
    priceTarget: "61,300",
    datePublished: "20/05/2025",
    gtdd: 22.5,
    expertRating: "BUY",
    profit2025: 471,
    profit2026: 538,
    profitGrowth2025: 1.9,
    profitGrowth2026: 14.2,
    pve2025: 9.5,
    pve2026: 8.3,
    pt_2025f: 1.6,
  },
  {
    symbol: "HPG",
    industry: "Materials",
    profitability: 25.3,
    volume: "193,039",
    dividendYield: "0.0%",
    liquidity: "27.1%",
    priceTarget: "31,700",
    datePublished: "16/05/2025",
    gtdd: 1359.8,
    expertRating: "BUY",
    profit2025: 16248,
    profit2026: 21041,
    profitGrowth2025: 35.2,
    profitGrowth2026: 29.5,
    pve2025: 12.3,
    pve2026: 9.5,
    pt_2025f: 1.5,
  },
];

const ForecastTable = () => (
  <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-xl overflow-x-auto min-h-[500px]">
    {/* Header and Controls */}
    <div className="flex items-center justify-between mb-4 space-x-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <div className="flex justify-between items-center mb-3 flex-shrink-0">
          <h2 className="flex items-center text-2xl font-extrabold text-yellow-400 tracking-wide">
            <span className="w-1 h-6 bg-yellow-400 mr-3 rounded-sm"></span>
            Dynamic Rating Structure
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          <button className="bg-gray-700 text-gray-300 py-1 px-3 rounded-lg text-sm">
            Mã
          </button>
          <button className="bg-gray-700 text-gray-300 py-1 px-3 rounded-lg text-sm">
            Ngành
          </button>
        </div>
      </div>
      {/* Right Section - Placeholder for icons */}
      <div className="flex items-center space-x-2 text-gray-500">
        <button className="hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 00-2 0v1.268a2 2 0 000 3.464v7.268a1 1 0 102 0V7.732a2 2 0 000-3.464V3z" />
          </svg>
        </button>
        <button className="hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M11.49 10.605a.5.5 0 01-.197.662l-1.993 1.135a.5.5 0 01-.582-.122l-.782-.937a.5.5 0 01-.118-.465l.775-2.02a.5.5 0 01.127-.275l.178-.176a.5.5 0 01.401-.144l2.052.327a.5.5 0 01.458.625zM15 10a5 5 0 11-10 0 5 5 0 0110 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>

    {/* Table */}
    <table className="min-w-full text-sm text-gray-300 border-collapse table-fixed">
      <thead className="sticky top-0 bg-[#1e1e1e] z-10 border-b border-gray-700">
        <tr className="[&>th]:py-3 [&>th]:px-4 [&>th]:font-normal [&>th]:text-gray-400">
          <th rowSpan="2" className="text-left w-[6%]">
            Mã
          </th>
          <th rowSpan="2" className="text-left w-[8%]">
            Ngành
          </th>
          <th rowSpan="2" className="text-right w-[8%]">
            Mức Sinh Lời (%)
          </th>
          <th rowSpan="2" className="text-right w-[8%]">
            Vốn Hóa (tỷ VND)
          </th>
          <th rowSpan="2" className="text-right w-[6%]">
            Lợi Suất Cổ Tức
          </th>
          <th rowSpan="2" className="text-right w-[6%]">
            % Khối Ngoại Còn Lại
          </th>
          <th rowSpan="2" className="text-right w-[8%]">
            Giá Mục Tiêu
          </th>
          <th rowSpan="2" className="text-right w-[8%]">
            Ngày Cập Nhật
          </th>
          <th colSpan="2" className="text-center w-[12%]">
            GTDD (tỷ VND)
          </th>
          <th colSpan="2" className="text-center w-[12%]">
            Đánh Giá
          </th>
          <th colSpan="2" className="text-center w-[12%]">
            Lợi Nhuận (tỷ VND)
          </th>
          <th colSpan="2" className="text-center w-[12%]">
            Tăng Trưởng Lợi Nhuận (%)
          </th>
          <th colSpan="2" className="text-center w-[12%]">
            PVE (lần)
          </th>
          <th rowSpan="2" className="text-right w-[6%]">
            PT (%)
          </th>
        </tr>
        <tr className="[&>th]:py-3 [&>th]:px-4 [&>th]:font-normal [&>th]:text-gray-400 border-t border-gray-700">
          <th className="text-right">Đồng</th>
          <th className="text-right">Chuyên viên</th>
          <th className="text-center">2025F</th>
          <th className="text-center">2026F</th>
          <th className="text-center">2025F</th>
          <th className="text-center">2026F</th>
          <th className="text-center">2025F</th>
          <th className="text-center">2026F</th>
          <th className="text-center">2025F</th>
          <th className="text-center">2026F</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={row.symbol}
            className={`hover:bg-[#2a2a2a] transition-all duration-300 ${
              i % 2 === 0 ? "bg-[#1c1c1c]" : "bg-[#1f1f1f]"
            }`}
          >
            <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
              {row.symbol}
            </td>
            <td className="py-3 px-4 whitespace-nowrap">{row.industry}</td>
            <td className="py-3 px-4 text-right text-green-400 font-bold whitespace-nowrap">
              {row.profitability.toFixed(1)}%
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.volume}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.dividendYield}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.liquidity}
            </td>
            <td className="py-3 px-4 text-right text-blue-400 font-semibold whitespace-nowrap">
              {row.priceTarget}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.datePublished}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.gtdd.toFixed(1)}
            </td>
            <td className="py-3 px-4 text-center text-blue-400 font-semibold whitespace-nowrap">
              {row.expertRating}
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              {row.profit2025}
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              {row.profit2026}
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              <span
                className={
                  row.profitGrowth2025 < 0 ? "text-red-400" : "text-green-400"
                }
              >
                {row.profitGrowth2025.toFixed(1)}%
              </span>
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              <span
                className={
                  row.profitGrowth2026 < 0 ? "text-red-400" : "text-green-400"
                }
              >
                {row.profitGrowth2026.toFixed(1)}%
              </span>
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              {row.pve2025.toFixed(1)}
            </td>
            <td className="py-3 px-4 text-center whitespace-nowrap">
              {row.pve2026.toFixed(1)}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {row.pt_2025f.toFixed(1)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ForecastTable;
