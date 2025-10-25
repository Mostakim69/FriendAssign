import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // Mobile toggle

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Logged out successfully!',
                    confirmButtonColor: '#3b82f6',
                });
                navigate('/auth/login');
            })
            .catch((error) =>
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor: '#3b82f6',
                })
            );
    };

    const links = [
        { to: '/', text: 'Home', icon: '🏠' },
        { to: '/dashb/dashboard', text: 'Overview', icon: '📊' },
        { to: '/dashb/profile', text: 'Profile', icon: '👤' },
        { to: '/dashb/pending-assignments', text: 'Pending Assignments', icon: '⏳' },
        { to: '/dashb/create-assignments', text: 'Create Assignments', icon: '✍️' },
        { to: '/dashb/my-group', text: 'My Attempted Assignments', icon: '📚' },
    ];

    if (!user) return null;

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white/20 backdrop-blur-md rounded-md shadow-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-screen w-60 md:w-64 z-40 p-4 flex flex-col bg-white/20 backdrop-blur-md border-r border-gray-300/20 transform transition-transform duration-300
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-8 hidden md:block">
                    Dashboard
                </h2>
                <ul className="flex flex-col space-y-2 flex-grow">
                    {links.map(({ to, text, icon }, i) => (
                        <li key={i}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 py-3 px-4 rounded-lg text-base font-medium transition-all duration-200
                                    ${
                                        isActive
                                            ? 'bg-blue-500 text-white shadow-md'
                                            : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
                                    }`
                                }
                                onClick={() => setIsOpen(false)} // Close sidebar on mobile link click
                            >
                                <span className="text-lg">{icon}</span>
                                {text}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={handleLogout}
                    className="mt-auto w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 font-medium"
                >
                    Logout
                </button>
            </div>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
