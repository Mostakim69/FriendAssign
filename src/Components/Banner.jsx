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
    'https://i.postimg.cc/05nfnjtC/ca0d449facc7d06300497c212a147174.jpg',
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
    navigate('/assignments'); // Navigate directly to assignments page
  };

  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      navigation
      className="min-w-full mt-20"
      style={{ height: '70vh' }}
    >
      {backgroundImages.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative hero w-full h-[70vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-neutral-content text-center px-4 sm:px-6 md:px-12 lg:px-20">
              <div>
                <h1 className="mb-5 font-bold animate-text 
                               text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="text-blue-600">Study Together.</span> Learn Better.
                </h1>
                <p className="mb-4 font-bold animate-text animate-text-delay-1
                              text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
                  Collaborate with friends, share assignments, and grow together in an engaging online study environment.
                </p>
                <div className="mb-2 max-w-md mx-auto sm:max-w-lg">
                  <p className="flex items-center space-x-2 text-white mb-2 animate-text animate-text-delay-2 text-sm sm:text-base md:text-lg">
                    <span>✅ Create & Join Study Groups</span>
                  </p>
                  <p className="flex items-center space-x-2 text-white animate-text animate-text-delay-3 text-sm sm:text-base md:text-lg">
                    <span>✅ Submit and Grade Assignments</span>
                  </p>
                </div>
                <button
                  className="btn btn-primary mt-4 animate-text animate-text-delay-4 px-4 py-2 text-sm sm:text-base md:text-lg"
                  onClick={handleCreateClick}
                >
                  👉 View All Assignment
                </button>
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
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