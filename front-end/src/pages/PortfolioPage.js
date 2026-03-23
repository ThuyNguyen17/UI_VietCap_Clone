import React from "react";
import Header from "../components/Header/Header";
import '../index.css';
import HoldingsSection from '../components/Holdings/HoldingsSection'
const PortfolioPage = () => {
  return (
      <div className="flex flex-col flex-1 bg-gradient-to-br from-dark via-dark to-gray-900">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
              {/* AI Market Predictions */}
              <div className={`transition-all duration-1000 delay-500`}>
                <h1>thêm add to do , làm cái thu nhỏ theo kích thước, sửa news, thêm hướng dẫn sử dụng</h1>
                <HoldingsSection />
              </div>
        </main>
      </div>
  );
};

export default PortfolioPage;
