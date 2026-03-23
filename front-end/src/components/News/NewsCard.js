import { Link } from "react-router-dom";
import { FiPlay } from "react-icons/fi";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const NewsCard = ({ news }) => {
  const slug = generateSlug(news.title);

  return (
    <Link to={`/ai-news/post-detail/${slug}`} className="block">
      <div className="relative group rounded-xl overflow-hidden border border-gray-700 bg-[#1e1e1e] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
        <div className="absolute inset-0">
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-full object-cover blur-sm brightness-75 scale-100 group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="relative z-10 p-4 flex flex-col justify-between h-52">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs bg-black bg-opacity-40 text-white px-2 py-1 rounded-full backdrop-blur-sm shadow-sm">
              {news.tag}
            </span>
            <span className="text-xs text-gray-300">{news.code}</span>
          </div>
          <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2 hover:text-blue-400 transition-colors duration-200">
            {news.title}
          </h3>
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-gray-300 font-medium bg-black bg-opacity-30 px-2 py-1 rounded-md">
              {news.source}
            </span>
            <div className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200">
              <FiPlay size={16} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
