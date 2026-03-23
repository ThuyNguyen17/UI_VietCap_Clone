import { useState, useMemo } from "react";
import Header from "../components/Header/Header";
import NewsCard from "../components/News/NewsCard";

function BusinessNewsPage({ newsData }) {
  const [selectedSentiment, setSelectedSentiment] = useState("All");
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [selectedSource, setSelectedSource] = useState("All");
  const [startDate, setStartDate] = useState("2025-06-30");
  const [endDate, setEndDate] = useState("2025-07-31");

  const sentiments = useMemo(
    () => ["All sentiment", ...new Set(newsData.map((news) => news.sentiment))],
    [newsData]
  );

  const industries = useMemo(
    () => ["All industry", ...new Set(newsData.map((news) => news.industry))],
    [newsData]
  );

  const sources = useMemo(
    () => ["All source", ...new Set(newsData.map((news) => news.source))],
    [newsData]
  );
  const filteredNews = useMemo(() => {
     return newsData.filter((news) => {
    const matchSource =
      selectedSource === "All" || news.source === selectedSource;

    const matchSentiment =
      selectedSentiment === "All" || news.sentiment === selectedSentiment;

    const matchIndustry =
      selectedIndustry === "All" || news.industry === selectedIndustry;

    return matchSource && matchSentiment && matchIndustry;
  });
}, [newsData, selectedSource, selectedSentiment, selectedIndustry]);

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-extrabold drop-shadow-md">
            Business News
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* Sentiment Filter */}
            <div className="relative w-40">
              <select
                className="w-full bg-[#1a1a1a] border border-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-pointer text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                aria-label="Filter by Sentiment"
              >
                {sentiments.map((sentiment) => (
                  <option key={sentiment} value={sentiment}>
                    {sentiment}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Industry Filter */}
            <div className="relative w-40">
              <select
                className="w-full bg-[#1a1a1a] border border-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-pointer text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                aria-label="Filter by Industry"
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    {industry}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {/* Source Filter */}
            <div className="relative w-40">
              <select
                className="w-full bg-[#1a1a1a] border border-gray-700 text-gray-300 px-4 py-2 rounded-lg cursor-pointer text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                aria-label="Filter by Source"
              >
                {sources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-yellow-400">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="flex items-center space-x-3 text-gray-300">
              <label
                htmlFor="start-date"
                className="whitespace-nowrap text-sm font-semibold"
              >
                From:
              </label>
              <input
                id="start-date"
                type="date"
                className="bg-[#1a1a1a] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={endDate}
                aria-label="Start date"
              />
              <label
                htmlFor="end-date"
                className="whitespace-nowrap text-sm font-semibold"
              >
                To:
              </label>
              <input
                id="end-date"
                type="date"
                className="bg-[#1a1a1a] border border-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                aria-label="End date"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredNews.length > 0 ? (
            filteredNews.map((news) => <NewsCard key={news.id} news={news} />)
          ) : (
            <p className="col-span-full text-center text-gray-400 py-16 italic font-medium">
              No news matches the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default BusinessNewsPage;
