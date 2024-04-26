import React from 'react';
import { Link } from 'react-router-dom';
import ApplicationLogo from './ApplicationLogo';
import RegistrationForm from '../Admin/components/Users_ADD';

export default function GuestPanel({ auth }) {
  return (
    <header className="items-top bg-gray-200 top-0 w-full">
      <nav className="w-full flex flex-1 justify-end items-center">
          <div className="bg-white py-2 px-4 w-full flex justify-between items-center">
            <div></div> {/* Pusty element po lewej stronie */}
            <Link
              to="/login"
              className="text-black hover:text-black/70 dark:text-Black dark:hover:text-Black/80"
            >
              Zaloguj się
            </Link>
          </div>
      </nav>
      <div className="grid grid-cols-3 flex lg:justify-center lg:col-start-2 w-full lg:w-auto pb-10 mt-0">
        <div className="position-relative">

          {/* Logo aplikacji */}
          <ApplicationLogo /> 
        </div>

        <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
          
        </div>
      </div>
    </header>
  );
}
