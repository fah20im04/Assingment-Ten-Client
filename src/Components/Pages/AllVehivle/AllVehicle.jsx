import React from 'react';
import { Link, useLoaderData } from 'react-router';

const AllVehicle = () => {
    const vehicles = useLoaderData();
    return (
        <div className="p-5">
            <img className=' lg:h-[600px] lg:w-full sm:w-[400px] sm:h-[200px] md:w-full md:h-[400px] object-cover' src="https://i.ibb.co.com/fV1PfqHR/thomas-sabu-pva-A12-P-6s4-unsplash.jpg" alt="" />

            <h1 className='font-bold text-primary text-5xl text-center'>ALL VEHICLE ({vehicles.length})</h1>


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

                            <p className='text-gray-500 font-bold text-md'>
                                {vehicle.description}{' '}
                                <Link
                                    to={`/CarDetails/${vehicle._id}`}
                                    className='text-primary'
                                >
                                    Car Details...
                                </Link>
                            </p>
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

export default AllVehicle;