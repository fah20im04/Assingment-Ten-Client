import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../../index.css';
import { HiMenu, HiX } from 'react-icons/hi';
import SearchBar from './SearchBar';
import { AuthContext } from '../Auth/AuthContext';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);

    return (
        <div className="relative w-full">
            {/* Mobile menu */}
            {menuOpen && (
                <div className="md:hidden absolute text-gray-400 top-20 left-2/3 transform -translate-x-1/2 w-[30%] max-w-xs rounded-2xl shadow-xl border border-gray-600 z-30">
                    <ul className="flex flex-col gap-1 p-3 font-semibold">
                        <li>
                            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to="/addVehicle" onClick={() => setMenuOpen(false)}>Add Vehicle</NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/allVehicles" onClick={() => setMenuOpen(false)}>All Vehicles</NavLink>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/myVehicles" onClick={() => setMenuOpen(false)}>My Vehicles</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/myBookings" onClick={() => setMenuOpen(false)}>My Bookings</NavLink>
                                </li>
                            </>
                        )}
                        {!user && (
                            <li>
                                <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Navbar */}
            <div className="flex justify-between items-center px-6 md:px-12 py-4 z-20 relative">
                {/* Logo */}
                <div className="bg-none bg-opacity-0 p-3 rounded-2xl shadow-md border border-gray-300 w-fit">
                    <a href="/" className="font-bold text-2xl">
                        TRA<span className="text-primary">VELE</span>ASE
                    </a>
                </div>

                {/* Desktop menu */}
                <div className="hidden md:flex bg-opacity-80 p-4 rounded-2xl w-fit shadow-md flex border border-gray-300 gap-6 font-semibold text-black text-sm h-10">
                    <ul className="flex items-center text-center gap-6 text-sm list-none p-0 m-0">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        {user && (
                            <li>
                                <NavLink to="/addVehicle">Add Vehicle</NavLink>
                            </li>
                        )}
                        <li>
                            <NavLink to="/allVehicles">All Vehicles</NavLink>
                        </li>
                        {user && (
                            <>
                                <li>
                                    <NavLink to="/myVehicles">My Vehicles</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/myBookings">My Bookings</NavLink>
                                </li>
                            </>
                        )}
                        {!user && (
                            <li>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Search bar */}
                <SearchBar />

                {/* Login / Logout */}
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <button
                                title={user.displayName}
                                onClick={logOut}
                                className="bg-red-500 bg-opacity-90 rounded-2xl font-bold text-xl text-white border-gray-300 transform transition-transform duration-300 hover:scale-105 px-6 py-2"
                            >
                                LogOut
                            </button>
                            <img
                                src={user.photoURL}
                                alt="Profile"
                                className="w-10 h-10 rounded-full border-2 border-white"
                            />

                        </>

                    ) : (
                        <Link
                            to="/login"
                            className="bg-primary bg-opacity-90 rounded-2xl font-bold text-xl text-white border-gray-300 transform transition-transform duration-300 hover:scale-105 px-6 py-2"
                        >
                            LogIn
                        </Link>
                    )}


                    {/* Mobile hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-black text-3xl"
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
