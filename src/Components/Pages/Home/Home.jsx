import React from 'react';
import Banner from '../../Banner/Banner';
import VehicleCard from '../Cards/VehicleCard';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <h2 className='font-bold text-5xl text-center mt-10'>Model Vehicle</h2>
            <VehicleCard></VehicleCard>
        </div>

    );
};

export default Home;