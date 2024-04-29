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
import Ogloszenia from "./views/Ogloszenia.jsx";
import Karta from "./views/Karta.jsx";
import Informacje from "./views/Informacje.jsx";

// Po zalogowaniu jako admin
import AdminDefaultLayout from "./Admin/views/AdminDefaultLayout.jsx";
import Pracownicy from "./Admin/views/Pracownicy.jsx";
import KartyDostepu from "./Admin/views/KartyDostepu.jsx";
import KodyQR from "./Admin/views/KodyQR.jsx";
import Aktualnosci from "./Admin/views/Aktualnosci.jsx";
import Ogloszenia_ADMIN from "./Admin/views/Ogloszenia.jsx";
import Form from "./Admin/views/Form.jsx";

//formularze do admina
import Users_ADD from "./Admin/components/Users_ADD.jsx";

import AddNews from "./Admin/components/News_ADD.jsx";
import News_UPDATE from "./Admin/components/News_UPDATE.jsx";

import Ogloszenia_ADD from "./Admin/components/Ogloszenia_ADD.jsx";
import Ogloszenia_UPDATE from "./Admin/components/Ogloszenia_UPDATE.jsx";


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
                element: <Navigate to= "/"/>
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
                        element: <Users_ADD/>
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
                element: <Aktualnosci/>
            },
            {
                path: 'Ogloszenia',
                element: <Ogloszenia_ADMIN/>
            }

        ]
    },
    {   path: '/login',
        element: <Login/>
    },
    {
        path: '/admin/form',
        element : <Form />,
        children:
        [
            {
                path: 'addnews',
                element: <AddNews/>
            },
            {
                path: 'editnews/:id',
                element: <News_UPDATE/>
            },
            {
                path: 'addOgloszenia',
                element: <Ogloszenia_ADD/>,
            },
            {
                path: 'editOgloszenia/:id',
                element: <Ogloszenia_UPDATE/>
            },
            {
                path: 'addUser',
                element: <Users_ADD/>
            }
        ]
    },
])

export default router;
