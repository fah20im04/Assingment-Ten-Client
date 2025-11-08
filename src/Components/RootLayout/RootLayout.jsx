import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router';
import Banner from '../Banner/Banner';

const RootLayout = () => {
    return (
        <div className='max-w-[1240px] mx-auto'>
            <Navbar></Navbar>
            {/* <Banner></Banner> */}
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;