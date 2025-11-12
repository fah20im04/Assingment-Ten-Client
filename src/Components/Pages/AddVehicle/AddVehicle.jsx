import React, { useContext, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import axiosInstance from "../../../Api/axiosInstance";

const AddVehicle = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        location: "",
        availability: "",
        description: "",
        coverImage: "",
        userEmail: user.email || "",
    });
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axiosInstance.post("/vehicles", formData);

            setToastMessage(res.data.message || "Vehicle added successfully!");

            // Reset form
            setFormData({
                vehicleName: "",
                owner: "",
                category: "",
                pricePerDay: "",
                location: "",
                availability: "",
                description: "",
                coverImage: "",
                userEmail: user?.email || "",
            });
        } catch (err) {
            console.error(err);
            setToastMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
            setTimeout(() => setToastMessage(""), 3000);
        }
    };


    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Add Vehicle</h2>

            <form className="space-y-4 bg-white p-6 rounded-2xl shadow-lg" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="vehicleName"
                    placeholder="Vehicle Name"
                    value={formData.vehicleName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <input
                    type="text"
                    name="owner"
                    placeholder="Owner Name"
                    value={formData.owner}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category (Sedan/SUV/Van/Electric)"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <input
                    type="number"
                    name="pricePerDay"
                    placeholder="Price per Day"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <input
                    type="text"
                    name="availability"
                    placeholder="Availability"
                    value={formData.availability}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                    rows={4}
                ></textarea>

                <input
                    type="text"
                    name="coverImage"
                    placeholder="Cover Image URL"
                    value={formData.coverImage}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg outline-none"
                />

                {/* User Email (read-only) */}
                <input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    readOnly
                    className="w-full p-3 border rounded-lg bg-gray-100 cursor-not-allowed"
                />

                <button
                    type="submit"
                    className={`w-full py-3 rounded-xl font-semibold text-white transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Vehicle"}
                </button>
            </form>

            {/* Toast Notification */}
            {toastMessage && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg">
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default AddVehicle;
