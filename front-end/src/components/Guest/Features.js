import React from 'react';
import '../../assets/css/Features.css';
import { FaChartLine, FaClock, FaUserAlt } from 'react-icons/fa';

const features = [
  {
    title: "AI-Powered Predictions",
    description: "Get stock forecasts powered by advanced machine learning models for higher accuracy.",
    icon: <FaChartLine className="feature-icon" />,
    image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-46-1.jpg",
    backgroundImage: "https://nhattientuu.com/wp-content/uploads/2020/08/hinh-anh-dep-12.jpg"
  },
  {
    title: "Real-Time Alerts",
    description: "Receive instant notifications when market conditions change or new signals are generated.",
    icon: <FaUserAlt className="feature-icon" />,
    image: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80",
    backgroundImage: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Portfolio Tracking",
    description: "Easily monitor your investments and see how our predictions perform on your portfolio.",
    icon: <FaClock className="feature-icon" />,
    image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-46-1.jpg",
    backgroundImage: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-46-1.jpg"
  },
  {
    title: "Comprehensive Analytics",
    description: "Access in-depth market data, news, and analytics to make informed decisions.",
    icon: <FaChartLine className="feature-icon" />,
    image: "https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/hinh-nen-may-tinh-dep-a-46-1.jpg",
    backgroundImage: "https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80"
  }
];

const Features = () => {
  return (
    <section id="home" className="features-section">
      <div className="section-header">
        <h2>Comprehensive exploration tool</h2>
        <p>Explore the powerful features that support your investment decisions.</p>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <div
            key={index}
            className="feature-card"
            style={{ backgroundImage: `url(${feature.backgroundImage})` }}
          >
            <div className="feature-content">
              <div className="icon-wrapper">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <div className="expanded-content">
                <img src={feature.image} alt={feature.title} className="feature-image" />
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;