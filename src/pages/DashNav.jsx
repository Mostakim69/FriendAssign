import React, { useContext } from "react";
import { Bell, Menu } from "lucide-react";
import { AuthContext } from "../provider/MyProvider";

const DashNav = ({ toggleSidebar }) => {
  const { user } = useContext(AuthContext) || {};

  return (
    <section className="fixed w-full top-0 flex items-center gap-3 bg-white border-b px-4 py-3 z-50">
      {/* Left: Mobile Menu Button */}
      <div className="flex items-center md:hidden">
        <button onClick={toggleSidebar}>
          <Menu />
        </button>
      </div>

      <div className="flex justify-between items-center w-full md:pr-[260px]">
        {/* Welcome text (hidden on mobile) */}
        <h1 className="hidden sm:block text-lg md:text-xl font-semibold text-gray-800">
          Welcome to Dashboard
        </h1>

      {/* Right: Notifications & User */}
      <div className="flex items-center gap-4 ml-auto">
        {/* Notification */}
        <button className="relative cursor-pointer hover:text-blue-700 transition-colors">
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
      </div>
    </section>
  );
};

export default DashNav;
