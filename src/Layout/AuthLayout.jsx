import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar></Navbar>
            </header>
            <div className="flex flex-1">
                <main className="mx-auto flex-1 p-6">
                    <Outlet></Outlet>
                </main>
            </div>
        </div>
    );
};

export default AuthLayout;