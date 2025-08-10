import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Sidebar from '../pages/Sidebar';

const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar></Navbar>
            </header>
            <div className="flex flex-1">
                <Sidebar />
                <main className="ml-64 flex-1 p-6">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;