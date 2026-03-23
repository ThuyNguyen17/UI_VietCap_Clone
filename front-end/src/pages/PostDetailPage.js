import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import NewsCard from "../components/News/NewsCard";

const normalizeSlug = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const PostDetailPage = ({ newsData }) => {
  const { postId } = useParams(); // postId là slug
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    if (newsData && newsData.length > 0) {
      const foundPost = newsData.find(
        (item) => normalizeSlug(item.title) === postId
      );
      setPost(foundPost || null);
      window.scrollTo(0, 0);

      if (foundPost) {
        // Lấy 4 tin tức liên quan (không bao gồm bài viết hiện tại)
        const filteredRelated = newsData
          .filter((item) => item.id !== foundPost.id)
          .slice(0, 4);
        setRelatedNews(filteredRelated);
      }
    }
  }, [postId, newsData]);

  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <p className="text-xl text-center">
          The post does not exist or has been deleted.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-400 hover:text-blue-600 font-semibold mb-4 p-2 rounded hover:bg-gray-800 transition-colors duration-200"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
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
          Back
        </button>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400 mb-6">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.source}</span>
        </div>

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-xl mb-8"
          />
        )}

        <div
          className="prose prose-invert max-w-none text-gray-300 space-y-4"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {relatedNews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
              Related News
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedNews.map((news) => (
                <NewsCard key={news.id} news={news} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetailPage;