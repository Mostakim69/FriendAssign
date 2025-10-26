import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/MyProvider";
import Swal from "sweetalert2";
import { FiMenu, FiX } from "react-icons/fi";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await logOut();
          Swal.fire("Logged out!", "You have been logged out.", "success");
        } catch (error) {
          Swal.fire("Error", error.message, "error");
        }
      }
    });
  };

  const links = [
    { to: "/", text: "Home", icon: "🏠" },
    { to: "/dashb/dashboard", text: "Overview", icon: "📊" },
    { to: "/dashb/profile", text: "Profile", icon: "👤" },
    { to: "/dashb/pending-assignments", text: "Pending Assignments", icon: "⏳" },
    { to: "/dashb/create-assignments", text: "Create Assignments", icon: "✍️" },
    { to: "/dashb/my-group", text: "My Attempted Assignments", icon: "📚" },
  ];

  if (!user) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/70 backdrop-blur-md rounded-md shadow-md hover:bg-white/90 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-lg p-5 flex flex-col justify-between z-40 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex justify-center py-4">
          <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
        </div>

        {/* Menu Links */}
        <ul className="flex-1 overflow-y-auto flex flex-col gap-3">
          {links.map(({ to, text, icon }, i) => (
            <NavItem key={i} to={to} text={text} icon={icon} onClick={() => setIsOpen(false)} />
          ))}
        </ul>

        {/* Logout Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLogout}
            className="flex gap-2 items-center px-3 py-2 rounded-xl w-full justify-center ease-soft-spring duration-400 transition-all text-red-600 font-semibold hover:bg-red-50 hover:text-red-700 cursor-pointer"
          >
            <LogOut className="h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/30 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  );
};

// NavItem Component
function NavItem({ to, text, icon, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-xl font-semibold transition-all duration-300
        ${isActive ? "bg-indigo-400 text-white shadow-lg" : "bg-white text-gray-800 hover:bg-indigo-50 hover:text-indigo-600"}`
      }
    >
      <span className="text-lg">{icon}</span>
      {text}
    </NavLink>
  );
}

export default Sidebar;
