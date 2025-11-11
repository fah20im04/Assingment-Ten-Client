import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const VehicleCard = () => {
    const [vehicles, setVehicles] = useState([]);

    // data fetch from server

    useEffect(() => {
        fetch('http://localhost:3000/vehicles')
            .then(res => res.json())
            .then((data) => setVehicles(data))
            .catch((error) => console.error('Error in vehiles data fetch', error));
    }, [])

    return (
        <div className="p-5">
            

            <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10 w-full max-w-7xl mx-auto">
                {vehicles.map((vehicle) => (
                    <div key={vehicle._id} className="card bg-base-100 w-96 shadow-sm object-cover  hover:scale-110 mb-8">
                        <figure>
                            <img className='h-[200px] object-cover w-full'
                                src={vehicle.coverImage}
                                alt="Shoes" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold text-2xl text-center">{vehicle.vehicleName}</h2>

                            <p className='text-gray-500 font-bold text-md'>{vehicle.description} <Link to='/CarDetails' className='text-primary'>Car Details...</Link></p>
                            <div className="card-actions justify-end">
                                <p className='text-xl font-bold'>Price per day:${vehicle.pricePerDay}</p>
                                <button className="btn btn-primary rounded-xl">Buy Now</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VehicleCard;