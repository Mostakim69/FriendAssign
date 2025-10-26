import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../pages/Sidebar';
import DashNav from '../pages/DashNav';

const DashboardLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <DashNav />
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

export default DashboardLayout;