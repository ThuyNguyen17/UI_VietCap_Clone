import React, { useState, useEffect } from "react";

const images = [
  "https://www.vietcap.com.vn/api/cms-api/uploads/sliders/202504/blank1804web-trading-2664x720.png",
  "https://www.vietcap.com.vn/api/cms-api/uploads/sliders/202503/Brandcamp_Home%20banner.png",
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // đổi ảnh sau mỗi 4 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden shadow-lg h-full">
      <img
        src={images[index]}
        alt={`Slide ${index + 1}`}
        className="w-full object-cover transition-opacity duration-1000"
      />
      {/* Optional: nút chuyển tay */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === i ? "bg-yellow-400" : "bg-white/40"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
