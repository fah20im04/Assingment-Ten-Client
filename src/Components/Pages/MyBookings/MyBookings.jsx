import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import Swal from "sweetalert2";

const MyBookings = () => {
    const loaderData = useLoaderData();
    const [bookings, setBookings] = useState(loaderData);

    // Handle booking cancel
    const handleCancel = async (bookingId) => {
        const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");
        if (!confirmDelete) return;

        try {
            const res = await axiosInstance.delete(`/bookings/${bookingId}`);

            Swal.fire({
                icon: "success",
                title: "Cancelled!",
                text: res.data.message || "Booking cancelled successfully!",
                timer: 2000,
                showConfirmButton: false,
            });

            // Remove cancelled booking from state
            setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        } catch (err) {
            console.error("Error cancelling booking:", err);
            Swal.fire("Error", err.response?.data?.error || "Something went wrong!", "error");
        }
    };


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

            {bookings.length === 0 ? (
                <p className="text-gray-500">You have no bookings yet.</p>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="flex flex-col md:flex-row items-center bg-gray-200 shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            {/* Vehicle Image */}
                            <div className="w-full md:w-1/4 h-48 md:h-32 overflow-hidden p-2">
                                <img
                                    src={booking.vehicleImg || "https://via.placeholder.com/150"}
                                    alt={booking.vehicleName}
                                    className="w-full h-full rounded-2xl"
                                />
                            </div>

                            {/* Vehicle Info */}
                            <div className="flex-1 p-4 md:px-6">
                                <h3 className="text-2xl font-bold">{booking.vehicleName}</h3>
                                <p className="font-semibold text-gray-600 mt-1">{booking.ownerEmail}</p>
                                <p className="text-gray-500 text-sm mt-1 font-semibold">
                                    Booked at: {new Date(booking.bookedAt).toLocaleString()}
                                </p>
                                <p className="mt-2 font-bold">
                                    Status:{" "}
                                    <span
                                        className={`font-semibold ${booking.status === "Confirmed" ? "text-green-600" : "text-yellow-500"
                                            }`}
                                    >
                                        {booking.status || "Pending"}
                                    </span>
                                </p>
                            </div>

                            {/* Cancel Button */}
                            <div className="p-5 flex justify-end md:justify-center">
                                <button
                                    onClick={() => handleCancel(booking._id)}
                                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl font-semibold"
                                >
                                    Booking Cancel
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
