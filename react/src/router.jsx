import { Navigate, createBrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Login from './views/Login.jsx';

import GuestLayout from './views/GuestLayout.jsx';
import NewsMainInfo from './components/NewsMainInfo.jsx';
import AboutMainInfo from './components/AboutMainInfo.jsx';
import ContactMainInfo from './components/ContactMainInfo.jsx';

// Po zalogowaniu jako zwykły user
import LogedDefaultLayout from "./views/LogedDefaultLayout.jsx";
import PanelGłówny from "./views/PanelGółwny.jsx";
import Ogloszenia from "./views/Ogłoszenia.jsx";
import Karta from "./views/Karta.jsx";
import Informacje from "./views/Informacje.jsx";

// Po zalogowaniu jako admin
import AdminDefaultLayout from "./Admin/views/AdminDefaultLayout.jsx";
import Pracownicy from "./Admin/views/Pracownicy.jsx";
import KartyDostepu from "./Admin/views/KartyDostepu.jsx";
import KodyQR from "./Admin/views/KodyQR.jsx";
import Aktualnosci from "./Admin/views/Aktualnosci.jsx";

//formularze do admina
import RegistrationForm from "./components/RegistrationForm.jsx";
import AddNews from "./Admin/components/NewsForm.jsx";


const router = createBrowserRouter([
    {   path: '/',
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
    {   path: '/mainpage',
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
    {   path: '/admin',
        element: <AdminDefaultLayout/>,
        children: [
            {
                path: 'pracownicy',
                element: <Pracownicy/>,
                children: [
                    {
                        path: 'adduser',
                        element: <RegistrationForm/>
                    }
                ]
            },
            {
                path: 'kartyDostepu',
                element: <KartyDostepu/>
            },
            {
                path: 'KodyQR',
                element: <KodyQR/>
            },
            {
                path: 'Aktualnosci',
                element: <Aktualnosci/>,
                children: [
                    {
                        path: 'addnews',
                        element: <AddNews/>
                    }
                ]
            }

        ]
    },
    {   path: '/login',
        element: <Login/>
    },
])

export default router;
