import React from 'react';
import { Link } from 'react-router-dom';
import ApplicationLogo from './ApplicationLogo';

export default function GuestPanel({ auth }) {
  return (
    <header className="items-top bg-gray-200 top-0 w-full">
      <nav className="w-full flex flex-1 justify-end items-center">
          <div className="bg-white py-2 px-4 w-full flex justify-between items-center">
            <div></div> {/* Pusty element po lewej stronie */}
            <Link
              to="/login" // użyj to zamiast href={route('login')}
              className="text-black hover:text-black/70 dark:text-Black dark:hover:text-Black/80"
            >
              Zaloguj się
            </Link>
          </div>
      </nav>
      <div className="grid grid-cols-3 flex lg:justify-center lg:col-start-2 w-full lg:w-auto pb-10 mt-0">
        <div className="position-relative">
          {/* Tutaj załóżmy, że masz komponent ApplicationLogo */}
          <ApplicationLogo  />
        </div>

        <div className="flex lg:justify-center lg:col-start-2 w-full lg:w-auto">
          Nazwa użytkownika
        </div>
      </div>
      <div className="flex items-center lg:justify-center py-10">
        Przyciski wybierania
      </div>
    </header>
  );
}
