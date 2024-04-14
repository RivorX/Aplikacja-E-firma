import { Navigate, createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from './views/Dashboard.jsx';

import Login from './views/Login.jsx';
import GuestLayout from './views/GuestLayout.jsx';
import NewsMainInfo from './components/NewsMainInfo.jsx';
import AboutMainInfo from './components/AboutMainInfo.jsx';
import ContactMainInfo from './components/ContactMainInfo.jsx';

import LogedDefaultLayout from "./views/LogedDefaultLayout.jsx";
import PanelGłówny from "./views/PanelGółwny.jsx";
import Ogloszenia from "./views/Ogłoszenia.jsx";
import Karta from "./views/Karta.jsx";
import Informacje from "./views/Informacje.jsx";


const router = createBrowserRouter([
    {
        path: '/',
        element: <LogedDefaultLayout />,
        children: [
            {
                path: 'panelglowny',
                element: <Navigate to= ""/>
            },
            {
                path: '',
                element: <PanelGłówny/>
            },

            {
                path: 'ogloszenia',
                element: <Ogloszenia/>
            },
            {
                path: 'karta',
                element: <Karta/>
            },
            {
                path: 'informacje',
                element: <Informacje/>
            }
        ]
    },
    {
        path: '/mainpage',
        element: <GuestLayout/>,
        children: [
            {
                path: 'news',
                element: <Navigate to= ""/>
            },
            {
                path: 'about',
                element: <AboutMainInfo/>
            },
            {
                path: 'contact',
                element: <ContactMainInfo/>
            }
        ]
    },
    {
        path: '/login',
        element: <Login/>
    }
])

export default router;
