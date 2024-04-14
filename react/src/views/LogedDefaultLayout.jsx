import { Fragment } from 'react'
import { NavLink, Outlet} from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import ApplicationLogo from '../components/ApplicationLogo'
import NewsMainInfo from '../components/NewsMainInfo'
import Ogłoszenia from './Ogłoszenia'
import PanelGłówny from './PanelGółwny';
import Karta from './Karta';
import Informacje from './Informacje';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
  { name: 'Panel główny', to: '/'},
  { name: 'Ogłoszenia', to: 'ogloszenia' },
  { name: 'Karta', to: 'karta'},
  { name: 'Informacje', to: 'informacje' },
]
const userNavigation = [
  { name: 'Wyloguj się', href: '#' },
]
const logout = (ev) => {
    ev.preventDefault()
    console.log('Wylogowano')
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function LogedDefaultLayout() {
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
                </div>

                <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
                  Nazwa użytkownika
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
