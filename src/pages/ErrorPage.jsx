import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-semibold mb-4">404 - Page Not Found</h1>
        <p className=" mb-6">Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;