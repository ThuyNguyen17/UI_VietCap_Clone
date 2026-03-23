import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiZap, FiCpu, FiGift, FiTrendingUp, FiUsers } from 'react-icons/fi';

const quickAccessItems = [
  {
    label: 'Vietcap IQ',
    icon: <FiCpu size={24} color="#38bdf8" />,
    link: '/iq/coverage',
  },
  {
    label: 'Vietcap AI News',
    icon: <FiZap size={24} color="#facc15" />,
    link: '/ai-news',
  },
  {
    label: 'Vietcap Rewards',
    icon: <FiGift size={24} color="#22c55e" />,
    link: '/price-board/utilities/rewards-program',
  },
  {
    label: 'Margin Products',
    icon: <FiTrendingUp size={24} color="#f97316" />,
    link: '/price-board/utilities/margin-management',
  },
  {
    label: 'Refer a Friend',
    icon: <FiUsers size={24} color="#3b82f6" />,
    link: '/price-board/utilities/referral-program',
  },
];

export default function QuickAccessSlider() {
  return (
    <div className="bg-[#1a1a1a] p-5 rounded-xl shadow-lg h-full">
      <h2 className="text-2xl font-extrabold mb-3 text-yellow-400 text-center">Quick Access</h2>
      <p className="text-gray-400 text-sm mb-6 text-center">Explore featured functions from Vietcap</p>

      <Swiper
        spaceBetween={16}
        slidesPerView={3.2}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="w-full"
        style={{ paddingBottom: '32px' }}
        freeMode={true}
        grabCursor={true}
        simulateTouch={true}
      >
        {quickAccessItems.map((item, idx) => (
          <SwiperSlide key={idx}>
            <a
              href={item.link}
              className="flex flex-col items-center rounded-lg transition hover:bg-[#22305a] p-4"
            >
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ backgroundColor: '#2a2a2a' }}
              >
                {item.icon}
              </div>

              <span className="text-white text-sm text-center font-semibold leading-tight">
                {item.label}
              </span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
