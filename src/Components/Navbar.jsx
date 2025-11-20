import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../provider/MyProvider";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const dropdownRef = useRef(null);

  // Persist theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Track active route/section
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith("/dashb/dashboard")) setActiveSection("dashboard");
    else if (path.startsWith("/dashb/profile")) setActiveSection("profile");
    else if (path.startsWith("/dashb/my-group")) setActiveSection("my-group");
    else if (path === "/assignments") setActiveSection("assignments");
    else if (path === "/") setActiveSection("home");
    else setActiveSection("");
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Disable scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleThemeToggle = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire("Success", "Logged out successfully!", "success");
      navigate("/auth/login");
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    }
  };


  const handleSectionClick = (e, id, path = "/") => {
    e.preventDefault();
    setActiveSection(id);

    if (path === "/" && document.getElementById(id)) {
      document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    } else if (path === "/") {
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById(id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsMenuOpen(false);
  };

  const handleProtectedNav = (e, id, path) => {
    e.preventDefault();
    if (user) handleSectionClick(e, id, path);
    else {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please log in to access this page!",
        confirmButtonText: "Go to Login",
      }).then(() => navigate("/auth/login"));
    }
  };

  const links = [
    { id: "home", label: "Home", path: "/" },
    { id: "assignments", label: "All Assignments", path: "/assignments" },
    { id: "dashboard", label: "Dashboard", path: "/dashb/dashboard", requiresAuth: true },
    { id: "faq-section", label: "FAQ", path: "/" },
    { id: "contact-section", label: "Contact", path: "/" },
  ];

  const renderLinks = (isMobile = false) =>
    links.map(({ id, label, path, requiresAuth }) => {
      const isActive = activeSection === id;
      const classes = `${isActive ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-base-content"
        } transition-colors duration-300 ${isMobile ? "w-full text-left py-2" : "px-4 relative group"}`;

      const underline = (
        <span
          className={`absolute left-0 -bottom-1 h-[2px] bg-blue-600 dark:bg-blue-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full group-hover:opacity-70"}`}
        />
      );

      return (
        <li key={id} className="relative">
          {requiresAuth ? (
            <button onClick={(e) => handleProtectedNav(e, id, path)} className={classes}>
              {label}
              {!isMobile && underline}
            </button>
          ) : (
            <button onClick={(e) => handleSectionClick(e, id, path)} className={classes}>
              {label}
              {!isMobile && underline}
            </button>
          )}
        </li>
      );
    });

  return (
    <div className="navbar fixed top-0 left-0 right-0 bg-base-100 shadow-sm z-50 px-4 md:px-8 lg:px-16 transition-all duration-300">
      {/* Left: Logo & Hamburger */}
      <div className="navbar-start flex items-center gap-2">
        <button
          className="btn btn-ghost lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <Link to="/" className="btn btn-ghost text-xl flex items-center gap-2" onClick={(e) => handleSectionClick(e, "home", "/")}>
          <img
            src="https://i.postimg.cc/CKCqVyqL/955c908b389c6e5ce3763541477c609c.jpg"
            alt="logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="hidden md:inline font-bold">FriendAssign</span>
        </Link>
      </div>

      {/* Center: Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg font-medium space-x-2">{renderLinks()}</ul>
      </div>


      {/* Right: Profile + Theme */}

      <div className="navbar-end flex items-center space-x-3">

        {/* Theme toggle */}
        <label className="swap swap-rotate cursor-pointer">
          <input type="checkbox" checked={theme === "dark"} onChange={handleThemeToggle} aria-label="Toggle theme" />
          <svg className="swap-off h-7 w-7 fill-current text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M5.64 17l-.71.71a1 1 0 0 0 1.42 1.42l.71-.71A8 8 0 1 0 12 4a8 8 0 0 0-6.36 13z" />
          </svg>
          <svg className="swap-on h-7 w-7 fill-current text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-9.49-9.49 1 1 0 0 0-1.19-1.19A10 10 0 1 0 22 14.05a1 1 0 0 0-.36-1.05z" />
          </svg>
        </label>
        {loading ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : user ? (
          <>
            <div className="relative profile-dropdown" ref={dropdownRef}>
              <img
                src={user.photoURL || "https://i.postimg.cc/FsGnTCZM/a315ddcdff8d5f80ec702cb4553c9589.jpg"}
                alt="User profile"
                className="h-10 w-10 rounded-full cursor-pointer border border-base-300 hover:scale-105 transition"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-52 bg-base-100 text-base-content rounded-box shadow-lg z-50">
                  <li>
                    <Link to="/dashb/profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-base-200">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashb/my-group" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-base-200">
                      My Attempted Assignments
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashb/dashboard" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 hover:bg-base-200">
                      Dashboard
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <button onClick={handleLogout} className="btn btn-primary btn-sm">
              Logout
            </button>
          </>
        ) : (
          <Link to="/auth/login" className="btn btn-primary">Login</Link>
        )}
      </div>


      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-base-100 shadow-md p-4 lg:hidden">
          <ul className="space-y-2 text-lg font-medium">{renderLinks(true)}</ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
