import React,{useEffect} from "react";
import { FaTimes } from "react-icons/fa";

const NewMarkeModal = ({ news, onClose }) => {
  useEffect(() => {
    if (news) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [news]);
  if (!news) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4">
      <div className="bg-[#1a1a1a] text-white p-0 rounded-xl shadow-xl max-w-2xl w-full relative max-h-[90vh] overflow-y-auto custom-scrollbar">

        {/* Header Banner */}
        <div className="relative">
          <img
            src="https://th.bing.com/th/id/OIF.NYVA58GGSjHuf9aCz1Ht8w?w=289&h=180&c=7&r=0&o=7&pid=1.7&rm=3"
            alt="Vietcap banner"
            className="w-full h-40 object-cover rounded-t-xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-transparent rounded-t-xl p-4 flex flex-col justify-between">
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="text-white text-xl hover:text-red-400"
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold">Vietcap</h1>
              <p className="text-sm text-gray-300">Market Brief</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 space-y-6">
          <h2 className="text-yellow-400 text-xl font-bold mb-2">{news.title}</h2>
          <p className="text-sm italic text-gray-400 mb-4">Liên quan: {news.reason}</p>

          {/* Sections */}
          {news.contentSections?.map((section, i) => (
            <div key={i}>
              <h3 className="text-yellow-300 font-semibold mb-1">{section.heading}</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                {section.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          ))}

          {/* Optional Table */}
          {news.tableData && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-gray-300 text-sm border border-gray-700 rounded-md">
                <thead>
                  <tr className="bg-gray-800">
                    {news.tableData.headers.map((header, idx) => (
                      <th key={idx} className="border border-gray-700 px-3 py-1 text-left">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {news.tableData.rows.map((row, ridx) => (
                    <tr key={ridx} className="even:bg-gray-900">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="border border-gray-700 px-3 py-1">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

export default NewMarkeModal;
