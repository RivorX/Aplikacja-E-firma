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
  { name: 'Ogłoszenia', to: 'Ogloszenia'},
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

    // Wylogowanie
    const logout = (ev) => {
        ev.preventDefault()
        axiosClient.delete('/logout')
        .then(res => {
          setCurrentUser({})
          setUserToken(null)
        });
    }

    return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
            <header className="items-top bg-gray-200 top-0 w-full">
              <nav className="w-full flex flex-1 justify-end items-center">
                  <div className="bg-white py-2 px-4 w-full flex justify-between items-center">
                    <div>               
                      {/* New Button for Admins */}     
                      <NavLink
                        to="/"
                        className="text-green-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                    >
                        Przejdź do panelu pracownika
                    </NavLink>
                    </div>
                    {/* Profile dropdown, czyli przyciski po prawej*/}
                      {/* TODO: Proprawić, bo teraz działa dla wielu przyciskach 55 min około*/}
                      {userNavigation.map((item) => ( 
                          <NavLink
                            key={item.name}
                            onClick={(ev) => logout(ev)}
                            className={classNames(
                                item.current
                                ? 'bg-gray-900 text-white '
                                : 'text-black-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                  </div>
              </nav>
              <div className="grid grid-cols-3 flex lg:justify-center lg:col-start-2 w-full lg:w-auto pb-10 mt-0">
                <div className="position-relative">

                  {/* Logo aplikacji */}
                  <ApplicationLogo /> 

                  {/* {userToken} */}
                </div>

                {/* Nazwa użytkownika  TODO*/}
                <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
                    Witaj <br/>
                  {currentUser.imie}
                </div>
              </div>
              <div className="flex flex-wrap justify-center w-full py-5">
                {/* Wyświetlanie przycisków */}
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    className={({ isActive }) =>
                      classNames(
                        'rounded-full px-7 py-2 text-sm font-medium mx-2 sm:mx-4 md:mx-6 lg:mx-8 my-2',
                        isActive ? 'bg-gray-400 text-white' : 'bg-white text-black-300 hover:bg-gray-100 hover:text-gray-700 transition-colors duration-300'
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>


            </header>

            </>
          )}
        </Disclosure>
        <div>
            {/* Tu będzie wyświetlana zawartość podstrony */}
            <Outlet /> 
        </div>
        <Footer/>
        
      </div>
    </>
  )
}
