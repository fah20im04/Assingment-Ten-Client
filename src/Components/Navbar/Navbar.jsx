import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../../index.css';
import Car from '../../assets/dodge_challenger_srt_hellcat_redeye_widebody_jailbreak_2022_4k_8k_2-HD.jpg';
import { HiMenu, HiX } from 'react-icons/hi'; // Hamburger icons
import SearchBar from './SearchBar';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            {menuOpen && (
                <div className="md:hidden absolute text-gray-300 top-20 left-[330px] w-[150px] rounded-2xl shadow-xl bg-opacity-10  border border-gray-600 z-30">
                    <ul className="flex flex-col gap-1 p-3  font-semibold">
                        <li>
                            <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/addVehicle" onClick={() => setMenuOpen(false)}>Add Vehicle</NavLink>
                        </li>
                        <li>
                            <NavLink to="/allVehicles" onClick={() => setMenuOpen(false)}>All Vehicles</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myVehicles" onClick={() => setMenuOpen(false)}>My Vehicles</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myBookings" onClick={() => setMenuOpen(false)}>My Bookings</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" onClick={() => setMenuOpen(false)}>Register</NavLink>
                        </li>

                    </ul>
                </div>
            )}
            {/* Car Background Image */}
            <div className="absolute inset-0">
                <img
                    src={Car}
                    alt="Car"
                    className="w-full h-fit object-cover"
                />
                {/* Optional overlay for blending */}
                <div className="absolute inset-0 bg-opacity-30"></div>
            </div>





            {/* Navbar */}
            <div className="flex justify-between items-center px-6 md:px-12 py-4 z-20 relative">



                {/* Logo */}
                <div className="bg-none bg-opacity-0 p-3 rounded-2xl shadow-md border border-gray-300 w-fit">
                    <a href="/" className="font-bold text-2xl">
                        TRA<span className="text-primary">VELE</span>ASE
                    </a>
                </div>

                





                {/* Navlinks (hidden on sm/md, visible on lg+) */}
                <div className="hidden md:flex bg-[#d6ccc2] bg-opacity-80 p-4 rounded-2xl w-fit shadow-md flex border border-gray-300 gap-6 font-semibold text-gray-400 text-sm h-10">
                    <ul className="flex items-center text-center gap-6 list-none p-0 m-0">
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/addVehicle">Add Vehicle</NavLink>
                        </li>
                        <li>
                            <NavLink to="/allVehicles">All Vehicles</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myVehicles">My Vehicles</NavLink>
                        </li>
                        <li>
                            <NavLink to="/myBookings">My Bookings</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Register</NavLink>
                        </li>
                    </ul>
                </div>

                <SearchBar></SearchBar>


                {/* Login */}
                <div className="flex items-center gap-4">
                    <button className="bg-primary bg-opacity-90 rounded-2xl font-bold text-xl text-white border-gray-300 transform transition-transform duration-300 hover:scale-105 px-6 py-2">
                        LogIn
                    </button>
                    {/* Hamburger icon next to LogIn */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-white text-3xl"
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

            </div>

            


            {/* Hero Text */}
            <div className="absolute items-end left-15 top-50 text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold">
                ___ Drive more                                     
                </h1>
                
            </div>
            <div className="absolute items-end top-120 left-200 text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold">
                                                   worry less ___
                </h1>
                
            </div>
        </div>
    );
};

export default Navbar;
