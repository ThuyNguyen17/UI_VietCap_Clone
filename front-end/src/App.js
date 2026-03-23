import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import MarketPage from "./pages/MarketPage";
import AssetInfoPage from "./pages/AssetInfoPage";
import ChatWidget from "./components/Chat/ChatWidget";
import CompanyOverviewPage from "./pages/CompanyOverviewPage";
import ForecastPage from "./pages/ForecastPage";
import ReportsPage from "./pages/ReportsPage";
import IndustryPerformance from "./pages/IndustryPerformance";
import ChartPage from "./pages/ChartPage";
import FinancialReport from "./components/News/FinancialReport";
import PlanPage from "./pages/PlanPage";
import ScreeningPage from "./pages/ScreeeningPage";
import EventsPage from "./pages/EventPage";

import LoginPage from "./pages/LoginPage";
import Signup from "./pages/signup";
import Header from "./components/Header/Header";
import BusinessNewsPage from "./pages/BusinessNewsPage";
import TopicNewsPage from "./pages/TopicNewsPage";
import ExchangeNewsPage from "./pages/ExchangeNewsPage";
import PostDetailPage from "./pages/PostDetailPage";
import topicNewsData from "./data/topicnewsData";
import businessNewsData from "./data/businessNewData";
import TopicDetailPage from "./pages/TopicDetailPage";
import exchangeNewsData from "./data/exchangeNewData";
function App() {
  const allNewsData = [
    ...topicNewsData,
    ...businessNewsData,
    ...exchangeNewsData,
  ];

  return (
    <>
      <ChatWidget />
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <Header />
            <div className="app flex flex-col h-screen bg-dark-950 text-slate-100">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route
                  path="/ai-news/overview"
                  element={
                    <NewsPage
                      businessnews={businessNewsData || []}
                      topicnews={topicNewsData || []}
                      exchangenews={exchangeNewsData || []}
                    />
                  }
                />

                <Route path="/market" element={<MarketPage />} />
                <Route path="/assets" element={<AssetInfoPage />} />
                <Route path="/vietcap-iq/coverage" element={<ForecastPage />} />
                <Route path="/vietcap-iq/report" element={<ReportsPage />} />
                <Route
                  path="/vietcap-iq/sector"
                  element={<IndustryPerformance />}
                />
                {/* <Route path="/profile" element={<ProfilePage />} /> */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Signup />} />
                <Route path="/assets" element={<AssetInfoPage />} />
                <Route
                  path="/vietcap-iq/company/:symbol"
                  element={<CompanyOverviewPage />}
                />
                <Route path="/plan" element={<PlanPage />} />
                <Route path="/vietcap-iq/chart" element={<ChartPage />} />
                <Route
                  path="/vietcap-iq/report/:reportId"
                  element={<FinancialReport />}
                />
                <Route
                  path="/vietcap-iq/screening"
                  element={<ScreeningPage />}
                />
                <Route path="/vietcap-iq/events" element={<EventsPage />} />
                <Route
                  path="/ai-news/business"
                  element={<BusinessNewsPage newsData={businessNewsData} />}
                />
                <Route
                  path="/ai-news/exchange"
                  element={<ExchangeNewsPage newsData={exchangeNewsData} />}
                />
                <Route
                  path="/ai-news/topic"
                  element={<TopicNewsPage newsData={topicNewsData} />}
                />
                <Route
                  path="/ai-news/post-detail/:postId"
                  element={<PostDetailPage newsData={allNewsData} />}
                />
                <Route
                  path="/ai-news/topic/:topic"
                  element={<TopicDetailPage />}
                />
              </Routes>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
