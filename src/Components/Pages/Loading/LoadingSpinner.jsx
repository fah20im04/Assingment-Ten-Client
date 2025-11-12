import React from "react";
import Car from "../../../assets/images.png";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 relative overflow-hidden">
      {/* Road */}
      <div className="absolute bottom-20 w-full h-24 bg-gray-800"></div>

      {/* Car */}
      <img
        src={Car}
        alt="Moving Car"
        className="absolute bottom-24 w-32 animate-carMove"
      />

      {/* Loading Text */}
      <p className="absolute bottom-8 text-xl font-semibold text-gray-700">
        Loading...
      </p>

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes carMove {
            0% { transform: translateX(-150px); }
            50% { transform: translateX(calc(100vw + 150px)); }
            100% { transform: translateX(-150px); }
          }

          .animate-carMove {
            animation: carMove 3s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
