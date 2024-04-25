import React, { useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import GuestPanel from '../components/GuestPanel';
import Footer from '../components/Footer';
import NewsMainInfo from '../components/NewsMainInfo.jsx';
import { useStateContext } from '../contexts/ContextProvider';

import { Disclosure } from '@headlessui/react';

const navigation = [
  { name: 'Aktualności', to: 'news'},
  { name: 'O firmie', to: 'about'},
  { name: 'Kontakt', to: 'contact'},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
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
        <Disclosure as="nav" className="bg-gray-400 flex flex-col items-start md:items-center">
          {({ open }) => (
            <nav className="w-full md:w-auto">
              <div className="flex flex-wrap justify-center">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    onClick={() => handleNavItemClick(item.to)}
                    className={({isActive}) =>
                      classNames(
                        'rounded-md px-3 py-2 text-lg font-medium mx-2 my-2',
                        isActive
                          ? 'bg-gray-400 text-white'
                          : 'text-black-300 hover:bg-white hover:text-gray',
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </nav>
          )}
        </Disclosure>
        {/* Wyświetlanie się pod spodem childrenów */}
        {selectedNavItem === 'news' && <NewsMainInfo />}

        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default GuestLayout;
