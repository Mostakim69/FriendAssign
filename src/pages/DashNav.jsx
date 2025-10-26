import React, { useContext } from "react";
import { Bell, Menu } from "lucide-react";
import { AuthContext } from "../provider/MyProvider";

const DashNav = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext) || {};

  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 transition-all duration-300">
      {/* Left: Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Center: Welcome Text */}
      <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
        Welcome to <span className="text-blue-600">Dashboard</span>
      </h1>

      {/* Right: Notifications & User */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notification */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-6 h-6 text-gray-700" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            2
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:block text-gray-700 font-medium truncate max-w-[100px]">
            {user?.displayName || "Guest"}
          </span>
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 object-cover cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
