import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Pages/Home/Home";
import Banner from "../Components/Banner/Banner";

import Login from "../Components/Navbar/Login";
import CarDetails from "../Components/Pages/CarDetails/CarDetails";
import Register from "../Components/Navbar/Register";
import AllVehicle from "../Components/Pages/AllVehivle/AllVehicle";
import PrivateRoute from "./PrivateRoute";
import MyBookings from "../Components/Pages/MyBookings/MyBookings";
import MyVehicle from "../Components/Pages/MyVehicle/MyVehicle";
import AddVehicle from "../Components/Pages/AddVehicle/AddVehicle";
import UpdateVehicle from "../Components/Pages/UpdataVehicle/UpdateVehicle";
import LoadingSpinner from "../Components/Pages/Loading/LoadingSpinner";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout></RootLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allVehicles',
                loader: async () => {
                    const res = await fetch('http://localhost:3000/allVehicles');
                    // if (!res.ok) {
                    //     throw new Error('Failed to load vehicles');
                    // }
                    return res.json();
                },
                element: <AllVehicle />
            },
            {
                path: '/banner',
                element: <Banner></Banner>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/CarDetails/:id',
                loader: async ({ params }) => {
                    const res = await fetch(`http://localhost:3000/allVehicles/${params.id}`);

                    return res.json();
                },

                element:
                    <PrivateRoute>
                        <CarDetails></CarDetails>
                    </PrivateRoute>
            },
            {
                path: '/myBookings',
                loader: async () => {
                    const res = await fetch('http://localhost:3000/bookings');
                    if (!res.ok) throw new Error('Failed to load bookings');
                    return res.json();
                },

                element: (
                    <PrivateRoute>
                        <MyBookings />
                    </PrivateRoute>
                ),
                hydrateFallbackElement: <LoadingSpinner></LoadingSpinner>
            },
            {
                path: '/myVehicles',
                element: <MyVehicle></MyVehicle>
            },
            {
                path: '/addVehicle',
                element: <AddVehicle></AddVehicle>
            },
            {
                path: '/updateVehicle/:id',
                element: (
                    <PrivateRoute>   
                        <UpdateVehicle />
                    </PrivateRoute>
                )
            }

        ]
    },
]);
export default router;