import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import DashNav from "../pages/DashNav";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Toggle sidebar (mobile)
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside (mobile)
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 z-50 h-screen w-64 transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-64"} md:hidden`}
      >
        <Sidebar />
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Main Section */}
      <div className="flex flex-col flex-1 md:ml-64 transition-all duration-300">
        {/* Top Navbar */}
        <header className="fixed top-0 left-0 md:left-64 right-0 z-40">
          <DashNav toggleSidebar={toggleSidebar} />
        </header>

        {/* Main Content */}
        <main className="flex-1 mt-[64px] md:mt-[70px] p-4 sm:p-6 md:p-8 overflow-y-auto bg-[#eff3f4]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
