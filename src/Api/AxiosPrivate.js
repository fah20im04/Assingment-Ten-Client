import axios from "axios";

const axiosPrivate = axios.create({
  baseURL:
    "https://travelease-ten-server-4aznpsx9k-fahim-ahmed-ayons-projects.vercel.app/",
});

axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosPrivate;
