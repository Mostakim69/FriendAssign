import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/Sidebar";
import DashNav from "../pages/DashNav";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div className="flex flex-col flex-1 md:ml-64 transition-all duration-300">
        {/* Top Navbar (starts where sidebar ends) */}
        <header className="fixed top-0 left-0 md:left-64 right-0 z-40">
          <DashNav />
        </header>

        {/* Main Content */}
        <main
          className="
            flex-1 
            mt-[64px] md:mt-[70px] 
            p-4 sm:p-6 md:p-8 
            overflow-y-auto
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
