import React, { useState, useRef, useEffect } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import Header from '../components/Header/Header';
import { reports } from '../data/mockData'; // Mock data
import { useNavigate } from 'react-router-dom';

const analysisCategories = [
  'All',
  'Corporate Analysis',
  'Industry Report',
  'Technical Analysis',
  'Macroeconomic Report',
  'Market Commentary',
  'Expert Opinion',
  'Investment Strategy'
];

// Helper function to create a URL-friendly slug from the report title
const createReportSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

export default function ReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage, setReportsPerPage] = useState(10);
  const reportsSectionRef = useRef(null);
  const navigate = useNavigate();

  const allAvailableReports = [...reports.topReports, ...reports.analysisReports];

  const filteredReports = allAvailableReports.filter(
    (r) =>
      (selectedCategory === 'All' || (r.tags && r.tags.includes(selectedCategory))) &&
      (search.trim() === '' || r.title.toLowerCase().includes(search.trim().toLowerCase()))
  );

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);

  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  function goToPage(page) {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);

    if (reportsSectionRef.current) {
      reportsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, search, reportsPerPage]);

  return (
    <>
      <Header />

      <div className="bg-black text-white px-0 py-6">
        {/* Top Reports */}
        <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl shadow border border-zinc-800 mb-6 p-0">
          <div className="px-6 pt-5 pb-2">
            <h2 className="text-yellow-500 font-semibold mb-2">Trending Reports</h2>
            <ul>
              {reports.topReports.map((r, i) => (
                <li
                  key={i}
                  className="flex flex-col border-b border-zinc-800 last:border-b-0 py-2 cursor-pointer hover:bg-zinc-800 transition"
                  // Use a link to the detail page for consistency, or a direct PDF link if desired here
                  onClick={() => navigate(`/vietcap-iq/report/${createReportSlug(r.title)}`)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base text-white truncate font-medium">{r.title}</span>
                    <span className="text-xs text-gray-400 ml-4 whitespace-nowrap">{r.date}</span>
                  </div>
                  <span className="text-xs text-blue-400 hover:underline mt-1">{r.subtitle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Analysis Reports */}
        <div
          ref={reportsSectionRef}
          className="max-w-3xl mx-auto bg-zinc-900 rounded-xl shadow border border-zinc-800 p-0"
        >
          <div className="px-6 pt-5 pb-2">
            <h2 className="text-yellow-500 font-semibold mb-3">Analysis Reports</h2>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {analysisCategories.map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-1.5 rounded-full border text-sm font-medium transition-colors duration-150 ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white border-blue-600 shadow'
                      : 'bg-zinc-800 text-gray-300 border-zinc-700 hover:bg-zinc-700'
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search & Category Dropdown */}
            <div className="flex flex-wrap gap-2 items-center mb-4">
              <input
                className="flex-1 min-w-[220px] bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-blue-500"
                placeholder="Search by stock code or company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="bg-zinc-800 border border-zinc-700 text-gray-300 rounded px-3 py-2 text-sm outline-none appearance-none cursor-pointer
                  bg-[url('data:image/svg+xml;utf8,<svg fill=\'%23ccc\' height=\'10\' viewBox=\'0 0 24 24\' width=\'10\' xmlns=\'http://www.w3.org/2000/svg\'><path d=\'M7 10l5 5 5-5z\'/></svg>')] bg-no-repeat bg-right-3 bg-center"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {analysisCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Report List */}
          <div className="px-6 pb-4">
            <div className="space-y-4">
              {paginatedReports.length === 0 && (
                <div className="text-center text-gray-500 py-8">No matching reports found.</div>
              )}

              {paginatedReports.map((report, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-800 border border-zinc-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                  onClick={() => {
                    navigate(`/vietcap-iq/report/${createReportSlug(report.title)}`);
                  }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FaFileAlt className="text-blue-500" />
                    <h2 className="text-base font-medium text-white">{report.title}</h2>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <div className="flex gap-2 flex-wrap">
                      {report.tags && report.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-blue-800 text-blue-100 px-2 py-0.5 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div>{report.date}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center text-xs text-gray-400 px-6">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  className="bg-zinc-800 border border-zinc-700 text-gray-300 rounded px-3 text-sm outline-none cursor-pointer bg-center"
                  value={reportsPerPage}
                  onChange={(e) => setReportsPerPage(Number(e.target.value))}
                >
                  {[5, 10, 50, 100].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span>reports</span>
              </div>

              <div className="space-x-2 flex flex-wrap gap-1">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 rounded ${
                    currentPage === 1
                      ? 'bg-zinc-700 cursor-not-allowed'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToPage(i + 1)}
                    className={`px-2 py-1 rounded ${
                      currentPage === i + 1
                        ? 'bg-blue-600 text-white'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 rounded ${
                    currentPage === totalPages
                      ? 'bg-zinc-700 cursor-not-allowed'
                      : 'bg-zinc-800 hover:bg-zinc-700'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}