import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import NewsCard from "../components/News/NewsCard";
import topicNewsData from "../data/topicnewsData";

const TopicDetailPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();

  const [decodedTopic, setDecodedTopic] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);

  useEffect(() => {
    if (topic) {
      const decoded = decodeURIComponent(topic);
      setDecodedTopic(decoded);

      const newsForTopic = topicNewsData.filter(
        (news) => news.topic === decoded
      );
      setFilteredNews(newsForTopic);

      window.scrollTo(0, 0);
    }
  }, [topic]);

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-blue-500 font-medium transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Go Back</span>
          </button>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-10">
          Topic: <span className="text-blue-400">{decodedTopic}</span>
        </h1>

        {/* News Grid */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-500 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM12 15.75c-1.294 0-2.417-.568-3.155-1.45a.75.75 0 10-1.19.912A5.243 5.243 0 0012 17.25a5.243 5.243 0 004.345-2.038.75.75 0 10-1.19-.912c-.738.882-1.861 1.45-3.155 1.45z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-xl text-gray-400">
              No news found for this topic.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicDetailPage;
