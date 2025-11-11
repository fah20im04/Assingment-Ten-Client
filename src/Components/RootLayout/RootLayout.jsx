import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
import Banner from '../Banner/Banner';

const RootLayout = () => {

    return (
        <div className='max-w-[1440px] mx-auto'>

            <Navbar></Navbar>

            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;