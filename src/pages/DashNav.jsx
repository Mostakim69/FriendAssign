import React, { useContext } from "react";
import { Bell } from "lucide-react";
import { AuthContext } from "../provider/MyProvider";

const DashNav = () => {
  const { user } = useContext(AuthContext) || {};

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 z-50 flex justify-between items-center px-4 md:px-8 py-3 transition-all duration-300">
      {/* Left Section */}
      <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white select-none">
        Welcome <span className="text-blue-600">Dashboard</span>
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Button */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            3
          </span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 md:gap-3">
          <span className="hidden sm:inline text-gray-700 dark:text-gray-200 font-medium">
            {user?.displayName || "User Name"}
          </span>
          <img
            src={
              user?.photoURL ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="User Avatar"
            className="w-9 h-9 rounded-full border border-gray-300 dark:border-gray-700 object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default DashNav;
