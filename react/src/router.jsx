import { createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from './views/Dashboard.jsx';
import Login from './views/Login.jsx';
import GuestLayout from './views/GuestLayout.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <GuestLayout/>,
        // children: [
        //     {
        //         path: 'newsy',
        //         element: <NewsMainInfo/>
        //     }
        // ]
    },
    {
        path: '/',
        element: <Dashboard/>
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router;
