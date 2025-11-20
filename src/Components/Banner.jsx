import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const styles = `
  .animate-text {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
  }

  .swiper-slide-active .animate-text {
    opacity: 1;
    transform: translateX(0);
  }

  .animate-text-delay-1 { transition-delay: 0.2s; }
  .animate-text-delay-2 { transition-delay: 0.4s; }
  .animate-text-delay-3 { transition-delay: 0.6s; }
  .animate-text-delay-4 { transition-delay: 0.8s; }
`;

const Banner = () => {
  const backgroundImages = [
    'https://i.postimg.cc/8z0M3rWh/2da25831d964b7709792167ff70125f6.jpg',
    'https://i.postimg.cc/y6frBM1M/7.webp',
    'https://i.postimg.cc/T39nc42H/b85aa0566b1aaf123c3b7b000c2e4cfc.jpg',
  ];

  const styleRef = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!styleRef.current) {
      const styleSheet = document.createElement('style');
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
      styleRef.current = true;
    }
  }, []);

  const handleCreateClick = () => {
    navigate('/assignments');
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="w-full mt-18"
      style={{ aspectRatio: '16 / 9', maxHeight: '75vh' }}
    >
      {backgroundImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative w-full h-full object-cover"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 lg:px-20 text-white">
              <h1 className="mb-5 font-extrabold animate-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                <span className="text-blue-400">Study Together.</span> Learn Better.
              </h1>
              <p className="mb-4 font-semibold animate-text animate-text-delay-1 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
                Collaborate with friends, share assignments, and grow together in an engaging online study environment.
              </p>
              <div className="mb-2 max-w-md mx-auto sm:max-w-lg">
                <p className="flex items-center space-x-2 mb-2 animate-text animate-text-delay-2 text-sm sm:text-base md:text-lg">
                  <span>✅ Create & Join Study Groups</span>
                </p>
                <p className="flex items-center space-x-2 animate-text animate-text-delay-3 text-sm sm:text-base md:text-lg">
                  <span>✅ Submit and Grade Assignments</span>
                </p>
              </div>
              <button
                onClick={handleCreateClick}
                className="mt-4 animate-text btn btn-primary animate-text-delay-4 px-6 py-3 text-sm sm:text-base md:text-lg rounded text-white transition"
              >
                👉 View All Assignments
              </button>
            </div>

            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <svg
                className="animate-bounce w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
