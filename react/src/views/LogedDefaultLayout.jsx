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
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                    <ApplicationLogo />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {/* WYświetlanie przycisków */}
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.to}
                            className={({isActive}) =>classNames(
                                isActive
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">

                      {/* Profile dropdown, czyli przyciski po prawej*/}
                      {/* TODO: Proprawić, bo teraz działa dla wielu przyciskach 55 min około*/}
                      {userNavigation.map((item) => ( 
                          <NavLink
                            key={item.name}
                            onClick={(ev) => logout(ev)}
                            className={classNames(
                                item.current
                                ? 'bg-gray-900 text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                          >
                            {item.name}
                          </NavLink>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )}
        </Disclosure>
        <div>
            {/* Tu będzie wyświetlana zawartość podstrony */}
            <Outlet /> 
        </div>
        
      </div>
    </>
  )
}
