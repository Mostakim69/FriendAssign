import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    section ? section.scrollIntoView({ behavior: 'smooth' }) : navigate('/');
  };

  return (
    <footer className="bg-black-200/30 p-4 mt-12 sm:p-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center sm:items-start gap-6">
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <NavLink to="/" className="btn btn-ghost text-lg sm:text-xl text-blue-600 flex items-center gap-2 mb-2">
            <img src="https://i.postimg.cc/CKCqVyqL/955c908b389c6e5ce3763541477c609c.jpg" alt="logo" className="h-8 w-8 rounded-full" />
            FriendAssign
          </NavLink>
          <p className="text-lg max-w-xs">
            FriendAssign helps you connect with peers to collaborate on assignments.
          </p>
        </div>

        <nav className="w-full sm:w-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 text-center sm:text-left">
            <ul className="flex flex-col gap-2">
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <a href="#subscription-services" onClick={(e) => handleClick(e, 'subscription-services')}>
                  All Assignment
                </a>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <a href="#benifit-section" onClick={(e) => handleClick(e, 'benifit-section')}>
                  Features
                </a>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
            <ul className="flex flex-col gap-2">
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/terms">Terms</NavLink>
              </li>
              <li className="text-base sm:text-lg hover:text-blue-800 transition">
                <NavLink to="/privacy">Privacy Policy</NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-800 transition">
              <FaFacebook size={24} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className=" hover:text-red-500 transition">
              <FaYoutube size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className=" hover:text-red-500 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className=" hover:text-blue-800 transition">
              <FaTwitter size={24} />
            </a>
          </div>
        </div>
      </div>
      <aside className="text-center mt-6">
        <p className="text-xs sm:text-sm">© {new Date().getFullYear()} FriendAssign. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;