import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/MyProvider";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      try {
        await logOut();
        Swal.fire("Logged out!", "You have been logged out.", "success");
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      }
    }
  };

  const links = [
    { to: "/", text: "Home", icon: "🏠" },
    { to: "/dashb/dashboard", text: "Overview", icon: "📊" },
    { to: "/dashb/profile", text: "Profile", icon: "👤" },
    { to: "/dashb/pending-assignments", text: "Pending Assignments", icon: "⏳" },
    { to: "/dashb/create-assignments", text: "Create Assignments", icon: "✍️" },
    { to: "/dashb/my-group", text: "My Attempted Assignments", icon: "📚" },
  ];

  if (!user) {
    return (
      <aside className="sticky top-0 flex flex-col items-center justify-center bg-white border-r px-5 py-3 h-screen w-64">
        <p className="text-gray-500">Please log in</p>
      </aside>
    );
  }

  return (
    <aside className="sticky top-0 flex flex-col gap-10 bg-white border-r px-5 py-3 h-screen overflow-hidden w-64 z-50">
      {/* Logo */}
      <div className="flex justify-center py-4">
        {/* You can use Image component or plain text */}
        <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
        {/* <Image src="/logo_3.webp" alt="Logo" width={110} height={40} /> */}
      </div>

      {/* Menu */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-4 scrollbar-none">
        {links.map((item, index) => (
          <NavItem key={index} item={item} onClick={closeSidebar} />
        ))}
      </ul>

      {/* Logout */}
      <div className="flex justify-center">
        <button
          onClick={handleLogout}
          className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center transition-all text-red-600 font-semibold hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </aside>
  );
};

// Nav Item Component
function NavItem({ item, onClick }) {
  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300
        ${isActive ? "bg-[#879fff] text-white" : "bg-white text-black hover:bg-indigo-50"}`
      }
    >
      <span className="text-lg">{item.icon}</span>
      {item.text}
    </NavLink>
  );
}

export default Sidebar;
