import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axiosInstance from "../../../Api/axiosInstance";

const UpdateVehicle = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "",
        description: "",
        coverImage: "",
        userEmail: "",
    });

    // Fetch vehicle data on mount

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
              
                const res = await axiosInstance.get(`/allVehicles/${id}`);
                const data = res.data;

                setVehicle(data);
                setFormData({
                    vehicleName: data.vehicleName || "",
                    owner: data.owner || "",
                    category: data.category || "",
                    pricePerDay: data.pricePerDay || "",
                    location: data.location || "",
                    availability: data.availability || "",
                    description: data.description || "",
                    coverImage: data.coverImage || "",
                    userEmail: data.userEmail || "",
                });
            } catch (err) {
                console.error("Failed to fetch vehicle:", err);
                Swal.fire("Error", "Failed to load vehicle data", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchVehicle();
    }, [id]);
    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle form submit

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const res = await axiosInstance.put(`/vehicles/${id}`, formData);

            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: res.data.message || "Vehicle updated successfully",
                timer: 2000,
                showConfirmButton: false,
            });

            navigate("/myVehicles");
        } catch (err) {
            console.error("Error updating vehicle:", err);
            Swal.fire("Error", err.response?.data?.error || "Something went wrong", "error");
        }
    };


    if (loading) return <p className="text-center mt-20">Loading...</p>;
    if (!vehicle) return <p className="text-center mt-20">Vehicle not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
            <h2 className="text-3xl font-bold mb-6">Update Vehicle</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="Price Per Day"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                    required
                />
                <input
                    type="text"
                    name="coverImage"
                    placeholder="Cover Image URL"
                    value={formData.coverImage}
                    onChange={handleChange}
                    className="w-full border p-2 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Update Vehicle
                </button>
            </form>
        </div>
    );
};

export default UpdateVehicle;
