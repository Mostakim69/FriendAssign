import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/MyProvider';
import Swal from 'sweetalert2';

const Sidebar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

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
            .catch((error) => Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message,
                confirmButtonColor: '#3b82f6',
            }));
    };

    const links = [
        { to: '/', text: 'Home', icon: '🏠' },
        { to: '/auth/dashboard', text: 'Overview', icon: '📊' },
        { to: '/auth/profile', text: 'Profile', icon: '👤' },
        { to: '/auth/pending-assignments', text: 'Pending Assignments', icon: '⏳' },
        { to: '/auth/create-assignments', text: 'Create Assignments', icon: '✍️' },
        { to: '/auth/my-group', text: 'My Attempted Assignments', icon: '📚' },
    ];

    if (!user) return null;

    return (
        <div className="fixed top-0 left-0 w-60 bg-gray-800 h-screen rounded-lg text-white p-4 z-40 overflow-y-auto flex flex-col">
            <ul className="flex flex-col space-y-1 flex-grow mt-14">
                {links.map(({ to, text, icon }, i) => (
                    <li key={i}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                `flex items-center gap-2 py-2 px-4 rounded-md text-base font-medium transition-all duration-200 hover:bg-blue-400/10 hover:text-white ${isActive ? 'bg-blue-500 text-white' : 'text-gray-200'
                                }`
                            }
                        >
                            <span className="text-lg">{icon}</span>
                            {text}
                        </NavLink>
                    </li>
                ))}
            </ul>
            {user && (
                <button
                    onClick={handleLogout}
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white cursor-pointer font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-indigo-950"
                >
                    Logout
                </button>
            )}
        </div>
    );
};

export default Sidebar;