import React, { useState } from 'react';
import { NavLink, Navigate, Outlet, Routes, Route } from 'react-router-dom';
import GuestPanel from '../components/GuestPanel';
import NewsMainInfo from '../components/NewsMainInfo.jsx';
import { useStateContext } from '../contexts/ContextProvider';

import { Disclosure } from '@headlessui/react';

import RegistrationForm from '../components/RegistrationForm';  {/* TODO  usunąć*/}


const navigation = [
  { name: 'Aktualności', to: 'news'},
  { name: 'O firmie', to: 'about'},
  { name: 'Kontakt', to: 'contact'},
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const GuestLayout = () => {
  const { currentUser, userToken } = useStateContext();
  if (userToken) {
    return <Navigate to="/" />;
  }
  const [selectedNavItem, setSelectedNavItem] = useState('news');

  const handleNavItemClick = (to) => {
    setSelectedNavItem(to);
  };

  return (
    <>
      <div>
        <GuestPanel />
        {/* Ta część wyświetla się na wszystkich stronach */}
      </div>
      <main className="mt-6">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <nav className="w-full flex flex-1 justify-end items-center">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => handleNavItemClick(item.to)}
                  className={({isActive}) =>
                    classNames(
                      isActive
                        ? 'bg-gray-400 text-white'
                        : 'text-black-300 hover:bg-white hover:text-grey',
                      'rounded-md px-3 py-2 text-sm font-medium'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}
        </Disclosure>

        {/* Wyświetlanie się pod spodem childrenów */}
        {selectedNavItem === 'news' && <NewsMainInfo />}


        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-white dark:text-White/70 bg-gray-500 w-full">
        E-firma
      </footer>
    </>
  );
};

export default GuestLayout;
