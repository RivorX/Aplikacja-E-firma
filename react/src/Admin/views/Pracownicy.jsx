import React, { useState, useEffect } from 'react';
import axiosClient from '../../axios';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Pracownicy() {
  const [pracownicy, setPracownicy] = useState([]);

  useEffect(() => {
    // Pobierz pracowników z bazy danych
    axiosClient.get('pracownicy')
      .then(response => {
        setPracownicy(response.data);
      })
      .catch(error => {
        console.error('Błąd pobierania pracowników:', error);
      });
  }, []);

  return (
    <>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lista pracowników</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
          <section>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Imię</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nazwisko</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Nr karty</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Liczba nieudanych prób (24h)</th>
                    <th className="px-4 py-2 bg-gray-200 text-gray-700">Akcje</th>
                  </tr>
                </thead>
                <tbody>
                  {pracownicy.map((pracownik, index) => (
                    <tr key={index} className="border-t">
                      <td className="px-4 py-2">{pracownik.imie}</td>
                      <td className="px-4 py-2">{pracownik.nazwisko}</td>
                      <td className="px-4 py-2">{pracownik.karta_dostepu[0].numer_seryjny}</td>
                      <td className="px-4 py-2">{pracownik.karta_dostepu[0].liczba_nieudanych_prob}</td>
                      <td className="px-4 py-2">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edytuj dane
                        </button>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edytuj kartę
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
