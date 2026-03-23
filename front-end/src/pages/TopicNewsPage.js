import React, { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom"; 
import Header from "../components/Header/Header";
import NewsCard from "../components/News/NewsCard";

function TopicNewsPage({ newsData }) {
  const navigate = useNavigate(); 
  const topics = useMemo(
    () => ["Market Movement", "Global Stocks", "Exchange Rates", "Bonds", "Other News"],
    []
  );

  const sectionRefs = useRef(
    topics.reduce((acc, topic) => {
      acc[topic] = React.createRef();
      return acc;
    }, {})
  );

  const [activeTopic, setActiveTopic] = useState(topics[0]);
  const [filteredNewsByTopic, setFilteredNewsByTopic] = useState({});

  useEffect(() => {
    if (newsData && newsData.length > 0) {
      const newFilteredData = {};
      const allDefinedTopics = new Set(topics.slice(0, -1));

      // Nhóm tin tức cho các chủ đề cụ thể
      allDefinedTopics.forEach((topic) => {
        newFilteredData[topic] = newsData.filter((news) => news.topic === topic);
      });

      // Nhóm tin tức còn lại vào "Other News"
      newFilteredData["Other News"] = newsData.filter(
        (news) => !allDefinedTopics.has(news.topic)
      );

      setFilteredNewsByTopic(newFilteredData);
    } else {
      setFilteredNewsByTopic({});
    }
  }, [newsData, topics]);

  const scrollToSection = (topic) => {
    const element = sectionRefs.current[topic].current;
    if (element) {
      const headerOffset = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveTopic(topic);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 72;

      let currentActiveTopic = null;
      for (let i = topics.length - 1; i >= 0; i--) {
        const topic = topics[i];
        const element = sectionRefs.current[topic].current;
        if (element) {
          const elementTop = element.offsetTop;
          const elementBottom = elementTop + element.offsetHeight;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            currentActiveTopic = topic;
            break;
          }
        }
      }
      if (currentActiveTopic && currentActiveTopic !== activeTopic) {
        setActiveTopic(currentActiveTopic);
      }
    };

    let scrollTimeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [topics, activeTopic]);

  if (!newsData || newsData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#121212] to-[#1a1a1a] text-white font-sans flex items-center justify-center">
        <p className="text-xl text-gray-400">No news found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Header />
      <div className="px-4 py-4 max-w-screen-xl mx-auto">
        {/* Navigation Buttons */}
        <div className="sticky top-0 z-20 backdrop-blur-lg pt-4 pb-4 -mx-4 px-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 px-4 py-3 rounded-xl border overflow-x-auto scrollbar-hide">
            <span className="text-sm font-bold flex items-center pr-4 border-r border-gray-600 mr-4 uppercase tracking-widest">
              TOPIC NEWS
            </span>
             {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => scrollToSection(topic)}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium shadow-sm whitespace-nowrap transition-all duration-300
                  ${
                    activeTopic === topic
                      ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg scale-105"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }
                `}
              >
                {/* Sửa lại hiển thị ở đây */}
                {topic.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            ))}
          </div>
        </div>
        {/* News Sections */}
        {topics.map((topic) => (
          <div
            key={topic}
            id={topic.replace(/\s+/g, "-").toLowerCase()}
            ref={sectionRefs.current[topic]}
            className="mb-10 px-4 py-5 bg-[#1a1a1a]/80 rounded-2xl border border-gray-700 shadow-lg hover:shadow-blue-500/10 transition-shadow duration-300"
            style={{ scrollMarginTop: "80px" }}
          >
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
              <h3 className="text-2xl font-extrabold tracking-tight">
                {topic}
              </h3>
              {/* Thêm chức năng điều hướng cho nút "View more" */}
              <button
                onClick={() => navigate(`/ai-news/topic/${encodeURIComponent(topic)}`)}
                className="text-sm flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-transform duration-200 hover:translate-x-1"
              >
                <span>View more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredNewsByTopic[topic]?.length > 0 ? (
                filteredNewsByTopic[topic].map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-500 py-8">
                  No news found for this topic.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopicNewsPage;