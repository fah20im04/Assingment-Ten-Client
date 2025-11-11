import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../Banner/Banner';

const CarDetails = () => {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3000/allVehicles/${id}`)
            .then(res => res.json())
            .then(data => {
                setVehicle(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching vehicle:", err);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p className="text-center mt-20">Loading vehicle details...</p>;
    if (!vehicle) return <p className="text-center mt-20 text-red-500">Vehicle not found.</p>;

    return (
        <div className="bg-gray-50 min-h-screen">


            <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-8">
                {/* Vehicle Image */}
                <div className="lg:w-2/3 w-full rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={vehicle.coverImage}
                        alt={vehicle.vehicleName}
                        className="w-full h-80 md:h-[450px] object-cover transform hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Vehicle Details */}
                <div className="lg:w-1/3 w-full bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{vehicle.vehicleName}</h2>
                        <p className="text-gray-600 mb-4">{vehicle.description}</p>

                        <div className="space-y-2 text-gray-700">
                            <p><strong>Owner:</strong> {vehicle.owner}</p>
                            <p><strong>Category:</strong> {vehicle.category}</p>
                            <p><strong>Price/Day:</strong> ${vehicle.pricePerDay}</p>
                            <p><strong>Location:</strong> {vehicle.location}</p>
                            <p><strong>Availability:</strong> {vehicle.availability}</p>
                            <p><strong>Posted By:</strong> {vehicle.userEmail}</p>
                            <p><strong>Created At:</strong> {new Date(vehicle.createdAt).toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Rent Now Button */}
                    <button
                        className="mt-6 w-full bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
                    >
                        Rent Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
