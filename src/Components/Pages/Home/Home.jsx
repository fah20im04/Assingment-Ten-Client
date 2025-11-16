import React from 'react';
import Banner from '../../Banner/Banner';
import VehicleCard from '../Cards/VehicleCard';
import useTheme from '../../Theame/useTheme';

const Home = () => {
     const {theme,toggleTheme} = useTheme();
    return (
        <div className='bg-white dark:bg-darkBg dark:text-white'>
            <Banner></Banner>
            <h2 className='font-bold text-5xl text-center mt-10'>Model Vehicle</h2>
            <VehicleCard></VehicleCard>
        </div>

    );
};

export default Home;