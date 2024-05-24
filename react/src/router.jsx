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
import Users_UPDATE from "./Admin/components/Users_UPDATE.jsx";

import AddNews from "./Admin/components/News_ADD.jsx";
import News_UPDATE from "./Admin/components/News_UPDATE.jsx";

import Ogloszenia_ADD from "./Admin/components/Ogloszenia_ADD.jsx";
import Ogloszenia_UPDATE from "./Admin/components/Ogloszenia_UPDATE.jsx";

import KartyDostepu_ADD from "./Admin/components/KartyDostepu_ADD.jsx";
import StrefaKartaDostepu_UPDATE from "./Admin/components/StrefaKartaDostepu_UPDATE.jsx";

import KodyQR_ADD from "./Admin/components/KodyQR_ADD.jsx";
import KodyQR_UPDATE from "./Admin/components/KodyQR_UPDATE.jsx";
import ChangePasswordForm from "./components/changePassword.jsx";
import StrefyDostępu_ADD from "./Admin/components/StrefaDostepu_ADD.jsx";
import StrefyDostepu from "./Admin/views/StrefyDostepu.jsx";
import StrefaDostepu_UPDATE from "./Admin/components/StrefaDostepu_UPDATE.jsx";
import Raporty from "./Admin/views/Raporty.jsx";
import Budynki from "./Admin/views/Budynki.jsx";
import Budynek_ADD from "./Admin/components/Budynek_ADD.jsx";

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
                element: <KodyQR/>,
            },
            {
                path: 'Aktualnosci',
                element: <Aktualnosci/>
            },
            {
                path: 'Ogloszenia',
                element: <Ogloszenia_ADMIN/>
            },
            {
                path: 'StrefyDostepu',
                element: <StrefyDostepu/>
            },
            {
                path: 'Budynki',
                element: <Budynki/>
            },
            {
                path: 'Raporty',
                element: <Raporty/>
            }

        ]
    },
    {   path: '/login',
        element: <Login/>
    },
    {
        path: '/change-password',
        element: <ChangePasswordForm/>
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
            },
            {
                path: 'editUser/:id',
                element: <Users_UPDATE/>
            },
            {
                path: 'ADDKartaDostepu',
                element: <KartyDostepu_ADD/>
            },
            {
                path: 'StrefaKartaDostepu_UPDATE/:id',
                element: <StrefaKartaDostepu_UPDATE/>
            },
            {
                path: 'addKodyQR',
                element: <KodyQR_ADD/>
            },
            {
                path: 'editKodyQR/:id',
                element: <KodyQR_UPDATE/>
            },
            {
                path: 'ADDStrefaDostepu',
                element: <StrefyDostępu_ADD/>
            },
            {
                path: 'StrefaDostepu_UPDATE/:id',
                element: <StrefaDostepu_UPDATE/>
            },
            {
                path: 'ADDBudynek',
                element: <Budynek_ADD/>
            }
        ]
    },
])

export default router;
