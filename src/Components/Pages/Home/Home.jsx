import React from "react";
import Banner from "../../Banner/Banner";
import VehicleCard from "../Cards/VehicleCard";
import { useTheme } from "../../Theame/ThemeProvider";

const Home = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <Banner />
      <h2
        className={`font-bold text-5xl text-center mt-10 transition-colors duration-300 ${
          theme === "dark" ? "text-yellow-400" : "text-primary"
        }`}
      >
        Model Vehicle
      </h2>
      <VehicleCard theme={theme} />
    </div>
  );
};

export default Home;
