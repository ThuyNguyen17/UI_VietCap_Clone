import { useState } from "react";
import Header from "../components/Header/Header";
import ExchangeNewsCard from "../components/News/ExchangeNewsCard";
import { useNavigate } from "react-router-dom";

const generateSlug = (title) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");

const ExchangeNewsPage = ({ newsData }) => {
  const navigate = useNavigate();

  // State cho bộ lọc danh mục và ngày
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [dateRange, setDateRange] = useState({
    start: "2025-05-30",
    end: "2025-07-31",
  });

  // Danh sách danh mục mẫu (tùy bạn cập nhật theo dữ liệu thật)
  const categories = ["Tất cả", "Chứng khoán", "Kinh tế", "Tiền tệ"];

  // Lọc tin theo danh mục và ngày
  const filteredNews = newsData.filter((news) => {
    const inCategory =
      selectedCategory === "Tất cả" || news.category === selectedCategory;

    const inDateRange =
      !news.date ||
      (news.date >= dateRange.start && news.date <= dateRange.end);

    return inCategory && inDateRange;
  });

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <div className="px-6 py-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-xl font-semibold">Tin Tức</h1>

          <div className="flex flex-wrap items-center space-x-4">
            {/* Dropdown chọn danh mục */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 text-white py-2 px-3 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>

            {/* Bộ chọn ngày từ - đến */}
            <div className="flex items-center gap-2 bg-gray-800 text-white py-2 px-3 rounded-md border border-gray-600">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    start: e.target.value,
                  }))
                }
                className="bg-transparent border-none focus:outline-none text-sm"
              />
              <span className="mx-1">-</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    end: e.target.value,
                  }))
                }
                className="bg-transparent border-none focus:outline-none text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div
              key={news.id}
              className="cursor-pointer transition hover:scale-[1.02]"
              onClick={() =>
                navigate(`/ai-news/post-detail/${generateSlug(news.title)}`)
              }
            >
              <ExchangeNewsCard news={news} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeNewsPage;
