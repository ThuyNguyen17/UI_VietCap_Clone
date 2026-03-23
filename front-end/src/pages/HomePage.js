import React, { useState } from "react";

import HeroSection from "../components/Dashboard/Home/HeroSection";
import QuickAccess from "../components/Dashboard/Home/QuickAccess";
import VietcapInsights from "../components/Dashboard/Home/VietcapInsights";
import RatingStructure from "../components/Dashboard/Home/RatingStructure";
import TopMovers from "../components/Dashboard/Home/TopMovers";
import AssetPerformance from "../components/Dashboard/Home/AssetPerformance";
import AINew from "../components/Dashboard/Home/AINew";
import UpcomingEvents from "../components/Dashboard/Home/UpcomingEvents";
import AIInsights from "../components/Dashboard/Home/AIInsights";
import TradeIdeasModal from "../components/VietCapInsight/TradeIdeasModal";
import NewMarkeModal from "../components/VietCapInsight/NewMarkeModal";

const HomePage = () => {
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [selectedNew, setSelectedNew] = useState(null);
  const handleCardClick = (idea) => {
    setSelectedIdea(idea);
  };
  const handleNewsClick = (news) => {
    setSelectedNew(news);
  };

  const handleCloseModal = () => {
    setSelectedIdea(null);
  };

  return (
    <>

      <div className="bg-black px-5 pt-5 flex flex-wrap gap-5 items-stretch">
        <div className="flex-1 min-w-[300px] lg:max-w-[66%]">
          <HeroSection />
        </div>
        <div className="flex-1 min-w-[250px] lg:max-w-[33%]">
          <QuickAccess />
        </div>
      </div>

      {/* Các block bên dưới chia đều thành 3 cột */}
      <div className="bg-black p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <VietcapInsights onCardClick={handleCardClick} onNewsClick={handleNewsClick} />
        </div>
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <RatingStructure />
        </div>
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <TopMovers />
        </div>
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <AINew />
        </div>
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <UpcomingEvents />
        </div>
        <div className="h-[500px] overflow-y-auto rounded-lg">
          <AIInsights />
        </div>
      </div>

      {/* ✅ Modal luôn nằm ở root để không bị giới hạn chiều cao */}
      <TradeIdeasModal idea={selectedIdea} onClose={handleCloseModal} />
      {selectedNew && (
        <NewMarkeModal news={selectedNew} onClose={() => setSelectedNew(null)} />
      )}
      
    </>
  );
};

export default HomePage;
