import { useParams } from 'react-router-dom';
import { reports } from '../../data/mockData';
import Header from '../Header/Header'

const createReportSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
};

const FinancialReport = () => {
  const { reportId } = useParams();

  const allReports = [...reports.topReports, ...reports.analysisReports];
  const currentReport = allReports.find(report =>
    createReportSlug(report.title) === reportId
  );
  const displayReport = currentReport || reports.topReports[0];

  if (!displayReport) {
    return <div className="p-6 max-w-4xl mx-auto text-white">Báo cáo không tồn tại.</div>;
  }

  const relatedReports = allReports
    .filter(report => createReportSlug(report.title) !== reportId)
    .slice(0, 6); // lấy nhiều hơn 1 chút

  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";

  return (
    <>
      <Header />
      <div className="min-h-screen bg-black py-6 px-4">
      <div className="max-w-7xl mx-auto flex gap-8 bg-zinc-900 rounded-lg shadow-md overflow-hidden">
          {/* Báo cáo chính */}
          <div className="flex-1 p-8 text-white">
            <div className="flex items-center text-sm text-gray-400 mb-4">
              <a href="/vietcap-iq/report" className="hover:underline text-blue-400">Báo Cáo</a>
              <span className="mx-2">/</span>
              <span>{displayReport.title}</span>
            </div>

            <header className="mb-6">
              <h1 className="text-3xl font-bold leading-tight">{displayReport.title}</h1>
              <div className="flex justify-between items-center mt-2 text-gray-400 text-sm">
                <span>{displayReport.subtitle || 'Báo cáo chung'}</span>
                <span className="mx-2">•</span>
                <span>{displayReport.date}</span>
                <button
                  onClick={() => window.open(pdfUrl, '_blank', 'noopener')}
                  className="bg-green-600 text-white px-5 py-2 rounded-md font-semibold hover:bg-green-700 transition ml-auto"
                >
                  Xem Báo cáo
                </button>
              </div>
            </header>

            <div className="border-t border-zinc-700 my-6"></div>

            <section className="text-gray-300 leading-relaxed whitespace-pre-line">
              {displayReport.detail}
            </section>
          </div>

          <div
  className="w-96 border-l border-zinc-700 p-6 text-white overflow-y-auto max-h-[calc(100vh-120px)]"
>
  <h2 className="text-2xl font-bold mb-6">Báo cáo liên quan</h2>
  <ul className="space-y-2"> {/* Khoảng cách nhỏ hơn */}
    {relatedReports.map((report, idx) => (
      <li
        key={idx}
        className="pb-2 border-b border-zinc-700 last:border-b-0 last:pb-0"
      >
        <a
          href={`${createReportSlug(report.title)}`}
          className="block hover:text-blue-400 transition-colors duration-200"
        >
          <p className="font-semibold text-sm leading-tight">{report.title}</p> {/* font size nhỏ hơn, line height gọn hơn */}
          <p className="text-xs text-gray-400 mt-0.5">{report.date}</p> {/* margin-top nhỏ hơn */}
        </a>
      </li>
    ))}
  </ul>
</div>


        </div>
      </div>
    </>
  );
};

export default FinancialReport;
