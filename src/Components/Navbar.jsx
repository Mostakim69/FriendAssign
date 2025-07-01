import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isNavLoading, setIsNavLoading] = useState(false);

  // Handle theme toggle and persist to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync activeSection with route changes
  useEffect(() => {
    const pathToSectionMap = {
      '/': 'home',
      '/assignments': 'subscription-services',
      '/auth/pending-assignments': 'pending-assignments',
      '/auth/create-assignments': 'create-assignments',
      '/contact': 'contact',
      '/profile': 'profile',
      '/auth/my-group': 'my-group',
    };
    const currentSection = pathToSectionMap[location.pathname] || '';
    setActiveSection(currentSection);
  }, [location.pathname]);

  const handleThemeToggle = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire('Success', 'Logged Out successful!', 'success');
        navigate('/auth/login');
      })
      .catch((error) => Swal.fire('Error', error.message, 'error'));
  };

  const handleSectionClick = (sectionId, e, path = '/') => {
    e.preventDefault();
    setIsNavLoading(true);
    setActiveSection(sectionId);
    setTimeout(() => {
      if (path === '/' && sectionId !== 'home') {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate(path);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(path);
      }
      setIsNavLoading(false);
    }, 500);
  };

  const handleGroupClick = (e, path, message, sectionId) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    if (user) {
      setActiveSection(sectionId);
      setIsNavLoading(true);
      setTimeout(() => {
        navigate(path);
        setIsNavLoading(false);
      }, 500);
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: message,
        confirmButtonText: 'Go to Login',
      }).then(() => navigate('/auth/login'));
    }
  };

  // Filter links based on user authentication
  const links = [
    { id: 'home', label: 'Home', path: '/', isNavLink: true },
    { id: 'subscription-services', label: 'All Assignments', path: '/assignments', isNavLink: true },
    {
      id: 'pending-assignments',
      label: 'Pending',
      path: '/auth/pending-assignments',
      isNavLink: true,
      requiresAuth: true,
      message: 'Please log in to view pending assignments!',
    },
    {
      id: 'create-assignments',
      label: 'Create',
      path: '/auth/create-assignments',
      isNavLink: true,
      requiresAuth: true,
      message: 'Please log in to create assignments!',
    },
    { id: 'benifit-section', label: 'Features', path: '/' },
    { id: 'faq-section', label: 'FAQ', path: '/' },
    { id: 'contact', label: 'Contact', path: '/contact', isNavLink: true },
  ]
    .filter(({ requiresAuth }) => !requiresAuth || (requiresAuth && user))
    .map(({ id, label, path, isNavLink, requiresAuth, message }) => (
      <li key={id} className="text-lg hover:text-blue-800 transition">
        {isNavLink && requiresAuth ? (
          <a
            href={path}
            onClick={(e) => handleGroupClick(e, path, message, id)}
            className={`mx-1 ${activeSection === id ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
          >
            {label}
          </a>
        ) : (
          <a
            href={path}
            onClick={(e) => handleSectionClick(id, e, path)}
            className={`mx-1 ${activeSection === id ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
          >
            {label}
          </a>
        )}
      </li>
    ));

  // Dropdown menu component
  const ProfileDropdown = () => (
    <ul className="absolute right-0 mt-2 w-48 bg-base-100 rounded-box shadow-lg z-50">
      <li className="text-lg hover:text-blue-800 transition">
        <a
          href="/profile"
          onClick={(e) => handleSectionClick('profile', e, '/profile')}
          className={activeSection === 'profile' ? 'text-blue-600 border-b-2 border-blue-600 block p-2' : 'block p-2'}
        >
          Profile
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a
          href="/auth/create-assignments"
          onClick={(e) => handleSectionClick('create-assignments', e, '/auth/create-assignments')}
          className={activeSection === 'create-assignments' ? 'text-blue-600 border-b-2 border-blue-600 block p-2' : 'block p-2'}
        >
          Create Assignments
        </a>
      </li>
      <li className="text-lg hover:text-blue-800 transition">
        <a
          href="/auth/my-group"
          onClick={(e) => handleGroupClick(e, '/auth/my-group', 'Please log in to view your groups!', 'my-group')}
          className={activeSection === 'my-group' ? 'text-blue-600 border-b-2 border-blue-600 block p-2' : 'block p-2'}
        >
          My Attempted Assignments
        </a>
      </li>
    </ul>
  );

  return (
    <div className="navbar bg-base-100 mx-auto px-8 md:px-12 lg:px-16 xl:px-24 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-1">
            {links}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl text-blue-600 flex items-center gap-2">
          <img
            src="https://i.postimg.cc/CKCqVyqL/955c908b389c6e5ce3763541477c609c.jpg"
            alt="logo-icon"
            className="h-10 w-10 rounded-full"
          />
          <span className="hidden md:inline">FriendAssign</span>
        </NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end space-x-4">
        {isNavLoading || loading ? (
          <div className="loading loading-spinner text-primary"></div>
        ) : user ? (
          <>
            <div className="relative">
              <img
                src={user.photoURL || 'https://i.postimg.cc/FsGnTCZM/a315ddcdff8d5f80ec702cb4553c9589.jpg'}
                alt="User profile"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              <span className="absolute hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2 top-1/2 -left-40 transform -translate-y-1/2">
                {user.displayName || 'User'}
              </span>
              {isDropdownOpen && <ProfileDropdown />}
            </div>
            <button onClick={handleLogout} className="btn btn-primary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth/login" className="btn btn-primary btn-sm">
            Login
          </NavLink>
        )}
        <label className="swap swap-rotate ml-4">
          <input
            type="checkbox"
            className="theme-controller"
            checked={theme === 'dark'}
            onChange={handleThemeToggle}
          />
          <svg
            className="swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;