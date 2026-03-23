import StockTickerStrip from '../components/Dashboard/News/StockTickerStrip';
import Header from '../components/Header/Header';
import NewsSection from '../components/News/NewsSection';
import { useState } from 'react';

function NewsPage({businessnews,topicnews,exchangenews}) {
  const [activeIndex, setActiveIndex] = useState('hose');

  return (
    <div className="min-h-screen bg-[#121212]">
      <Header />
      <StockTickerStrip 
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <NewsSection 
        businessnews={businessnews} topicnews={topicnews} exchangenews={exchangenews}
      />
    </div>
  );
}

export default NewsPage;