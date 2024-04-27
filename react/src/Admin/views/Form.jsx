import { Fragment, useEffect } from 'react'
import { NavLink, Navigate, Outlet} from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import ApplicationLogo from '../../components/ApplicationLogo'
import Footer from '../../components/Footer';
import { useStateContext } from '../../contexts/ContextProvider';
import axiosClient from '../../axios';



const navigation = [
  { name: 'Pracownicy', to: 'pracownicy'},
  { name: 'Karty dostepu', to: 'kartyDostepu'},
  { name: 'Drzwi / Kody QR', to: 'kodyQR'},
  { name: 'Aktualnosci', to: 'Aktualnosci'},
]
const userNavigation = [
  { name: 'Wyloguj się' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LogedDefaultLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
    const hasAdminRole =
      currentUser?.grupa?.nazwa_grupy.toLowerCase() === "admin" ||
      currentUser?.grupa?.nazwa_grupy.toLowerCase() === "super admin";
  


    if (!userToken) {
        // Przekierowanie na stronę gdy nie jesteśmy zalogowani
        return <Navigate to="/mainpage" />
    }
    if(!hasAdminRole){
        // Przekierowanie na stronę gdy nie jesteśmy adminem
        return <Navigate to="/" />
    }
    
    // Wczytanie danych użytkownika
    useEffect(() => {
        axiosClient.get('/me')
        .then(({data}) => {
            setCurrentUser(data)
            console.log(data)
        })
    }, [])

    return (
    <>
        <div>
            {/* Tu będzie wyświetlana zawartość podstrony */}
            <Outlet /> 
        </div>
        
    </>
  )
}
