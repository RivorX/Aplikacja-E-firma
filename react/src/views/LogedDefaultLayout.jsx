import { Fragment } from 'react'
import { NavLink, Navigate, Outlet} from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import ApplicationLogo from '../components/ApplicationLogo'
import { userStateContext } from '../contexts/ContextProvider';


const navigation = [
  { name: 'Panel główny', to: '/'},
  { name: 'Ogłoszenia', to: 'ogloszenia' },
  { name: 'Karta', to: 'karta'},
  { name: 'Informacje', to: 'informacje' },
]
const userNavigation = [
  { name: 'Wyloguj się', href: '#' },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LogedDefaultLayout() {
    const { currentUser, userToken } = userStateContext();

    if (!userToken) {
        // Przekierowanie na stronę gdy nie jesteśmy zalogowani
        return <Navigate to="/mainpage" />
    }

    const logout = (ev) => {
        ev.preventDefault()
        console.log('Wylogowano')
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
                    <div></div> {/* Pusty element po lewej stronie */}
                    {/* Profile dropdown, czyli przyciski po prawej*/}
                      {/* TODO: Proprawić, bo teraz działa dla wielu przyciskach 55 min około*/}
                      {userNavigation.map((item) => ( 
                          <NavLink
                            key={item.name}
                            onClick={(ev) => logout(ev)}
                            className={classNames(
                                item.current
                                ? 'bg-gray-900 text-white'
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

                  {userToken}
                </div>

                {/* Nazwa użytkownika  TODO*/}
                <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
                    Witaj <br/>
                  {currentUser.imie}<br/>
                  {currentUser.nazwisko}
                </div>
              </div>
             <div className="flex justify-around w-full py-5">
                {/* WYświetlanie przycisków */}
                {navigation.map((item) => (
                    <NavLink
                    key={item.name}
                    to={item.to}
                    className={({isActive}) =>classNames(
                        isActive
                        ? 'bg-gray-400 text-white'
                        : 'text-black-300 hover:bg-white hover:text-grey',
                        'rounded-md px-3 py-2 text-sm font-medium'
                    )}
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
        <footer className="py-4 text-center text-sm text-white dark:text-White/70 bg-gray-500 w-full">
        E-firma
      </footer>
        
      </div>
    </>
  )
}
