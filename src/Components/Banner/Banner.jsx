import React from 'react';
import Car from '../../assets/dodge_challenger_srt_hellcat_redeye_widebody_jailbreak_2022_4k_8k_2-HD.jpg';

const Banner = () => {
    return (
        <div>
            <div className="relative mt-[-90px]">
                <img
                    src={Car}
                    alt="Car"
                    className="w-full h-fit object-cover"
                />
                {/* Optional overlay for blending */}
                <div className="absolute inset-0 bg-opacity-30"></div>
            </div>
            {/* Hero Text */}


        </div>

    );
};

export default Banner;