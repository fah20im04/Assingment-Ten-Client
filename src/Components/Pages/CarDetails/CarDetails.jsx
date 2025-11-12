import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';
import axiosInstance from '../../../Api/axiosInstance';

const CarDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingMessage, setBookingMessage] = useState('');

    // 🔹 Fetch single vehicle data
    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const res = await fetch(`http://localhost:3000/allVehicles/${id}`);
                if (!res.ok) throw new Error('Failed to fetch vehicle details');

                const data = await res.json();
                setVehicle(data);
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);

    // 🔹 Handle booking
    const handleBooking = async () => {
        if (!user) {
            alert('You must be logged in to book.');
            return;
        }

        if (!vehicle) {
            alert('Vehicle data not loaded yet.');
            return;
        }

        const bookingData = {
            vehicleImg: vehicle.coverImage,
            vehicleId: vehicle._id,
            vehicleName: vehicle.vehicleName,
            userEmail: user.email,
            ownerEmail: vehicle.userEmail,
            bookedAt: new Date(),
        };

        try {
            const res = await axiosInstance.post("/bookings", bookingData);

            if (res.status === 200 || res.status === 201) {
                setBookingMessage("Booking request sent successfully!");
            } else {
                setBookingMessage("Booking failed. Please try again.");
            }
        } catch (error) {
            console.error("Booking error:", error);
            setBookingMessage(
                error.response?.data?.error || "Booking failed. Try again later."
            );
        }
    };

    // 🔹 Loading / error states
    if (loading) {
        return <p className="text-center mt-20">Loading vehicle details...</p>;
    }

    if (!vehicle) {
        return <p className="text-center mt-20 text-red-500">Vehicle not found.</p>;
    }

    // 🔹 Main UI (style preserved)
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
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">
                            {vehicle.vehicleName}
                        </h2>
                        <p className="text-gray-600 mb-4">{vehicle.description}</p>

                        <div className="space-y-2 text-gray-700">
                            <p><strong>Owner:</strong> {vehicle.owner}</p>
                            <p><strong>Category:</strong> {vehicle.category}</p>
                            <p><strong>Price/Day:</strong> ${vehicle.pricePerDay}</p>
                            <p><strong>Location:</strong> {vehicle.location}</p>
                            <p><strong>Availability:</strong> {vehicle.availability}</p>
                            <p><strong>Posted By:</strong> {vehicle.userEmail}</p>
                            <p>
                                <strong>Created At:</strong>{' '}
                                {new Date(vehicle.createdAt || vehicle.created_at).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Book Now Button */}
                    <button
                        onClick={handleBooking}
                        disabled={bookingMessage.includes("already booked")}
                        className={`w-full py-3 rounded-xl font-semibold transition ${bookingMessage.includes("already booked")
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                            }`}
                    >
                        {bookingMessage.includes("already booked") ? "Already Booked" : "Book Now"}
                    </button>

                    {bookingMessage && (
                        <p className="mt-3 text-center text-sm text-green-600">
                            {bookingMessage}
                        </p>
                    )}


                </div>
            </div>
        </div>
    );
};

export default CarDetails;
