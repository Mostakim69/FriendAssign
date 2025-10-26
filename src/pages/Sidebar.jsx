import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../provider/MyProvider";
import Swal from "sweetalert2";
import { LogOut } from "lucide-react";

const Sidebar = ({ closeSidebar }) => {
  const { user, logOut } = useContext(AuthContext);

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
    <aside className="h-screen w-64 bg-white border-r border-gray-200 shadow-lg p-5 flex flex-col justify-between">
      {/* Logo */}
      <div className="flex justify-center py-4">
        <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
      </div>

      {/* Menu Links */}
      <ul className="flex-1 overflow-y-auto flex flex-col gap-3">
        {links.map(({ to, text, icon }, i) => (
          <NavItem key={i} to={to} text={text} icon={icon} onClick={closeSidebar} />
        ))}
      </ul>

      {/* Logout */}
      <div className="flex justify-center mt-4">
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
