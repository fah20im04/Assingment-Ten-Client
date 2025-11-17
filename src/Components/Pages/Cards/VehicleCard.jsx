import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../Api/axiosInstance";
import { useTheme } from "../../Theame/ThemeProvider";

const VehicleCard = () => {
  const [vehicles, setVehicles] = useState([]);
  const { theme } = useTheme(); // theme hook

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const res = await axiosInstance.get("/vehicles");
        setVehicles(res.data);
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    };
    fetchVehicles();
  }, []);

  return (
    <div
      className={`p-5 min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle._id}
            className={`card w-full max-w-sm shadow-md hover:scale-105 transition-transform duration-300 rounded-xl overflow-hidden ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
          >
            <figure>
              <img
                className="h-[200px] w-full object-cover"
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-center">
                {vehicle.vehicleName}
              </h2>

              <p className="mt-2 font-medium text-md">
                <span
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }
                >
                  {vehicle.description}{" "}
                </span>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`font-semibold hover:underline ${
                    theme === "dark" ? "text-yellow-400" : "text-primary"
                  }`}
                >
                  Car Details...
                </Link>
              </p>

              <div className="card-actions justify-between mt-4 items-center">
                <p className="text-xl font-bold">${vehicle.pricePerDay}/day</p>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`btn rounded-xl transition-colors duration-300 ${
                    theme === "dark"
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                      : "btn-primary"
                  }`}
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

export default VehicleCard;
