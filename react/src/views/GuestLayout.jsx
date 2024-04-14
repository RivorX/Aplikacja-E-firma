import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import GuestPanel from '../components/GuestPanel';
import NewsMainInfo from '../components/NewsMainInfo';

const GuestLayout = () => {
  return (
    <>
      <div>
        <GuestPanel />
        {/* Ta część wyświetla się na wszystkich stronach */}
        GuestLayout
      </div>
      <main className="mt-6">

        {/* Wyświetlanie się pod spodem childrenów */}

        {/* Zrobić tu odwołania, a niżej przyciski do tego, min: Aktualności, o firmie, kontakt, routowanie w router.jsx, dać jako dzieci stroniy "/"*/}
        <Outlet />
      </main>
      <footer className="py-4 text-center text-sm text-white dark:text-White/70 bg-gray-500 w-full">
        E-firma
      </footer>
    </>
  );
};

export default GuestLayout;
