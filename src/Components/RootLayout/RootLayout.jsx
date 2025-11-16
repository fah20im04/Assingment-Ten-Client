import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';

const RootLayout = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme') === 'dark';
        setDarkMode(saved);
        if (saved) document.documentElement.classList.add('dark');
    }, []);

    const toggleTheme = () => {
        setDarkMode(prev => {
            const next = !prev;
            if (next) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', next ? 'dark' : 'light');
            return next;
        });
    }

    return (
        <div className="bg-white text-black min-h-screen transition-colors duration-300">
            <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
            <Outlet />
            <Footer />
        </div>
    )
}

export default RootLayout;
