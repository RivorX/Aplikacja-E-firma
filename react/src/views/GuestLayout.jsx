import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestPanel from '../components/GuestPanel';
import Login from './Login';
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
        <Routes>
          <Route path="/news" element={<NewsMainInfo />} />

        </Routes>
      </main>
      <footer className="py-4 text-center text-sm text-white dark:text-White/70 bg-gray-500 w-full">
        E-firma
      </footer>
    </>
  );
};

export default GuestLayout;
