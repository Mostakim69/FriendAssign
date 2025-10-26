import React, { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import DashNav from "../pages/DashNav";
import { useLocation } from "react-router";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();


  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    toggleSidebar();
  }, [location.pathname]);

  useEffect(() => {
    function handleClickOutsideEvent(event) {
      if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutsideEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideEvent);
    };
  }, []);

  return (
    <main className="flex relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:hidden ease-in-out transition-all duration-400 z-50 ${isOpen ? "translate-x-0" : "-translate-x-[260px]"
          }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <section className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <DashNav toggleSidebar={toggleSidebar} />
        <section className="pt-14 flex-1 bg-[#eff3f4]">
          <Outlet />
        </section>
      </section>
    </main>
  );
};

export default DashboardLayout;
