import React from 'react';
import Car from '../../assets/dodge_challenger_srt_hellcat_redeye_widebody_jailbreak_2022_4k_8k_2-HD.jpg';

const Banner = () => {
    return (
        <div className='mt-[-10] absolute z-3'>
            <img src={Car} alt="" />
        </div>
    );
};

export default Banner;