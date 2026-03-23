import React from 'react';
import '../../assets/css/ChartSection.css';

const ChartSection = () => {
  return (
    <section id="chart" className="chart-section">
      <div className="overlay" />
      <div className="container content">
        <h2 className="section-title">Biểu đồ nến Nhật trực tiếp</h2>
        <p className="section-subtitle">Theo dõi thị trường với dữ liệu thời gian thực</p>
        
        <div className="chart-container">
          <iframe
            src="https://s.tradingview.com/widgetembed/?symbol=NASDAQ%3AAAPL&interval=D&theme=dark&style=1"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allowtransparency="true"
            scrolling="no"
            title="TradingView"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ChartSection;
