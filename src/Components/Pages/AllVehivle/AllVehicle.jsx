import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../Api/axiosInstance';
import axiosPrivate from '../../../Api/AxiosPrivate';

const AllVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await axiosPrivate.get('/allVehicles');
                setVehicles(res.data);
            } catch (err) {
                console.error(err);
                setError(err.response?.data?.error || 'Failed to fetch vehicles');
            } finally {
                setLoading(false);
            }
        };

        fetchVehicles();
    }, []);

    if (loading) return <p className="text-center mt-10 text-xl">Loading vehicles...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className='p-5 bg-white dark:bg-gray-900 text-black dark:text-white'>

            <img
                className="lg:h-[600px] lg:w-full sm:w-[400px] sm:h-[200px] md:w-full md:h-[400px] object-cover"
                src="https://i.ibb.co/qFnRt8dB/john-matychuk-Fg-Tcok-Jpm9w-unsplash.jpg"
                alt="Banner"
            />

            <h1 className="mt-10 font-bold text-primary text-5xl text-center">
                ALL VEHICLES ({vehicles.length})
            </h1>

            <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                {vehicles.map((vehicle) => (
                    <div
                        key={vehicle._id}
                        className="card bg-base-100 w-96 shadow-sm hover:scale-105 mb-8 transition-transform duration-300"
                    >
                        <figure>
                            <img
                                className="h-[200px] object-cover w-full"
                                src={vehicle.coverImage}
                                alt={vehicle.vehicleName}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title font-bold text-2xl text-center">{vehicle.vehicleName}</h2>
                            <p className="text-gray-500 font-bold text-md">
                                {vehicle.description}{' '}
                                <Link to={`/CarDetails/${vehicle._id}`} className="text-primary">
                                    Car Details...
                                </Link>
                            </p>
                            <div className="card-actions justify-end mt-2">
                                <p className="text-xl font-bold">Price per day: ${vehicle.pricePerDay}</p>
                                <Link
                                    to={`/CarDetails/${vehicle._id}`}
                                    className="btn btn-primary rounded-xl"
                                >
                                    Book Now
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllVehicle;
