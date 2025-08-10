import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const ErrorPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Smooth section scroll handler
  const handleSectionClick = (sectionId, e, path = '/') => {
    e.preventDefault();
    if (path === '/') {
      if (location.pathname === '/') {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate('/');
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-sm max-md:px-4 overflow-hidden">
      {/* 404 Number Animation */}
      <motion.h1
        className="text-8xl md:text-9xl font-bold text-indigo-500"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
      >
        404
      </motion.h1>

      {/* Divider Line */}
      <motion.div
        className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "4rem", opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      ></motion.div>

      {/* Page Not Found Text */}
      <motion.p
        className="text-2xl md:text-3xl font-bold text-gray-800"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Page Not Found
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-sm md:text-base mt-4 text-gray-500 max-w-md text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        The page you are looking for might have been removed, had its name changed, 
        or is temporarily unavailable.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className="flex items-center gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <motion.a
          href="/"
          onClick={(e) => handleSectionClick('home', e, '/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary px-7 py-2.5 text-white rounded-md transition-all shadow-md"
        >
          Return Home
        </motion.a>
        <motion.a
          href="#contact-section"
          onClick={(e) => handleSectionClick('contact-section', e, '/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-gray-300 px-7 py-2.5 text-gray-800 rounded-md transition-all shadow-md"
        >
          Contact Support
        </motion.a>
      </motion.div>
    </div>
  );
};

export default ErrorPage;