import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/RootLayout/RootLayout";
import Home from "../Components/Pages/Home/Home"; 
import AddVehicle from "../Components/Pages/AdVehicle/AddVehicle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children:[
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/addVehicle',
            element: <AddVehicle></AddVehicle>
        }
    ]
  },
]);
export default router;