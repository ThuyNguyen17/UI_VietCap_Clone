import ExchangeNewsCard from "./ExchangeNewsCard";
import NewsCard from "./NewsCard";
import { useNavigate } from "react-router-dom";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const NewsSection = ({
  businessnews = [],
  topicnews = [],
  exchangenews = [],
}) => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#121212] py-6 px-4">
      <div className="max-w-screen-xl mx-auto">
        {/* Business News */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-2">
            Business News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessnews?.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* Topic News */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-2">
            Topic News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topicnews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>

        {/* Exchange News */}
        <div>
          <h2 className="text-xl font-bold text-yellow-400 mb-4 border-b border-gray-700 pb-2">
            Exchange News
          </h2>
          <div className="space-y-3">
            {exchangenews.map((news) => (
              <div
                key={news.id}
                onClick={() =>
                  navigate(`/ai-news/post-detail/${generateSlug(news.title)}`)
                }
                className="cursor-pointer"
              >
                <ExchangeNewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
