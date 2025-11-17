import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://travelease-ten-server.onrender.com/", // full local backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
