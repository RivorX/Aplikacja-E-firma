import { Fragment, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import ApplicationLogo from '../components/ApplicationLogo';
import axiosClient from '../axios';
import Footer from '../components/Footer';
import { useStateContext } from '../contexts/ContextProvider';

const navigation = [
  { name: 'Panel główny', to: '/' },
  { name: 'Ogłoszenia', to: 'ogloszenia' },
  { name: 'Karta', to: 'karta' },
  { name: 'Informacje', to: 'informacje' },
];
const userNavigation = [{ name: 'Wyloguj się', href: '#' }];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function LogedDefaultLayout() {
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();
  const [loading, setLoading] = useState(true);

  if (!userToken) {
    // Redirect to the main page if not logged in
    return <Navigate to="/mainpage" />;
  }

  useEffect(() => {
    // Fetch user data from the server
    axiosClient.get('/me')
      .then(res => {
        setCurrentUser(res.data);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        console.error('Error fetching user data:', error);
      });
  }, [userToken, setCurrentUser]);

  if (loading) {
    // Display a loading state while fetching user data
    return <div>Loading...</div>;
  }

  if (currentUser.Data_edycji === null) {
    // Redirect to the change password page if user data is fetched and data_edycji is null
    return <Navigate to="/change-password" />;
  }

  // Logout function
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.delete('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  };

  // Check if the user has admin role
  const hasAdminRole = currentUser?.grupa?.nazwa_grupy.toLowerCase() === "admin" ||
    currentUser?.grupa?.nazwa_grupy.toLowerCase() === "super admin";

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
                      {hasAdminRole && (
                        <NavLink
                          key="admin-button"
                          to="/admin/pracownicy"
                          className="text-red-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        >
                          Panel Administratora
                        </NavLink>
                      )}
                    </div>
                    {/* Profile dropdown, czyli przyciski po prawej*/}
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
                  {/* Nazwa użytkownika  TODO*/}
                  <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
                    Witaj <br />
                    {currentUser.imie}<br />
                    {currentUser.nazwisko}
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
        <Footer />
      </div>
    </>
  );
}
