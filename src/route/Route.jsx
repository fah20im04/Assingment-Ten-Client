import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Pages/Home/Home";
import AddVehicle from "../Components/Pages/AdVehicle/AddVehicle";
import Banner from "../Components/Banner/Banner";
import LoginModal from "../Components/Navbar/Login";
import Login from "../Components/Navbar/Login";
import CarDetails from "../Components/Pages/CarDetails/CarDetails";
import Register from "../Components/Navbar/Register";
import AllVehicle from "../Components/Pages/AllVehivle/AllVehicle";

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
                path: '/addVehicle',
                element: <AddVehicle></AddVehicle>
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

                element: <CarDetails></CarDetails>
            },
        ]
    },
]);
export default router;