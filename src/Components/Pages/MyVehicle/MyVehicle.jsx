import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import Swal from "sweetalert2";
import axiosInstance from "../../../Api/axiosInstance";
import LoadingSpinner from "../Loading/LoadingSpinner"; 

const MyVehicles = () => {
    const { user } = useContext(AuthContext);
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchVehicles = async () => {
            try {
                const res = await axiosInstance.get("/allVehicles");
                const data = res.data;
                const userVehicles = data.filter(v => v.userEmail === user.email);
                setVehicles(userVehicles);
            } catch (err) {
                console.error("Failed to fetch vehicles:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicles();
    }, [user]);

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosInstance.delete(`/vehicles/${id}`);
                const data = res.data;

                setVehicles(prev => prev.filter(v => v._id !== id));
                Swal.fire("Deleted!", data.message || "Vehicle deleted.", "success");
            } catch (err) {
                console.error(err);
                Swal.fire("Error!", "Something went wrong.", "error");
            }
        }
    };

    if (loading) return <LoadingSpinner />; // use spinner instead of text
    if (!user) return <p className="text-center mt-20">Please log in to see your vehicles.</p>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">My Vehicles</h2>

            {vehicles.length === 0 ? (
                <p className="text-gray-500">You haven't added any vehicles yet.</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {vehicles.map(vehicle => (
                        <div
                            key={vehicle._id}
                            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300"
                        >
                            <img
                                src={vehicle.coverImage || "https://via.placeholder.com/300"}
                                alt={vehicle.vehicleName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-xl font-bold">{vehicle.vehicleName}</h3>
                                <p className="text-gray-600 text-sm">{vehicle.category}</p>
                                <p className="text-gray-600 font-semibold">${vehicle.pricePerDay}/day</p>

                                <div className="flex gap-2 mt-3">
                                    <button
                                        onClick={() => navigate(`/CarDetails/${vehicle._id}`)}
                                        className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => navigate(`/updateVehicle/${vehicle._id}`)}
                                        className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Update
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vehicle._id)}
                                        className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyVehicles;
