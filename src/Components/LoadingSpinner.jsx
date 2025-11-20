import React from 'react';

const LoadingSpinner = ({ message = 'Loading, please wait...' }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">{message}</p>
    </div>
  );
};

export default LoadingSpinner;