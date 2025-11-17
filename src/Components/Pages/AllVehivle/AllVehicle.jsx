import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosPrivate from '../../../Api/AxiosPrivate';
import { useTheme } from "../../Theame/ThemeProvider"; 

const AllVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme(); // use global theme

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

  if (loading) return <p className="text-center mt-10 text-xl dark:text-white">Loading vehicles...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className={`p-5 min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Banner Image */}
      <img
        className="lg:h-[600px] lg:w-full sm:w-[400px] sm:h-[200px] md:w-full md:h-[400px] object-cover rounded-xl shadow-md"
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
            className={`card w-96 shadow-sm hover:scale-105 mb-8 transition-transform duration-300 rounded-xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-base-100 text-black'
            }`}
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
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'} font-bold text-md`}>
                {vehicle.description}{' '}
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`font-semibold ${theme === 'dark' ? 'text-yellow-400' : 'text-primary'}`}
                >
                  Car Details...
                </Link>
              </p>
              <div className="card-actions justify-end mt-2">
                <p className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Price per day: ${vehicle.pricePerDay}
                </p>
                <Link
                  to={`/CarDetails/${vehicle._id}`}
                  className={`btn rounded-xl ${theme === 'dark' ? 'btn-yellow dark:text-gray-900' : 'btn-primary'}`}
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
